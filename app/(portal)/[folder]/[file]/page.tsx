'use client';
import { notFound } from "next/navigation";
import { pages } from "@/app/pages/pages";
import Terminal from "@/app/components/Terminal";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useState } from 'react';




function Page({params}: {params: { file: string, folder: string }}) {
    const page = pages.find((x) => x.group === params.folder && x.route === params.file)!;

    const [showTerminal, setShowTerminal] = useState(true);


    if (showTerminal == true) {
        return (<>
            <Box
                sx={{
                    height: "65%",
                    overflow: "auto",
                }}
            >
                {page?.content ?? notFound()}
            </Box>
            <Box
                component={Paper}
                sx={{
                    height: "35%",
                    overflow: "auto",
                    
                }}
                elevation={4}
            >
                <Terminal showTerminal={showTerminal}></Terminal>
            </Box>
        </>)
    }
    else {
        return page?.content ?? notFound();
    }
    
    
}

export default Page;
