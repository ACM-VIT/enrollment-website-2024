import React from 'react';
import {Domain, PrismaClient} from "@prisma/client";
import {Container} from "@mui/material";
import {Form} from "@/app/components/form";


async function FormContainer({domain}: { domain: Domain }) {
    const prisma = new PrismaClient();

    const questions = await prisma.question.findMany({
        where: {
            domain: domain,
        },
        include: {
            responses: {
                where: {
                    registration: {
                        domain: domain,
                    },
                }
            }
        }
    });
    return (
        <Container>
            <Form questions={questions} domain={domain}/>
        </Container>
    );
}

export default FormContainer;