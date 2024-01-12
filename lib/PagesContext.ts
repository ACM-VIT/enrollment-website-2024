'use client';
import React, {createContext} from "react";

interface Page {
    index: number;
    name: string;
    route: string;
    group: string;
    content: React.ReactNode;
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
    setCurrentPage: defaultFn,
    nextPage: null,
    setNextPage: defaultFn,
} as {
    pages: Page[];
    setPages: (pages: Page[]) => void;
    openPages: Page[];
    setOpenPages: (pages: Page[]) => void;
    currentPage: Page|undefined|null;
    setCurrentPage: (page: Page|undefined|null) => void;
    nextPage: Page|undefined|null;
    setNextPage: (page: Page|undefined|null) => void;
});
