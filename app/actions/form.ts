'use server';

import {PrismaClient, Domain} from '@prisma/client';
import {auth} from "@/lib/auth";

const prisma = new PrismaClient();

const saveForm = async (domain: Domain, formData: FormData) => {
    // const form = await prisma.question.findMany({
    //     where: {
    //         domain: domain,
    //     }
    // })
    // form.map(async (question) => {
    //     await prisma.response.upsert({
    //         where: {
    //             questionId_registrationId: {
    //                 registrationId: (await prisma.registration.findUnique({
    //                     where: {
    //                         domain_userId: {
    //                             userId: (await auth())!.user!.id,
    //                             domain: domain,
    //                         }
    //                     }
    //                 }))!.id,
    //                 questionId: question.id,
    //             }
    //         },
    //         update: {
    //             response: formData.get(question.id.toString()) as string,
    //         },
    //         create: {
    //             response: formData.get(question.id.toString()) as string,
    //             registrationId: (await prisma.registration.findUnique({
    //                 where: {
    //                     domain_userId: {
    //                         userId: (await auth())!.user!.id,
    //                         domain: domain,
    //                     }
    //                 }
    //             }))!.id,
    //             questionId: question.id,
    //         }
    //     })
    // })
    console.log(formData.get('clqh2xpct00009m3abe6p3eqw'))
}

export default saveForm;