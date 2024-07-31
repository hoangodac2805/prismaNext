import React from "react";
import { create } from "zustand";
interface Store {
    isOpen: boolean,
    position: DrawerPosition
    content?: React.ReactNode,
    width: number,
    title: string,
    isLoading: boolean,
    btnPrimaryLabel?: React.ReactNode,
    btnPrimaryFnc: () => void,
}
interface Action {
    openDrawer: () => void;
    closeDrawer: () => void;
    setPosition: (position: DrawerPosition) => void;
    setContent: (content: React.ReactNode) => void;
    setWidth: (width: number) => void;
    setTitle: (title: string) => void;
    setLoading: (value: boolean) => void;
    setBtnPrimaryLabel: (value: React.ReactNode) => void;
    setBtnPrimaryFnc: (Fnc: () => void) => void;
}

const useDefaultDrawer = create<Store & Action>()((set) => ({
    isOpen: false,
    position: "right",
    content: undefined,
    width: 500,
    title: "Drawer",
    isLoading: false,
    btnPrimaryLabel: undefined,
    openDrawer: () => set({ isOpen: true }),
    closeDrawer: () => set({ isOpen: false }),
    setPosition: (position) => set({ position }),
    setContent: (content) => set({ content }),
    setWidth: (width) => set({ width }),
    setTitle: (title) => set({ title }),
    setLoading: (value) => set({ isLoading: value }),
    btnPrimaryFnc: () => { },
    setBtnPrimaryFnc: (Fnc) => { set({ btnPrimaryFnc: Fnc }) },
    setBtnPrimaryLabel: (content) => { set({ btnPrimaryLabel: content }) }
}))

export default useDefaultDrawer