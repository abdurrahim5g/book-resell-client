import axios from "axios";

const updateUserToDatabase = async (userInfo = {}) => {
  return await axios
    .post("http://localhost:5000/users", userInfo)
    .then((res) => res);
};

export { updateUserToDatabase };
