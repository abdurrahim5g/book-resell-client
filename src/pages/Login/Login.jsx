import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import googleIcon from "./google-icon.png";
import useAuthContex from "../../hooks/useAuthContex";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { GoogleAuthProvider } from "firebase/auth";
// import { insertUserOnDB } from "../../utils/utils";
import logo from "../../assets/images/book-resell.svg";
import { Button, Divider } from "@mui/material";

const Login = () => {
  /**
   * Features comes from contex
   */
  const { signIn, providerSignIn } = useAuthContex();

  /**
   * Navigate user
   */
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  /**
   * Destrucer from useForm() hooks -> react-hook-form
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // handleLogin
  const handleLogin = (data) => {
    const { email, pass } = data;
    if (email && pass) {
      signIn(email, pass)
        .then((result) => {
          const user = result.user;
          if (user.uid) {
            toast.success("Login successfuly");
            navigate(from);
          }
        })
        .catch((err) => {
          // toast.error(err.message);
          toast.error(err.code);
        });
    }
  };

  /**
   *
   * Handle Provicer sign is like [google]
   */
  const googleProvider = new GoogleAuthProvider();
  const handleProviderSignIn = (provider) => {
    providerSignIn(provider)
      .then((result) => {
        const user = result.user;
        if (user.uid) {
          // insertUserOnDB(user.displayName, user.email).then((res) => {
          //   if (res.data.acknowledged) {
          //     toast.success("Sign in successfuly. 🚀");
          //     navigate("/dashboard");
          //   }
          // });
        }
      })
      .catch((err) => {
        toast.error(err.message);
        toast.error(err.code);
      });
  };

  return (
    <section className="login-page py-12">
      <div className="container">
        <div className="row">
          <div className="site-logo w-[220px] mx-auto mb-8">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-full" />
            </Link>
          </div>

          <div className="auth-container ">
            <div className="auth-form border-[1px] py-8 px-8 rounded-lg shadow-md">
              <h3 className="text-2xl md:text-3xl font-semibold mb-6">
                Login now
              </h3>
              <form onSubmit={handleSubmit(handleLogin)}>
                <div className="single-input mb-6">
                  <input
                    className="border-0 border-b-[1px] py-2 w-full border-gray-400  outline-none"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    {...register("email", { required: "Email is required!" })}
                  />
                  <p className="text-red-500 text-sm ">
                    {errors?.email?.message}
                  </p>
                </div>
                <div className="single-input mb-6">
                  <input
                    className="border-0 border-b-[1px] py-2 w-full border-gray-400  outline-none"
                    type="password"
                    name="pass"
                    id="pass"
                    placeholder="Password"
                    {...register("pass", { required: "Password is required!" })}
                  />
                  <p className="text-red-500 text-sm ">
                    {errors?.pass?.message}
                  </p>
                </div>

                <div className="single-input">
                  <Button
                    variant="contained"
                    type="submit"
                    className="w-full"
                    size="large"
                  >
                    Login Now
                  </Button>
                </div>
              </form>

              <p className="mt-4 text-center">
                Do not have account?{" "}
                <Link to="/signup" className="text-primary text-blue-500">
                  Create an account
                </Link>
              </p>
            </div>

            <div className=" w-10/12 mx-auto">
              <div className="my-6">
                <Divider>OR</Divider>
              </div>

              <div className="google-login">
                <button
                  className="flex w-full items-center border rounded-full p-2"
                  onClick={() => handleProviderSignIn(googleProvider)}
                >
                  <img src={googleIcon} alt="Google Icon" />
                  <span className="flex-grow  text-center">
                    Continue with Google
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
