import React from 'react';
import {PrismaClient} from "@prisma/client";
import {auth} from "@/lib/auth";
import style from "./linenos.module.css"
import Modal from "@/app/components/modal";
import Json from "@/app/components/Json";


async function JsonContainer({roundId}: { roundId: string }) {

    const prisma = new PrismaClient();
    const rounduser = await prisma.roundUser.findFirstOrThrow({
        where: {
            user: {
                email: (await auth())!.user!.email!
            },
            round: {
                type: 'interview',
                id: roundId
            }
        },
        include: {
            round: {
                include: {
                    Meet: true
                }
            },
            Meet_User: {
                include: {
                    slot: true
                }
            }
        },
    })


    const slots = await prisma.slot.findMany({
        where: {
            meet: {
                roundId: roundId
            },
            from: {
                gte: new Date(new Date().getTime() + 15 * 60 * 1000)
            },
        },
        include: {_count: {select: {scheduled: true}}}
    });


    return (
        <Json rounduser={rounduser} slots={slots.filter(i=>i.capacity > i._count.scheduled)}/>
    );
}

export default JsonContainer;