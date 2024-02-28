import React from "react";
import { SessionProvider } from "next-auth/react";
import App from "@/app/layout/App";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import {isDesktop} from "react-device-detect";
import Chottahai from "@/app/layout/chottahai";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const prisma = new PrismaClient();

    const session = await auth();
    if (!session || !session.user) return redirect("/landing");

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email!,
        },
        include: {
            // registrations: true,
            RoundUser: {
                include: {
                    round: true,
                }
            }
        },

    });
    if (!user || !user.phone) {
        return redirect("/landing");
    }

    if(!isDesktop) return <Chottahai/>

    return (
        <SessionProvider>
            <App user={user}>{children}</App>
        </SessionProvider>
    );
}
