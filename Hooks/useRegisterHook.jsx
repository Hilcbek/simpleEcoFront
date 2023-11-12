import { FaSleigh } from "react-icons/fa";
import { create } from "zustand";

const useRegisterHook = create((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));
export default useRegisterHook;
