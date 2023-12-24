import React from "react";
import {SessionProvider} from "next-auth/react";
import App from "@/app/layout/App";
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";
import {PrismaClient} from "@prisma/client";


export default async function Layout({children,}: {
    children: React.ReactNode,
}) {
    const prisma = new PrismaClient();

    const { user } = (await auth())??{user:undefined};
    const registrations = await prisma.registration.findMany({
        where: {
            user: {
                email: user?.email
            }
        }
    });

    if (!user) {
        return redirect('/landing')
    }else
    return (
        <SessionProvider>
            <App registrations={registrations}>{children}</App>
        </SessionProvider>
    )
}
