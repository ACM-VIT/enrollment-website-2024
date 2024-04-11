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
            height="100%"
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

