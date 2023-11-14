import React, { useEffect, useState } from "react";
import { LoginRegisterModal } from "../src/Modal/LoginRegisterModal";
import { Inputs } from "../ReusableComponents/Inputs";
import useRegisterHook from "../Hooks/useRegisterHook";
import useLoginHook from "../Hooks/useLoginHook";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { UploadImage, baseURL } from "../libs/Axios";
export const Register = () => {
  let login = useLoginHook();
  let [loading, setLoading] = useState(false);
  let [image, setImage] = useState(
    "https://www.nicepng.com/png/full/128-1280406_view-user-icon-png-user-circle-icon-png.png"
  );
  let registerObj = useRegisterHook();
  let {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  let handleModal = () => {
    registerObj.onClose();
    setTimeout(() => {
      login.onOpen();
    }, 300);
  };
  let Submit = async (data) => {
    let { username, email, password } = data;
    try {
      setLoading(true);
      let status = String(image).includes("https") ? true : false;
      let resultImgae = image;
      if (!status) {
        resultImgae = await UploadImage(image);
      }
      let res = await baseURL.post("/auth/register", {
        username,
        email,
        password,
        profile: resultImgae,
      });
      if (res.data) {
        toast.success(`Successfully registered`);
         reset({
           username: "",
           email: "",
           password: "",
         });
        handleModal();
      }
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const Body = (
    <div className="flex items-center justify-center flex-col w-11/12 mx-auto">
      <label
        htmlFor="image"
        className="w-14 h-14 border-solid border-gray-200 border-[1px] my-2 rounded-full"
      >
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          className="hidden"
          id="image"
        />
        <img
          className="w-full h-full object-contain rounded-full"
          src={
            String(image).includes("https")
              ? image
              : image
              ? URL?.createObjectURL(image)
              : "https://www.nicepng.com/png/full/128-1280406_view-user-icon-png-user-circle-icon-png.png"
          }
          alt=""
        />
      </label>
      <Inputs
        errors={errors}
        type={"text"}
        id={"username"}
        register={register}
        required
        label={"Username"}
      />
      <Inputs
        errors={errors}
        type={"email"}
        id={"email"}
        register={register}
        required
        label={"Email-Address"}
      />
      <Inputs
        errors={errors}
        type={"password"}
        id={"password"}
        register={register}
        required
        label={"Password"}
      />
    </div>
  );
  const footer = (
    <div className="my-1 flex items-center justify-center text-xs">
      <h1 className="mr-1 text-gray-700">Already have an Account?</h1>
      <button
        onClick={handleModal}
        className="text-xs font-bold hover:tracking-wider transition-all ease-linear duration-300"
      >
        Login
      </button>
    </div>
  );
  return (
    <LoginRegisterModal
      open={registerObj.open}
      label={loading ? "Registering..." : "Register"}
      onClose={registerObj.onClose}
      title={"Ecommerce-app"}
      SubTitle={"Register"}
      body={Body}
      disabled={loading}
      onSubmit={handleSubmit(Submit)}
      footer={footer}
    />
  );
};
