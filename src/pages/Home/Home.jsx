import BookSection from "../../components/BookSection/BookSection";
import CatagorySection from "../../components/CatagorySection/CatagorySection";
import CatagorySlider from "../../components/CatagorySlider/CatagorySlider";

const Home = () => {
  return (
    <>
      <CatagorySlider />
      <CatagorySection />
      <BookSection />
    </>
  );
};

export default Home;
