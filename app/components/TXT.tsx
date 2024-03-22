import React from 'react';
import {PrismaClient} from "@prisma/client";
import {auth} from "@/lib/auth";

async function Txt({roundId}: { roundId: string }) {
    const prisma = new PrismaClient();
    const task = prisma.roundUser.findUnique({
        where: {
            id: roundId,
            user: {
                email: (await auth())!.user!.email!
            },
            round: {
                type: 'task'
            }
        },
        include: {
            round: true,
            Task: true
        }
    })

    if (!task) return <>Task not yet assigned.</>

    return (
        <div></div>
    );
}


export default Txt;