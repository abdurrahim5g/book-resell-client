import Container from "@mui/material/Container";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/src/styled/open-animation/open-animation.scss";
import "./CatagorySlider.css";

const CatagorySlider = () => {
  return (
    <section className="hero-slider py-10 rounded-lg overflow-hidden">
      <Container maxWidth="lg">
        <AwesomeSlider animation="openAnimation" cssModule={{}} bullets={false}>
          <div className="single-banner_image">
            <img
              className="rounded-lg"
              src="https://cdn.pixabay.com/photo/2015/12/19/20/32/paper-1100254_1280.jpg"
              alt="Love Book"
            />
          </div>
          <div className="single-banner_image">
            <img
              className="rounded-lg"
              src="https://cdn.pixabay.com/photo/2017/06/10/16/22/coffee-2390136_1280.jpg"
              alt="Love Book"
            />
          </div>
          <div className="single-banner_image">
            <img
              className="rounded-lg"
              src="https://cdn.pixabay.com/photo/2018/01/04/09/39/love-story-3060241_1280.jpg"
              alt="Love Book"
            />
          </div>
          <div className="single-banner_image">
            <img
              className="rounded-lg"
              src="https://cdn.pixabay.com/photo/2018/03/19/18/20/tea-time-3240766_1280.jpg"
              alt="Love Book"
            />
          </div>
        </AwesomeSlider>
      </Container>
    </section>
  );
};

export default CatagorySlider;
