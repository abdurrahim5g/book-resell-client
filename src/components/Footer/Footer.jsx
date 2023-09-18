import { Grid, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import logo from "../../assets/images/book-resell.svg";
import SocialIcon from "./SocialIcon";

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="footer-area py-20">
      <Container maxWidth="lg" align="center">
        <Grid container alignItems={"center"}>
          <Grid item md={3} xs={12}>
            <Link>
              <img src={logo} alt="Book Resell" />
            </Link>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography align="center" component={"div"}>
              <p className="my-10">
                &copy; Copyright {year} <Link to={"/"}>Book Resell.</Link> All
                Rights Reserved
              </p>
            </Typography>
          </Grid>
          <Grid item md={3} xs={12}>
            <div className="flex gap-4 justify-center text-2xl">
              <SocialIcon to="" icon="FaFacebookF" />
              <SocialIcon to="" icon="FaLinkedinIn" />
              <SocialIcon to="" icon="FaInstagram" />
              <SocialIcon to="" icon="FaTwitter" />
            </div>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
