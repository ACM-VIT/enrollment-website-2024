import React from 'react';
import {PrismaClient} from "@prisma/client";
import {Container} from "@mui/material";
import {Form} from "@/app/components/form";
import {auth} from '@/lib/auth';


async function FormContainer({roundId}: { roundId: string }) {
    const prisma = new PrismaClient();

    // const questions = await prisma.question.findMany({
    //     where: {
    //         roundId
    //     },
    //     include: {
    //         responses: {
    //             where: {
    //                 submission: {
    //                     roundUser: {
    //                         roundId,
    //                         user: {
    //                             email: (await auth())!.user!.email!
    //                         }
    //                     }
    //                 }
    //             }
    //         },
    //         validators: {
    //             orderBy: {
    //                 priority: 'asc'
    //             }
    //         }
    //     }
    // });
    const round = await prisma.round.findUniqueOrThrow({
        where: {
            id: roundId
        },
        include: {
            Question: {
                include: {
                    responses: {
                        where: {
                            submission: {
                                roundUser: {
                                    roundId,
                                    user: {
                                        email: (await auth())!.user!.email!
                                    }
                                }
                            }
                        }
                    },
                    validators: {
                        orderBy: {
                            priority: 'asc'
                        }
                    }
                }
            }
        }
    });

    return (
        <Container maxWidth={false}>
            <Form round={round} />
        </Container>
    );
}

export default FormContainer;