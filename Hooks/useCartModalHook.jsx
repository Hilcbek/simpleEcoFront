import { create } from "zustand";

const useCartModalHook = create((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));
export default useCartModalHook;