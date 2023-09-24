/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./SingleBook.scss";

const SIngleBook = ({ book }) => {
  const {
    _id,
    productImage,
    productName,
    catagory,
    originalPrice,
    sellingPrice,
  } = book;
  return (
    <div className="single-book border relative" key={_id}>
      <Link className="d-block" to={`/book/${_id}`}>
        <img src={productImage} alt="" className="w-full" />
        <div className="book-text p-2 text-center absolute  bottom-0 ">
          <h3 className="my-3 font-medium">{productName}</h3>
          <p>{catagory}</p>
          <p className="flex gap-4 justify-center my-2">
            <span className="line-through opacity-60">Tk.{originalPrice}</span>
            <span>Tk.{sellingPrice}</span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default SIngleBook;
