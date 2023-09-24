import axios from "axios";

const updateUserToDatabase = async (userInfo = {}) => {
  return await axios
    .post("http://localhost:5000/users", userInfo)
    .then((res) => res);
};

/**
 *
 * uploadImage(image) => Image upload function
 */
const imagebbAPI = import.meta.env.VITE_ImageBB_API;
const uploadImage = async (image) => {
  let imageFile = image[0];
  const formData = new FormData();
  formData.append("image", imageFile);

  return axios
    .post(`https://api.imgbb.com/1/upload?key=${imagebbAPI}`, formData)
    .then((res) => res.data);
};

export { updateUserToDatabase, uploadImage };
