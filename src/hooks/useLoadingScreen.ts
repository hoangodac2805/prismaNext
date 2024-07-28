import { create } from "zustand";

interface Store {
  isLoading: boolean;
}
interface Action {
  setLoadingOff: () => void;
  setLoadingOn: () => void;
}
const useLoadingScreen = create<Store & Action>()((set) => ({
  isLoading: false,
  setLoadingOff: () => set({ isLoading: false }),
  setLoadingOn: () => set({ isLoading: true }),
}));

export default useLoadingScreen;
