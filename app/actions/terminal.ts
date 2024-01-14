'use server';
import {PrismaClient, Domain, Registration} from '@prisma/client';
import { auth } from "@/lib/auth";
import {Prisma} from ".prisma/client";
import { revalidatePath } from 'next/cache';

interface consoleResponse {
    console: {
        message: string;
        type: 'error' | 'response';
    },
    registrations?: Registration[]
}

export const registerDomain = async (domain: Domain): Promise<consoleResponse> => {
    const prisma = new PrismaClient();

    const user = (await auth())!.user;
    const userId = (await prisma.user.findUnique({
        where: {
            email: user!.email!
        }
    }))!.id
    try {
        await prisma.registration.create({
            data: {
                domain: domain,
                userId: userId,
            }
        })
        const registrations = await prisma.registration.findMany({
            where: {
                userId: userId
            },
        })
        return {console: {message: 'Registration successful', type: 'response'}, registrations}
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return {console: {message: 'User already registered for this domain', type: 'error'}}
            }
        }
        return {console: {message: 'Registration failed due to an unknown error. Please try again later or reach out to us.', type: 'error'}}
    }
}

export const formSubmit = async (domain: Domain): Promise<consoleResponse> => {
    const prisma = new PrismaClient();

    const user = (await auth())!.user;
    if (!user) return {console: {message: 'User not logged in', type: 'error'}}

    const userId = (await prisma.user.findUnique({
        where: {
            email: user.email!
        }
    }))!.id
    try {
        await prisma.registration.update({
            where: {
                domain_userId: {
                    userId: userId,
                    domain: domain,
                }
            },
            data: {
                formSubmittedAt: new Date()
            }
        })
        const registrations = await prisma.registration.findMany({
            where: {
                userId: userId
            },
        })
        revalidatePath(`/forms/${domain}`)
        return {console: {message: 'Form submitted successfully', type: 'response'}, registrations}
    } catch (error) {
        return {console: {message: 'Form submission failed due to an unknown error. Please try again later or reach out to us.', type: 'error'}}
    }
}