import { Button, Grid, IconButton } from "@mui/material";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import logo from "../../assets/images/book-resell.svg";
import { AddShoppingCart, SearchSharp } from "@mui/icons-material";
import "./Header.scss";

const SearchBar = () => (
  <form id="searchBook">
    <div className="shadow-md border search-bar">
      <input type="text" placeholder="Search by Book Name" />
      <button className="">
        <SearchSharp />
      </button>
    </div>
  </form>
);

const Header = () => {
  return (
    <header className="header-area py-4 shadow">
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid item xs={6} sm={4} md={3}>
            <Link>
              <img src={logo} alt="Book Resell" />
            </Link>
          </Grid>

          <Grid item sm={4} md={4} className="hidden md:block">
            <SearchBar />
          </Grid>

          <Grid item xs={4} md={3} justifyItems={"end"}>
            <div className="flex gap-4 justify-end">
              <IconButton color="primary" aria-label="add to shopping cart">
                <AddShoppingCart />
              </IconButton>
              <Link to="/login">
                <Button variant="contained">Login</Button>
              </Link>
            </div>
          </Grid>
        </Grid>

        <Grid>
          <div className="block md:hidden mt-4">
            <SearchBar />
          </div>
        </Grid>
      </Container>
    </header>
  );
};

export default Header;
