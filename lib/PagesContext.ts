'use client';
import {createContext} from "react";

interface Page {
    index: number;
    name: string;
    route: string;
    group: string;
    type: string;
}

const defaultFn = () => {
    console.log('error in PagesContext')
}
export default createContext({
    pages: [],
    setPages: defaultFn,
    openPages: [],
    setOpenPages: defaultFn,
    currentPage: null,
} as {
    pages: Page[];
    setPages: (pages: Page[]) => void;
    openPages: Page[];
    setOpenPages: (pages: Page[]) => void;
    currentPage: Page|null;
});
