'use server';
import parsePhoneNumber from 'libphonenumber-js'

import {PrismaClient} from "@prisma/client";
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";

const saveForm = async (formData: FormData) => {
    const prisma = new PrismaClient();

    await prisma.user.update({
        where: {
            email: (await auth())!.user!.email!
        },
        data: {
            phone: parsePhoneNumber(formData.get('phone')?.toString() as string, 'IN')!.format('INTERNATIONAL')
        }
    })

    return redirect('/instructions/instructions')
}

export default saveForm;