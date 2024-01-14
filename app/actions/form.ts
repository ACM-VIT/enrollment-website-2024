'use server';

import {PrismaClient, Domain} from '@prisma/client';
import {auth} from "@/lib/auth";

const prisma = new PrismaClient();

const saveForm = async (domain: Domain, formData: Record<string, {
    response: string | Record<string, boolean>,
    error: { message: string } | null
}>) => {
    const registrationId = (await prisma.registration.findUnique({
        where: {
            domain_userId: {
                userId: (await prisma.user.findUnique({
                    where: {
                        email: (await auth())!.user!.email!
                    }
                }))!.id,
                domain: domain,
            }
        }
    }))!.id
    const form = await prisma.question.findMany({
        where: {
            domain: domain,
        }
    })
    const promises =
        form.map(async (question) => {
                return prisma.response.upsert({
                    where: {
                        questionId_registrationId: {
                            registrationId,
                            questionId: question.id,
                        }
                    },
                    update: {
                        response: JSON.stringify(formData[question.id].response),
                    },
                    create: {
                        response: JSON.stringify(formData[question.id].response),
                        registrationId,
                        questionId: question.id,
                    }
                })
            }
        )


    const responses = await Promise.allSettled(promises)
    console.log(responses)

    return !responses.map((response) => {
        return response.status === 'rejected'
    }).includes(true)
}
// const saveForm = async (domain: Domain, formData: FormData) => {
//     const registrationId = (await prisma.registration.findUnique({
//         where: {
//             domain_userId: {
//                 userId: (await prisma.user.findUnique({
//                     where: {
//                         email: (await auth())!.user!.email!
//                     }
//                 }))!.id,
//                 domain: domain,
//             }
//         }
//     }))!.id
//     const form = await prisma.question.findMany({
//         where: {
//             domain: domain,
//         }
//     })
//     const promises =
//         form.map(async (question) => {
//                 return prisma.response.upsert({
//                     where: {
//                         questionId_registrationId: {
//                             registrationId,
//                             questionId: question.id,
//                         }
//                     },
//                     update: {
//                         response: formData.get(question.id.toString()) as string,
//                     },
//                     create: {
//                         response: formData.get(question.id.toString()) as string,
//                         registrationId,
//                         questionId: question.id,
//                     }
//                 })
//             }
//         )
//
//
//     const responses = await Promise.allSettled(promises)
//     console.log(responses)
//
//     return !responses.map((response) => {
//         return response.status === 'rejected'
//     }).includes(true)
// }

export default saveForm;