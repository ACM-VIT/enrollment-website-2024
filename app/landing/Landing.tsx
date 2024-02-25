"use client";
import React from "react";
import { useEffect } from "react";
import Image from "next/image";
import { useTransition } from "react";
import { signInAction } from "@/app/actions/auth";
import bglayer0 from "@/app/components/assets/bglayer0.png";
import bglayer1 from "@/app/components/assets/bglayer1.png";
import ACMLogo from "@/app/components/assets/AcmLogo.svg";
import dots from "@/app/components/assets/dots.png";
import bash from "@/app/components/assets/bash.png";
import Ig from "@/app/components/assets/ig.svg";
import Gh from "@/app/components/assets/GH.svg";
import Lk from "@/app/components/assets/LI.svg";
import yt from "@/app/components/assets/yt.svg";
import "../tailwind.css";
export default function Landing() {
    const [pending, startAuth] = useTransition();
    useEffect(() => {
        if (!localStorage.getItem("theme"))
            localStorage.setItem(
                "theme",
                window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light"
            );
    }, []);

    return (
        <div
            className="flex flex-col h-screen"
            style={{
                backgroundImage: `url(${bglayer1.src}), url(${bglayer0.src})`,
                backgroundPosition: `left bottom, left top`,
                backgroundSize: `cover,  auto 40vh`,
                backgroundRepeat: `no-repeat`,
            }}
        >
            <div className="h-3/4 flex flex-col md:h-30 pt-8 items-center justify-evenly ">
                <Image src={ACMLogo} alt="logo" style={{ height: "18vmin" }} />
                <span className="font-medium text-3xl py-4 text-center">
                    ACM Organizing Committee Selections
                </span>
                {pending ? (
                    <button
                        className="border border-button font-medium text-2xl p-4 w-auto hover:bg-button "
                        disabled
                    >
                        LOADING...
                    </button>
                ) : (
                    <button
                        className="border border-button font-medium text-2xl p-4 w-auto hover:bg-button "
                        onClick={() => startAuth(() => signInAction())}
                    >
                        REGISTER NOW
                    </button>
                )}
                <Image src={bash} alt="bash" />
            </div>
            <Image
                src={dots}
                alt="dots_right"
                className="absolute top-1/4 right-0"
            />
            <Image src={dots} alt="dots_left" className="absolute bottom-1/3" />
            <div className="flex justify-center items-center h-1/4">
                <a
                    href="https://www.youtube.com/@associationforcomputingmac7961"
                    target="_blank"
                >
                    <Image src={yt} alt="youtube" className="m-2" />
                </a>
                <a
                    href="https://www.instagram.com/acmvit/?hl=en"
                    target="_blank"
                >
                    <Image src={Ig} alt="instagram" className="m-2" />
                </a>
                <a
                    href="https://www.linkedin.com/company/acmvit/mycompany/"
                    target="_blank"
                >
                    <Image src={Lk} alt="linkedin" className="m-2" />
                </a>
                <a href="https://github.com/ACM-VIT" target="_blank">
                    <Image src={Gh} alt="github" className="m-2" />
                </a>
            </div>
        </div>
    );
}
