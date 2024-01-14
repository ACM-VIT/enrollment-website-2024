'use server';

import {PrismaClient} from "@prisma/client";
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";

const saveForm = async (formData: FormData) => {
    const prisma = new PrismaClient();
    console.log(formData.get('phone'))

    await prisma.user.update({
        where: {
            email: (await auth())!.user!.email!
        },
        data: {
            phone: formData.get('phone')?.toString() as string
        }
    })

    return redirect('/extras/whois')
}

export default saveForm;