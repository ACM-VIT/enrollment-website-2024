"use server"

import {PrismaClient} from "@prisma/client";
import {auth} from "@/lib/auth";

const subscribe = async (subscription: PushSubscriptionJSON) => {
    const prisma = new PrismaClient();
    const user = await auth();
    const email = user?.user?.email;

    if (!email) {
        throw new Error("Unauthorized");
    }

    const userId = (await prisma.user.findUnique({
        where: {
            email
        }
    }))?.id;

    if (!userId) {
        throw new Error("Unauthorized");
    }

    await prisma.subscription.create({
        data: {
            userId,
            endpoint: subscription.endpoint!,
            auth: subscription.keys!.auth,
            p256dh: subscription.keys!.p256dh
        }
    })

}

export default subscribe;