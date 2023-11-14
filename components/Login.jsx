import React, { useEffect, useState } from "react";
import useLoginHook from "../Hooks/useLoginHook";
import { Inputs } from "../ReusableComponents/Inputs";
import { LoginRegisterModal } from "../src/Modal/LoginRegisterModal";
import useRegisterHook from "../Hooks/useRegisterHook";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { baseURL } from "../libs/Axios";
import { useDispatch } from "react-redux";
import { LOGIN } from "../Toolkit/useSlice";
export const Login = () => {
  let [loading, setLoading] = useState(false);
  let dispatcher = useDispatch();
  let {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  let login = useLoginHook();
  let registeObj = useRegisterHook();
  let handleModal = () => {
    login.onClose();
    setTimeout(() => {
      registeObj.onOpen();
    }, 300);
  };
  let Submit = async (data) => {
    let { username, password } = data;
    setLoading(true);
    try {
      setLoading(true);
      let res = await baseURL.post("/auth/login", {
        username,
        password,
      });
      if (res.data) {
        toast.success(`Logged Successfully`);
        login.onClose();
        dispatcher(
          LOGIN({
            username: res.data.data.username,
            profile: res.data.data.profile,
            isAdmin: res.data.data.isAdmin,
          })
        );
        reset({
          username: "",
          email: "",
          password: "",
        });
        login.onReload();
      }
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };
  const Body = (
    <div className="flex items-center justify-center flex-col w-11/12 mx-auto">
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
      <h1 className="mr-1 text-gray-700">Don't have an Account?</h1>
      <button
        onClick={handleModal}
        className="text-xs font-bold hover:tracking-wider transition-all ease-linear duration-300"
      >
        Register
      </button>
    </div>
  );
  return (
    <LoginRegisterModal
      open={login.open}
      label={loading ? "Logging..." : "Login"}
      onClose={login.onClose}
      title={"Ecommerce-app"}
      SubTitle={"Login"}
      body={Body}
      footer={footer}
      onSubmit={handleSubmit(Submit)}
      disabled={loading}
    />
  );
};
