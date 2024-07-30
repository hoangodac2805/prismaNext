import React from "react";
import { create } from "zustand";
interface Store {
    isOpen: boolean,
    position: DrawerPosition
    content?: React.ReactNode,
    width?: number,
    title?: string,
    isLoading?: boolean
}
interface Action {
    openModal: () => void;
    closeModal: () => void;
    setPosition: (position: DrawerPosition) => void;
    setContent: (content: React.ReactNode) => void;
    setWidth: (width: number) => void;
    setTitle: (title: string) => void;
    setLoading: (value: boolean) => void;
}

const useDefaultDrawer = create<Store & Action>()((set) => ({
    isOpen: false,
    position: "right",
    width: 500,
    title: "Drawer",
    isloading: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
    setPosition: (position) => set({ position }),
    setContent: (content) => set({ content }),
    setWidth: (width) => set({ width }),
    setTitle: (title) => set({ title }),
    setLoading: (value) => set({ isLoading: value })
}))

export default useDefaultDrawer