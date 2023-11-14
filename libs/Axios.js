import axios from "axios";
export let baseURL = axios.create({
  baseURL: "https://lastsdsd.onrender.com/api",
  withCredentials: true,
});
export let UploadImage = async (url) => {
  let form = new FormData();
  form.append("file", url);
  form.append("upload_preset", "babi_mart");
  form.append("cloud_name", "du9pkirsy");
  let res = await axios.post(
    "https://api.cloudinary.com/v1_1/du9pkirsy/image/upload",
    form
  );
  return res.data.secure_url;
};
//
