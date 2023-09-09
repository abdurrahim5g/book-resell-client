import { Divider } from "@mui/material";
import googleIcon from "./google-icon.png";
import { GoogleAuthProvider } from "firebase/auth";
import useAuthContex from "../../hooks/useAuthContex";
import { toast } from "react-toastify";
import { updateUserToDatabase } from "../../utility/utility";
import { useNavigate } from "react-router-dom";

/**
 *
 *
 * Handle providerSignIn
 */
const googleProvider = new GoogleAuthProvider();

const GoogleSignIn = () => {
  const { providerSignIn } = useAuthContex();
  const navigate = useNavigate();

  const handleProviderSignIn = (provider) => {
    providerSignIn(provider)
      .then((res) => {
        const user = res.user;
        if (user?.uid) {
          const userDoc = {
            name: user?.displayName,
            email: user?.email,
            role: "buyer",
          };
          updateUserToDatabase(userDoc)
            .then((res) => {
              const data = res.data;
              console.log(res);
              if (data.acknowledged) {
                toast.success("Login successfuly 🚀");
                navigate("/dashboard/");
              }
            })
            .catch((err) => console.log(err));
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
