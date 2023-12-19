import React from "react";
import {SessionProvider} from "next-auth/react";
import App from "@/app/layout/App";
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";

export default async function Layout({children,}: {
    children: React.ReactNode,
}) {
    const { user } = (await auth())??{user:undefined};
    if (!user) {
        return redirect('/landing')
    }else
    return (
        <SessionProvider>
            <App>{children}</App>
        </SessionProvider>
    )
}
