import { Divider } from "@mui/material";
import googleIcon from "./google-icon.png";
import { GoogleAuthProvider } from "firebase/auth";
import useAuthContex from "../../hooks/useAuthContex";
import { toast } from "react-toastify";

/**
 *
 *
 * Handle providerSignIn
 */
const googleProvider = new GoogleAuthProvider();

const GoogleSignIn = () => {
  const { providerSignIn } = useAuthContex();
  const handleProviderSignIn = (provider) => {
    providerSignIn(provider)
      .then((res) => {
        const user = res.user;
        if (user?.uid) {
          // insertUserOnDB(user.displayName, user.email).then((res) => {
          //   if (res.data.acknowledged) {
          //     toast.success("Sign in successfuly. 🚀");
          //     navigate("/dashboard");
          //   }
          // });
        }
      })
      .catch((err) => {
        toast.error(err.code);
      });
  };

  return (
    <div className="google-sign-in">
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
            <span className="flex-grow  text-center">Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoogleSignIn;
