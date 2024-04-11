import React from "react";
import "./chottahai.css";
import Image from "next/image";
import dots from "../landing/assets/Dots.png";

export default function Chottahai() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                width: "100vw",
            }}
            id="page"
        >
            <header
                style={{ backgroundColor: "#040f1a", flex: 1 }}
                id="header"
            />
            <main
                style={{
                    backgroundColor: "#100f0f",
                    position: "relative",
                    color: "#bcc5d1",
                    display: "flex",
                    flex: 4,
                }}
                id="main"
            >
                <Image
                    style={{ position: "absolute", left: 0, top: "60%" }}
                    src={dots}
                    alt="left dots"
                    id="left-dots"
                />
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    id="center"
                >
                    <span id="text" style={{ fontWeight: "500" }}>
                        Oops :/ <br /> Please open on desktop
                    </span>
                </div>
                <Image
                    style={{
                        position: "absolute",
                        right: 0,
                        bottom: "70%",
                    }}
                    src={dots}
                    alt="right dots"
                    id="right-dots"
                />
            </main>
            <aside
                style={{
                    flex: 1.5,
                    backgroundColor: "#040f1a",
                    color: "#bbc5d1",
                    padding: "0.1% 2%",
                    wordSpacing: "1em",
                    fontFamily: "Poppins, sans-serif",
                }}
                id="terminal"
            >
                PROBLEMS{" "}
                <span
                    style={{
                        textDecoration: "underline",
                        textUnderlineOffset: "6px",
                        color: "white",
                        fontFamily: "Poppins, sans-serif",
                    }}
                    id="underline-offset"
                >
                    OUTPUT
                </span>{" "}
                DEBUG CONSOLE TERMINAL
            </aside>
        </div>
    );
}