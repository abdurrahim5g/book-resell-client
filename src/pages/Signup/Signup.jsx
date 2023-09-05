import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import googleIcon from "./google-icon.png";
import logo from "./logo.png";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuthContex from "../../hooks/useAuthContex";
import { toast } from "react-toastify";
import { GoogleAuthProvider } from "firebase/auth";
import { insertUserOnDB } from "../../utils/utils";

const Signup = () => {
  // states
  const [passError, setPassError] = useState(null);

  const { signUp, updateDisplayName, providerSignIn } = useAuthContex();
  // const location = useLocation()

  // features get from third party packages
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleSignUp = (data) => {
    const { name, email, pass, cPass } = data;
    if (pass === cPass) {
      signUp(email, pass)
        .then((result) => {
          const user = result.user;
          if (user.uid) {
            updateDisplayName(name)
              .then(() => {
                insertUserOnDB(name, email).then((res) => {
                  if (res.data.acknowledged) {
                    toast.success("Your account created successfuly!");
                    navigate("/dashboard");
                  }
                });
              })
              .catch((err) => toast.error(err.code));
          }
        })
        .catch((err) => {
          toast.error(err.code);
          reset();
        });
    } else {
      setPassError("Password dosen't match");
    }
  };

  /**
   *
   *
   * Handle providerSignIn
   */
  const googleProvider = new GoogleAuthProvider();
  const handleProviderSignIn = (provider) => {
    providerSignIn(provider)
      .then((res) => {
        const user = res.user;
        if (user?.uid) {
          insertUserOnDB(user.displayName, user.email).then((res) => {
            if (res.data.acknowledged) {
              toast.success("Sign in successfuly. 🚀");
              navigate("/dashboard");
            }
          });
        }
      })
      .catch((err) => {
        toast.error(err.code);
      });
  };

  return (
    <section className="signup-page py-12">
      <div className="container">
        <div className="row">
          <div className="site-logo w-[200px] mx-auto mb-8">
            <Link to="/" className="site-logo">
              <img src={logo} alt="Logo" />
            </Link>
          </div>

          <div className="auth-container ">
            <div className="auth-form border-[1px] py-8 px-8 rounded-lg shadow-md">
              <h3 className="text-2xl md:text-3xl font-semibold mb-6">
                Create an account
              </h3>
              <form onSubmit={handleSubmit(handleSignUp)}>
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
                  <input
                    className="border-0 border-b-[1px] py-2 w-full border-gray-400 outline-none"
                    type="password"
                    name="cPass"
                    id="cPass"
                    placeholder="Confirm Password"
                    {...register("cPass", {
                      required: "Confirm password is required!",
                      minLength: {
                        value: 6,
                        message: "Confirm Password atlast 6 cherecter or more",
                      },
                      maxLength: {
                        value: 12,
                        message: "Confirm Password should 6-12 cherecter.",
                      },
                    })}
                  />
                  <p className="text-sm text-red-500">
                    {errors?.cPass?.message}
                    {passError}
                  </p>
                </div>

                <div className="single-input mb-6">
                  <button className="btn btn-primary w-full text-center py-3 text-white rounded-lg hover:shadow-lg transition">
                    Create an account
                  </button>
                </div>
              </form>

              <p className="mt-4 text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-primary">
                  Login
                </Link>
              </p>
            </div>

            <div className=" w-10/12 mx-auto">
              <div className="divider my-8">OR</div>

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

export default Signup;
