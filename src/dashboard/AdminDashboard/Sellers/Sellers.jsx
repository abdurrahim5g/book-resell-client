/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useDashboardContex from "../../../hooks/useDashboardContex";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Button } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "../../../components/Loading/Loading";

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

const Sellers = () => {
  const { setDBTitle } = useDashboardContex();
  useEffect(() => setDBTitle("Sellers"), []);

  const {
    data: sellers = [],
    error,
    isLoading,
  } = useQuery("sellers", () => {
    return axios(`http://localhost:5000/users?role=seller`).then((res) => res);
  });

  if (isLoading) return <Loading />;
  if (error) return "Error";
  console.log(sellers);

  return (
    <div className="sellers">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Avater</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Phone</StyledTableCell>
              <StyledTableCell align="right">Location</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              sellers?.data?.map((seller) => (
                <StyledTableRow key={seller._id}>
                  <StyledTableCell component="th" scope="seller">
                    {seller.picturURL || (
                      <Avatar sx={{}}>{seller.name[0]}</Avatar>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="right">{seller.name}</StyledTableCell>
                  <StyledTableCell align="right">
                    {seller.email}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {seller.phone || "xxx"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {seller.location || "🗺"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button>Edit</Button>
                    <Button color="error">Delete</Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Sellers;
