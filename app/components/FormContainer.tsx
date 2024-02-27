import React from "react";
import { Domain, PrismaClient } from "@prisma/client";
import { Container } from "@mui/material";
import { Form } from "@/app/components/form";
import { auth } from "@/lib/auth";

async function FormContainer({ domain }: { domain: Domain }) {
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
                        user: {
                            email: (await auth())!.user!.email,
                        },
                    },
                },
            },
        },
    });
    return (
        <Container maxWidth={false}>
            <Form questions={questions} domain={domain} />
        </Container>
    );
}

export default FormContainer;
