import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import Loading from "../Loading/Loading";

const CatagorySection = () => {
  /**
   *
   * Retrive catagory data
   */
  const { data: catagoryes, isLoading } = useQuery("catagory", () =>
    axios.get("http://localhost:5000/catagory").then((res) => res)
  );

  return (
    <section className="CatagorySection  py-16 md:py-20 px-5 bg-slate-50">
      <div className="container">
        <h2 className="text-2xl font-semibold text-center">Catagory</h2>

        <div className="loading">{isLoading && <Loading />}</div>

        <div className="catagory-items grid lg:grid-cols-4 grid-cols-2 gap-6 lg:gap-8 justify-around mt-10">
          {!isLoading &&
            catagoryes.data?.map((single) => (
              <div
                className="single-catagory text-center flex-1"
                key={single._id}
              >
                <Link
                  to={`/catagory/${single.slug}`}
                  className="block shadow px-3 lg:px-10 py-6 rounded transition hover:shadow-lg border"
                >
                  <img
                    src={single?.icon}
                    alt="Hello"
                    className="w-20 mx-auto inline-block"
                  />
                  <h4 className="lg:text-xl   mt-4">{single.name}</h4>
                  {/* <h4 className=" mt-4">{single.description}</h4> */}
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CatagorySection;
