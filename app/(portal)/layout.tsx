import React from "react";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import AppWrapper from "@/app/(portal)/app-wrapper";

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
            RoundUser: {
                include: {
                    round: true,
                },
            },
        },
    });
    if (!user || !user.phone) {
        return redirect("/landing");
    }


    return (
        <SessionProvider>
            <AppWrapper user={user}>{children}</AppWrapper>
        </SessionProvider>
    );
}
