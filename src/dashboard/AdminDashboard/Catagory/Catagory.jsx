/* eslint-disable react-hooks/exhaustive-deps */
import styled from "@emotion/styled";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import useDashboardContex from "../../../hooks/useDashboardContex";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "1px solid #ccc",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const Catagory = () => {
  const { setDBTitle } = useDashboardContex();
  useEffect(() => setDBTitle("Catagory"), []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  // string to slug
  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleAddCatagory = (data) => {
    const { name, description } = data;
    const catagoryObj = { name, description, slug: slugify(name) };
    // console.log(catagoryObj);

    axios
      .post("http://localhost:5000/catagory", catagoryObj)
      .then((res) => {
        const data = res.data;
        if (data?.acknowledged) {
          toast.success(`${name} catagory added successfuly!`);
        }
      })
      .catch(console.dir);

    reset();
  };

  return (
    <div className="catagory">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell align="right">Slug</StyledTableCell>
              <StyledTableCell align="right">Count</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell align="right">Slug</StyledTableCell>
              <StyledTableCell align="right">09</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell align="right">Slug</StyledTableCell>
              <StyledTableCell align="right">09</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ marginTop: "20px" }}>
        <Button variant="outlined" onClick={handleOpen}>
          Add Catagory
        </Button>
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          open={open}
          closeAfterTransition
          onClose={handleOpen}
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              TransitionComponent: Fade,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography id="spring-modal-title" variant="h6" component="h2">
                Add Catagory
              </Typography>

              <div className=" mt-8">
                <form
                  className="grid gap-6"
                  onSubmit={handleSubmit(handleAddCatagory)}
                >
                  <TextField
                    {...register("name", { required: "Title is require" })}
                    label="Name"
                    id="outlined-size-small"
                    defaultValue=""
                    size="medium"
                    style={{ width: "100%" }}
                    error={errors?.name ? true : false}
                  />

                  <TextField
                    multiline
                    label="Description"
                    {...register("description", {
                      required: "Description is require",
                    })}
                    minRows={3}
                    error={errors?.description ? true : false}
                  />
                  <Button variant="contained" size="large" type="submit">
                    Add Catagory
                  </Button>
                </form>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default Catagory;
