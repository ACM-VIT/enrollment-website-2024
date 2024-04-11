"use server";
import {PrismaClient} from "@prisma/client";
import {auth} from "@/lib/auth";
import {revalidateTag} from "next/cache";

export default async function schedule(slotId: string, roundId: string) {
    const prisma = new PrismaClient();
    const roundUser = await prisma.roundUser.findMany({
        where: {
            user: {
                email: (await auth())!.user!.email!
            },
            round: {
                id: roundId
            }
        },
        include: {round: {include: {Meet: {include: {Slot: {include: {_count: {select: { scheduled: true }}}}}}}}, Meet_User: true},
        orderBy: {
            round: {
                number: 'desc'
            }
        }
    })
    if (!roundUser) return null;
    if (roundUser[0].round.type !== 'interview') return null;
    if (!!roundUser[0].Meet_User) return 2;

    const slot = roundUser[0].round.Meet!.Slot!.find(x => x.id === slotId);
    if (!slot) return null;
    if (slot._count.scheduled >= slot.capacity ) return 3;

    await prisma.meet_User.create({
        data: {
            roundUser: {
                connect: {
                    id: roundUser[0].id
                }
            },
            slot: {
                connect: {
                    id: slotId
                }
            }
        }
    })

    revalidateTag("JsonContainer")
    return 1;
}