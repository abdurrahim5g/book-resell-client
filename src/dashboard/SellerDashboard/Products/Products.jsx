import styled from "@emotion/styled";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  tableCellClasses,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading/Loading";
import { format } from "date-fns";
import { EditNote, Delete } from "@mui/icons-material";
import useAuthContex from "../../../hooks/useAuthContex";

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

let currentYear = new Date().getFullYear();
const imagebbAPI = import.meta.env.VITE_ImageBB_API;
const formateDate = format(new Date(), "dd MMMM YYY");

const Products = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  // get User details
  const { user } = useAuthContex();

  // ReactHookForm
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  /**
   *
   * Load catagory data
   */
  const { data: catagory = [], isLoading: catagoryLoading } = useQuery(
    "catagory",
    () => {
      return axios("http://localhost:5000/catagory").then((res) => res.data);
    }
  );

  /**
   *
   * Load products data
   */
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery("products", () => {
    return axios("http://localhost:5000/product").then((res) => res.data);
  });

  const handleAddProduct = (data) => {
    // console.log(data);

    const {
      productName,
      description,
      catagory,
      purchaseYear,
      originalPrice,
      sellingPrice,
      location,
    } = data;

    let imageData = data.productImage[0];
    const formData = new FormData();
    formData.append("image", imageData);

    axios
      .post(`https://api.imgbb.com/1/upload?key=${imagebbAPI}`, formData)
      .then((res) => {
        const dataRes = res.data;
        if (dataRes.success) {
          const productDoc = {
            productName,
            description,
            catagory,
            purchaseYear,
            originalPrice: +originalPrice,
            sellingPrice: +sellingPrice,
            location,
            productImage: dataRes.data.url,
            date: formateDate,
            time: new Date().getTime(),
            author: user.email,
          };
          axios
            .post("http://localhost:5000/product", productDoc)
            .then((res) => {
              if (res.data?.acknowledged) {
                toast.success("Product added successfully 🚀");
                refetch();
              }
            })
            .then(() => reset())
            .catch(console.dir);
        }
      })
      .catch(console.dir);
  };

  // products data is loading
  if (isLoading) return <Loading />;

  return (
    <div className="Products-page">
      <div className="add-products flex justify-between items-center mb-4">
        <Typography component={"h2"} style={{ fontSize: 20, fontWeight: 500 }}>
          Add products
        </Typography>
        <Button variant="outlined" onClick={handleOpen}>
          Add products
        </Button>
      </div>
      <TableContainer component={"div"}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Image</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Catagory</StyledTableCell>
              <StyledTableCell>Location</StyledTableCell>
              <StyledTableCell>Years of Purchase</StyledTableCell>
              <StyledTableCell>Original Price</StyledTableCell>
              <StyledTableCell>Current Price</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              products?.map((product) => (
                <StyledTableRow key={product._id}>
                  <StyledTableCell>
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="h-16"
                    />
                  </StyledTableCell>
                  <StyledTableCell>{product.productName}</StyledTableCell>
                  <StyledTableCell>
                    {product.description.slice(0, 30)}...
                  </StyledTableCell>
                  <StyledTableCell>{product.catagory}</StyledTableCell>
                  <StyledTableCell>{product.location}</StyledTableCell>
                  <StyledTableCell>{product.purchaseYear}</StyledTableCell>
                  <StyledTableCell>{product.originalPrice}</StyledTableCell>
                  <StyledTableCell>{product.sellingPrice}</StyledTableCell>
                  <StyledTableCell>
                    <div className="grid gap-2">
                      <Button color="error" variant="outlined">
                        <Delete />
                      </Button>
                      <Button color="primary" variant="outlined">
                        <EditNote />
                      </Button>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {products.length === 0 && (
        <Typography
          component={"h3"}
          style={{ textAlign: "center", fontSize: 20, marginTop: 20 }}
        >
          No product found
        </Typography>
      )}

      <div style={{ marginTop: "20px" }}>
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          open={open}
          // scroll={"paper"}
          disableScrollLock={true}
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
            <Box sx={style} style={{ maxHeight: "90vh", overflow: "auto" }}>
              <Typography id="spring-modal-title" variant="h6" component="h2">
                Add products
              </Typography>

              <div className="mt-4 ">
                <form
                  className="grid gap-6 h-full overflow-auto pt-2"
                  onSubmit={handleSubmit(handleAddProduct)}
                >
                  <TextField
                    {...register("productName", {
                      required: "Title is require",
                    })}
                    label="Product Name"
                    size="medium"
                    style={{ width: "100%" }}
                    error={errors?.productName ? true : false}
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

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Catagory
                    </InputLabel>
                    <Select
                      {...register("catagory", {
                        required: "Catagory is require",
                      })}
                      // id="select-catagory"
                      label="Catagory"
                      error={errors?.catagory ? true : false}
                      defaultValue={catagory[0]?._id}
                    >
                      {!catagoryLoading &&
                        catagory?.map((cat) => (
                          <MenuItem key={cat._id} value={cat.name}>
                            {cat.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>

                  <TextField
                    {...register("location", {
                      required: "Location is require",
                    })}
                    label="Location"
                    size="medium"
                    style={{ width: "100%" }}
                    error={errors?.location ? true : false}
                  />

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Purchase Year
                    </InputLabel>
                    <Select
                      {...register("purchaseYear", {
                        required: "Title is require",
                      })}
                      // id="select-purchaseYear"
                      label="Purchase Year"
                      error={errors?.purchaseYear ? true : false}
                      defaultValue={currentYear}
                    >
                      {Array.apply(null, Array(10)).map((value, index) => (
                        <MenuItem key={index} value={currentYear - index}>
                          {currentYear - index}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    {...register("originalPrice", {
                      required: "Original price is require",
                    })}
                    label="Original Price"
                    size="medium"
                    style={{ width: "100%" }}
                    error={errors?.originalPrice ? true : false}
                  />

                  <TextField
                    {...register("sellingPrice", {
                      required: "Selling price is require",
                    })}
                    label="Selling Price"
                    size="medium"
                    style={{ width: "100%" }}
                    error={errors?.sellingPrice ? true : false}
                  />

                  <TextField
                    {...register("productImage", {
                      required: "Selling price is require",
                    })}
                    type="file"
                    size="medium"
                    style={{ width: "100%" }}
                    error={errors?.productImage ? true : false}
                  />

                  <Button variant="contained" size="large" type="submit">
                    Add products
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

export default Products;
