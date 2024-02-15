import React from "react";

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
            <body style={{ margin: "0" }}>{children}</body>
        </html>
    );
}
