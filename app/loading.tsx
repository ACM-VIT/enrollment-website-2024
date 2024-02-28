"use client";
import React from "react";
import Image from "next/image";
import loader from "@/app/loader.gif";

export default function Loading() {
    return (
        <div
            style={{
                backgroundColor: "#030303",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Image src={loader} alt="Loading..."></Image>
        </div>
    );
}
