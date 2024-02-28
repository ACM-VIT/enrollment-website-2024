'use client';
import React, {useContext} from 'react';
import PagesContext from "@/lib/PagesContext";
import {notFound} from "next/navigation";

interface Page {
    index: number;
    name: string;
    route: string;
    group: string;
}

function Wrapper({page, children}: { page: Page, children: React.ReactNode }) {
    const {pages} = useContext(PagesContext)

    if(!pages.find(p=>p.index === page.index)) return notFound();

    return children;
}

export default Wrapper;