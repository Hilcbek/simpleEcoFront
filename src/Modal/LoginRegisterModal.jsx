import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../../ReusableComponents/Button";
import { GrFormClose } from "react-icons/gr";
export const LoginRegisterModal = ({
  open,
  label,
  title,
  body,
  SubTitle,
  footer,
  onSubmit,
  onClose,
  disabled,
  loading
}) => {
  let [openModal, setOpenmodal] = useState(open);
  useEffect(() => {
    setOpenmodal(open);
  }, [open]);

  let handleClose = useCallback(() => {
    if (disabled) return;
    setOpenmodal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);
  let handleSubmit = useCallback(() => {
    if (disabled) return;
    onSubmit();
  }, [disabled, onSubmit]);
  return (
    <div
      className={`${
        open ? "bg-neutral-800/70 z-[999]" : "bg-transparent z-[-999]"
      }  fixed top-0 left-0 flex items-center transform justify-center w-full z-[999] h-full bg-neutral-500/80`}
    >
      <div
        className={`
        ${openModal ? "translate-y-0" : "-translate-y-full"}
        ${openModal ? "opacity-100" : "opacity-0"}
        xs:w-11/12 md:w-3/12 mx-auto bg-[#fffefc] relative
        flex items-center justify-center rounded-md flex-col
        transition-all translate duration-300 ease-linear
        `}
      >
        <li
          onClick={handleClose}
          className="w-5 h-5 absolute top-1 cursor-pointer hover:bg-gray-200 transition duration-300 right-1 rounded-full flex items-center justify-center"
        >
          <GrFormClose className="text-xl" />
        </li>
        <h1 className="text-2xl font-semibold my-2 border-solid border-gray-200 w-full text-center border-b-[1px]">
          {title}
        </h1>
        <h2 className="text-xl my-1">{SubTitle}</h2>
        {body}
        <Button disabled={disabled} onClick={onSubmit} label={label} />
        {footer}
      </div>
    </div>
  );
};
