import React from "react";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";
import style from "@/app/components/linenos.module.css";

async function Txt({ roundId }: { roundId: string }) {
    const prisma = new PrismaClient();
    const task = prisma.roundUser.findUnique({
        where: {
            id: roundId,
            user: {
                email: (await auth())!.user!.email!,
            },
            round: {
                type: "task",
            },
        },
        include: {
            round: true,
            Task: true,
        },
    });

    if (!task) return <>Task not yet assigned.</>;

    return (
        <div className={style.code}>
            <code>Task assigned: &quot;{}&quot;</code>
            <code>Task deadline: &quot;{}&quot;</code>
            <code>
                #To upload task link, type &quot;tasksubmit &lt;link&gt;&quot;
            </code>
        </div>
    );
}

export default Txt;
