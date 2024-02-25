"use client";

import {
  Grid,
} from "@mui/material";
import React from "react";
import Image from "next/image";

export default function Page() {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: `calc(100vh - 20px - 33px)` }}
        >
            <Image
                src="/AcmLogo.svg"
                width={150}
                height={150}
                style={{
                    height: "auto",
                    width: "auto",
                }}
                alt="logo"
            />
        </Grid>
    );
}

