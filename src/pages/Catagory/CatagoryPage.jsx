import SIngleBook from "../../components/BookSection/SIngleBook";
import { useLoaderData, useLocation } from "react-router-dom";

const CatagoryPage = () => {
  const location = useLocation();
  const books = useLoaderData();

  const slugToText = (slug) =>
    slug
      .substr(10)
      .toLowerCase()
      .split(/[-_.\s]/)
      .map((w) => `${w.charAt(0).toUpperCase()}${w.substr(1)}`)
      .join(" ");
  console.log(location);

  return (
    <section className="catagoryPage py-16 lg:py-20">
      <div className="container">
        <div className="row">
          <h2 className="font-semibold lg:text-4xl text-2xl text-center mb-10">
            {slugToText(location.pathname)} Books
          </h2>

          {/* {isLoading && <Loading />} */}
          <div className="books-items grid grid-cols-5 lg:gap-6 gap-5">
            {books.data?.map((book) => (
              <SIngleBook book={book} key={book._id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatagoryPage;
