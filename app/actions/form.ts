'use server';

import {PrismaClient} from '@prisma/client';
import {auth} from "@/lib/auth";
import {revalidateTag} from "next/cache";

const prisma = new PrismaClient();

const saveForm = async (roundId: string, valid: boolean, formData: Record<string, {
    response: string | Record<string, boolean>,
    error: { message: string } | null
}>) => {
    const session = await auth();

    if (!session || !session.user) return;

    const roundUserId = (await prisma.roundUser.findFirst({
        where: {
            roundId,
            user: {
                email: session.user.email
            }
        }
    }))!.id

    const submission = await prisma.formSubmission.upsert({
        where: {
            roundUserId
        },
        update: {
            updatedAt: new Date(),
        },
        create: {
            roundUserId,
            valid
        },
        include: {
            roundUser: {
                include: {
                    round: true
                }
            }
        }
    })

    //
    // const registrationId = (await prisma.registration.findUnique({
    //     where: {
    //         domain_userId: {
    //             userId: (await prisma.user.findUnique({
    //                 where: {
    //                     email: (await auth())!.user!.email!
    //                 }
    //             }))!.id,
    //             domain: domain,
    //         }
    //     }
    // }))!.id

    const questions = await prisma.question.findMany({
        where: {
            roundId: submission.roundUser.roundId,
        }
    });


    const promises =
        questions.map(async (question) => {
                return prisma.response.upsert({
                    where: {
                        questionId_formId: {
                            formId: submission.id,
                            questionId: question.id,
                        }
                    },
                    update: {
                        response: JSON.stringify(formData[question.id].response),
                    },
                    create: {
                        response: JSON.stringify(formData[question.id].response),
                        formId: submission.id,
                        questionId: question.id,
                    }
                })
            }
        )


    const responses = await Promise.allSettled(promises)
    console.log(responses)

    revalidateTag( 'FormContainer')
    return !responses.map((response) => {
        return response.status === 'rejected'
    }).includes(true)
}

export default saveForm;