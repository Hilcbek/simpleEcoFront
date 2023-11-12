import { create } from "zustand";

const useLoginHook = create((set) => ({
  open: false,
  reload: true,
  onReload: () => set({ reload: true }),
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));
export default useLoginHook;
