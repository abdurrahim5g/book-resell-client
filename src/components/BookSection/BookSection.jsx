import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import SIngleBook from "./SIngleBook";

const BookSection = () => {
  const { data: books, isLoading } = useQuery("books", async () => {
    return await axios.get(`http://localhost:5000/product`).then((res) => res);
  });
  //   console.log(books);

  return (
    <section className="bookSection py-16 lg:py-20">
      <div className="container">
        <h2 className="font-semibold lg:text-4xl text-2xl text-center mb-10">
          Books
        </h2>

        {isLoading && <Loading />}
        <div className="books-items grid grid-cols-5 lg:gap-6 gap-5">
          {!isLoading &&
            books.data?.map((book) => (
              <SIngleBook book={book} key={book._id} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default BookSection;
