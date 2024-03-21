import React from "react";
import { dm_sans } from "./ui/fonts";

export const metadata = {
    title: "Association for Computing Machinery",
    description: "ACM-VIT 2024 Organizing Committee Selections",
    metadataBase: new URL("https://localhost.acmvit.in/"),
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`${dm_sans.className} antialiased`}
                style={{ margin: "0" }}
            >
                {children}
            </body>
        </html>
    );
}
