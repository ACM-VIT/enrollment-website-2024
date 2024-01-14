// 'use client';
import React from "react";
import {auth} from "@/lib/auth";
import Landing from "./Landing";
import Onboarding from "./onboarding";
import {PrismaClient} from "@prisma/client";
import {redirect} from "next/navigation";

async function Page() {
    const prisma = new PrismaClient();
    const {user} = (await auth()) ?? {user: undefined};
    if (user) {
        if ((await prisma.user.findUnique({where: {email: user!.email!}}))?.phone) {
            return redirect('/')
        } else {
            const prisma = new PrismaClient();
            const user = await prisma.user.findUnique({where:{email:(await auth())!.user!.email!}});

            return <Onboarding user={user!}/>
        }
    } else {
        return <Landing/>
    }
}

export default Page;
