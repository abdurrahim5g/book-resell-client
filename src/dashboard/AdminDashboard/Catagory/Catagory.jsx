/* eslint-disable react-hooks/exhaustive-deps */
import styled from "@emotion/styled";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import useDashboardContex from "../../../hooks/useDashboardContex";
import { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import Loading from "../../../components/Loading/Loading";
import { DeleteOutline, EditNote } from "@mui/icons-material";
import CatagoryModal from "./CatagoryModal";
import DeleteDialog from "./DeleteDialog";
import { uploadImage } from "../../../utility/utility";
// import { useForm } from "react-hook-form";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Catagory = () => {
  const { setDBTitle } = useDashboardContex();
  useEffect(() => setDBTitle("Catagory"), []);

  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [deleteCatagory, setDeleteCatagory] = useState(null);
  const handleDeleteDialog = (id) => setDeleteCatagory(id || null);

  const [editCatagory, setEditCatagory] = useState(null);

  /**
   *
   * Load Catagory data
   */
  const {
    data: catagory = [],
    isError,
    isLoading,
    refetch,
  } = useQuery("catagory", () => {
    return axios("http://localhost:5000/catagory").then((res) => res.data);
  });

  // string to slug
  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  // imageBB_API
  const imagebbAPI = import.meta.env.VITE_ImageBB_API;

  /**
   *
   * Add Catagory
   */
  const handleAddCatagory = (data) => {
    // const { name, description, icon } = data;
    // const catagoryObj = { name, description, slug: slugify(name), icon };
    // console.log(catagoryObj);

    console.log(data);

    let iconData = data.icon[0];
    const formData = new FormData();
    formData.append("image", iconData);
    // console.log(data, "Form Data", formData);

    axios
      .post(`https://api.imgbb.com/1/upload?key=${imagebbAPI}`, formData)
      .then((res) => {
        const iconRes = res.data;
        console.log(iconRes);
        if (iconRes.success) {
          const { name, description } = data;
          const catagoryObj = {
            name,
            description,
            slug: slugify(name),
            icon: iconRes?.data?.url,
          };

          axios
            .post("http://localhost:5000/catagory", catagoryObj)
            .then((res) => {
              const data = res.data;
              if (data?.acknowledged) {
                toast.success(`${name} catagory added successfuly!`);
                setOpen(false);
                refetch();
              }
            })
            .catch(console.dir);
        }
      })
      .catch(console.dir);
  };

  /**
   *
   * handle Update catagory
   */
  const handleUpdateCatagory = (data) => {
    setProcessing(true);
    console.log(processing);
    uploadImage(data.icon).then((res) => {
      if (res.success) {
        const icon = res.data.url;
        const { description } = data;
        const updateCatagoryDoc = { description, icon };
        axios
          .patch(
            `http://localhost:5000/catagory?id=${editCatagory._id}`,
            updateCatagoryDoc
          )
          .then((res) => {
            if (res.data?.acknowledged) {
              toast.success(`${data.name} catagory update successfuly!`);
              console.log(processing);
              setOpen(false);
              setEditCatagory(null);
              refetch();
              setProcessing(false);
            } else {
              toast.error("Something is wrong! Please try again!");
            }
          })
          .catch(console.dir);
      }
    });
  };

  /**
   *
   * Delete Catagory
   */
  const handleCatagoryDelete = (id) => {
    axios
      .delete(`http://localhost:5000/catagory?id=${id}`)
      .then((res) => {
        const data = res.data;
        if (data.deletedCount) {
          refetch();
          toast.success("Catagory delete successfully!");
          setDeleteCatagory(null);
        } else {
          toast.error("Something is wrong please try again!");
        }
      })
      .catch(console.dir);
  };

  if (isLoading) return <Loading />;
  if (isError) return "Error..";

  return (
    <div className="catagory">
      <div className="add-catagory flex justify-between items-center mb-4">
        <Typography component={"h2"} style={{ fontSize: 20, fontWeight: 500 }}>
          Add Catagory
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            handleOpen(), setEditCatagory(null);
          }}
        >
          Add Catagory
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Icon</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Slug</StyledTableCell>
              <StyledTableCell align="center">Count</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              catagory?.map((single) => (
                <StyledTableRow key={single._id}>
                  <StyledTableCell>
                    <img src={single.icon} alt={single?.name} width={60} />
                  </StyledTableCell>
                  <StyledTableCell>{single.name}</StyledTableCell>
                  <StyledTableCell>{single.description}</StyledTableCell>
                  <StyledTableCell>{single.slug}</StyledTableCell>
                  <StyledTableCell align="center">0X</StyledTableCell>
                  <StyledTableCell align="center">
                    <div className="flex gap-3 justify-center">
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteDialog(single._id)}
                      >
                        <DeleteOutline />
                      </IconButton>
                      <IconButton
                        color="info"
                        onClick={() => {
                          setEditCatagory(single);
                          setOpen(true);
                        }}
                      >
                        <EditNote />
                      </IconButton>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {open && (
        <CatagoryModal
          open={open}
          handleOpen={handleOpen}
          handleAddCatagory={handleAddCatagory}
          editCatagory={editCatagory}
          handleUpdateCatagory={handleUpdateCatagory}
          processing={processing}
        />
      )}

      {deleteCatagory && (
        <DeleteDialog
          deleteCatagory={deleteCatagory}
          handleDeleteDialog={handleDeleteDialog}
          handleCatagoryDelete={handleCatagoryDelete}
        />
      )}
    </div>
  );
};

export default Catagory;
