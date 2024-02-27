import React from "react";
import "./chottahai.css";
import Image from "next/image";
import dots from "../landing/assets/Dots.png";

export default function Chottahai() {
    return (
        <div className="flex flex-col h-screen w-screen" id="page">
            <header className="bg-[#040f1a] flex-1" id="header" />
            <main
                className="bg-[#100f0f] text-[#bcc5d1] flex flex-row flex-[4]"
                id="main"
            >
                <section
                    className="flex-[0.5] pl-[1%] flex flex-col text-center justify-center	"
                    id="sidebar"
                >
                    <Image
                        className=" relative left-0 top-[40%]"
                        src={dots}
                        alt="left dots"
                        id="left-dots"
                    />
                    <span id="text" className="font-medium">
                        Oops :/ <br /> Please open on desktop
                    </span>
                    <Image
                        className="absolute right-0 bottom-[70%]"
                        src={dots}
                        alt="right dots"
                        id="right-dots"
                    ></Image>
                </section>
            </main>
            <aside
                className="flex-[1.5] bg-[#040f1a] font-poppins text-[#bbc5d1] py-[0.1%] px-[2%] [word-spacing:1em]"
                id="terminal"
            >
                PROBLEMS{" "}
                <span
                    className="underline underline-offset-[6px] text-white font-poppins"
                    id="underline-offset"
                >
                    OUTPUT
                </span>{" "}
                DEBUG CONSOLE TERMINAL
            </aside>
        </div>
    );
}
