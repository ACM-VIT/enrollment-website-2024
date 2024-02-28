import React from "react";
import { dm_sans } from "./ui/fonts";
export const metadata = {
    title: "ACM Enrolments",
    description: "ACM Junior Core Enrolments 2024",
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
