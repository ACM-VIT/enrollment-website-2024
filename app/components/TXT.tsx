import React from "react";
import {PrismaClient} from "@prisma/client";
import {auth} from "@/lib/auth";
import style from "@/app/components/linenos.module.css";

async function Txt({roundId}: { roundId: string }) {
    const prisma = new PrismaClient();
    const task = await prisma.roundUser.findFirst({
        where: {
            user: {
                email: (await auth())!.user!.email!,
            },
            round: {
                id: roundId,
                type: "task",
            },
        },
        include: {
            round: true,
            Task: true,
        },
    });

    if (!task || !task.Task) return <>Task not yet assigned.</>;

    return (
        <div className={style.code}>
            <code>Task details</code>
            <code/>
            <code>{task.Task.text}</code>
            <code/>
            <code/>
            <code>Task deadline</code>
            <code/>
            <code>{task.Task.deadline.toLocaleString()}</code>
            <code/>
            <code/>
            <code>
                #To upload task link, type &quot;tasksubmit &lt;link&gt;&quot; IN TERMINAL
            </code>
        </div>
    );
}

export default Txt;
