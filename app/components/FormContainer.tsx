import React from 'react';
import {Domain, PrismaClient} from "@prisma/client";
import {Container} from "@mui/material";
import {Form} from "@/app/components/form";
import {auth} from '@/lib/auth';


async function FormContainer({roundId}: { roundId: string }) {
    const prisma = new PrismaClient();

    const questions = await prisma.question.findMany({
        where: {
            roundId
        },
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
    });
    return (
        <Container maxWidth={false}>
            <Form questions={questions} roundId={roundId}/>
        </Container>
    );
}

export default FormContainer;