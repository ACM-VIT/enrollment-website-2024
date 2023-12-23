import React, {useRef} from 'react';
import {Domain, PrismaClient} from "@prisma/client";
import {Container} from "@mui/material";
import {Form} from "@/app/components/form";

const prisma = new PrismaClient();

async function FormContainer({domain}: { domain: Domain }) {
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