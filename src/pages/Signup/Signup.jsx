import { Link } from "react-router-dom";
import "./Signup.css";
import logo from "../../assets/images/book-resell.svg";
import { useForm } from "react-hook-form";
import useAuthContex from "../../hooks/useAuthContex";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import GoogleSignIn from "../../components/GoogleSignIn/GoogleSignIn";

const Signup = () => {
  // states

  const { signUp, updateDisplayName } = useAuthContex();
  // const location = useLocation()

  // features get from third party packages
  // const navigate = useNavigation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSignUp = (data) => {
    console.log(data);
    const { name, email, pass, cPass } = data;
    if (pass === cPass) {
      signUp(email, pass)
        .then((result) => {
          const user = result.user;
          if (user.uid) {
            updateDisplayName(name)
              .then(() => {
                // insertUserOnDB(name, email).then((res) => {
                //   if (res.data.acknowledged) {
                //     toast.success("Your account created successfuly!");
                //     navigate("/dashboard");
                //   }
                // });
              })
              .catch((err) => toast.error(err.code));
          }
        })
        .catch((err) => {
          toast.error(err.code);
          reset();
        });
    } else {
      //
    }
  };

  return (
    <section className="signup-page py-12">
      <div className="container">
        <div className="row">
          <div className="site-logo w-[220px] mx-auto mb-8">
            <Link to="/" className="site-logo">
              <img src={logo} alt="Logo" className="w-full" />
            </Link>
          </div>

          <div className="auth-container ">
            <div className="auth-form border-[1px] py-8 px-8 rounded-lg shadow-md">
              <h3 className="text-2xl md:text-3xl font-semibold mb-6">
                Create an account
              </h3>
              <form onSubmit={handleSubmit(handleSignUp)}>
                <div className="single-input mb-6">
                  <div className="flex gap-6 buyer-seller-buttons">
                    <label htmlFor="buyer" className="flex-1">
                      <input
                        {...register("role")}
                        value="buyer"
                        type="radio"
                        name="role"
                        id="buyer"
                        defaultChecked
                        className="w-0 h-0"
                      />
                      <span className="w-full block text-center py-2 rounded text-blue-500 font-semibold border-blue-400 border">
                        Become a Buyer
                      </span>
                    </label>
                    <label htmlFor="seller" className="flex-1">
                      <input
                        {...register("role")}
                        value="seller"
                        type="radio"
                        name="role"
                        id="seller"
                        className="w-0 h-0"
                      />
                      <span className="w-full block text-center py-2 rounded text-blue-500 font-semibold border-blue-400 border">
                        Become a Seller
                      </span>
                    </label>
                  </div>
                </div>
                <div className="single-input mb-6">
                  <input
                    className="border-0 border-b-[1px] py-2 w-full border-gray-400 outline-none"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                    {...register("name", {
                      required: "First name is required!",
                    })}
                  />
                  <p className="text-sm text-red-500">
                    {errors?.name?.message}
                  </p>
                </div>
                <div className="single-input mb-6">
                  <input
                    className="border-0 border-b-[1px] py-2 w-full border-gray-400 outline-none"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    {...register("email", { required: "Email is required!" })}
                  />
                  <p className="text-sm text-red-500">
                    {errors?.email?.message}
                  </p>
                </div>
                <div className="single-input mb-6">
                  <input
                    className="border-0 border-b-[1px] py-2 w-full border-gray-400 outline-none"
                    type="password"
                    name="pass"
                    id="pass"
                    placeholder="Password"
                    {...register("pass", {
                      required: "Password is required!",
                      minLength: {
                        value: 6,
                        message: "Password atlast 6 cherecter or more.",
                      },
                      maxLength: {
                        value: 12,
                        message: "Password should 6-12 cherecter.",
                      },
                    })}
                  />
                  <p className="text-sm text-red-500">
                    {errors?.pass?.message}
                  </p>
                </div>

                <div className="single-input mb-6">
                  <Button
                    variant="contained"
                    type="submit"
                    className="w-full"
                    size="large"
                  >
                    Create an Account
                  </Button>
                </div>
              </form>

              <p className="mt-4 text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-primary text-blue-500">
                  Login
                </Link>
              </p>
            </div>

            <GoogleSignIn />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
