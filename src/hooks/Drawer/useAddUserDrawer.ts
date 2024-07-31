import { create } from "zustand";

interface Store {
    isOpen: boolean,
}
interface Action {
    openDrawer: () => void
    closeDrawer: () => void
}


const useAddUserDrawer = create<Store & Action>()((set) => ({
    isOpen: false,
    openDrawer: () => set({ isOpen: true }),
    closeDrawer: () => set({ isOpen: false }),
}))

export default useAddUserDrawer;