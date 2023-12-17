'use client';

import React from 'react';
import MDContainer from "@/app/components/MDContainer";
import {usePathname} from "next/navigation";
import {pages} from "@/app/pages/pages";
function Page({params}: {params: { domain: string }}) {

    const pathname = usePathname();
    const page = pages.find((x) => x.route === pathname)!;

    return (
        <MDContainer  path={`pages/${page.name}`}/>
    );
}

export default Page;
