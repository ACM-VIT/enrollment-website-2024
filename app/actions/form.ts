'use server';

import {PrismaClient, Domain} from '@prisma/client';
import {auth} from "@/lib/auth";

const prisma = new PrismaClient();

const saveForm = async (domain: Domain, formData: FormData) => {
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
    form.map((question) => {
            prisma.response.upsert({
                where: {
                    questionId_registrationId: {
                        registrationId,
                        questionId: question.id,
                    }
                },
                update: {
                    response: formData.get(question.id.toString()) as string,
                },
                create: {
                    response: formData.get(question.id.toString()) as string,
                    registrationId,
                    questionId: question.id,
                }
            }).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.error(error)
            })

        }
    )
}

export default saveForm;