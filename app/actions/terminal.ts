'use server';
import {PrismaClient, Domain} from '@prisma/client';
import { auth } from "@/lib/auth";
import {Prisma} from ".prisma/client";


export const registerDomain = async (domain: Domain): Promise<{message: string, type: 'error'|'response'}> => {
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
        return {message: 'Registration successful', type: 'response'}
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return {message: 'User already registered for this domain', type: 'error'}
            }
        }
        return {message: 'Registration failed due to an unknown error. Please try again later or reach out to us.', type: 'error'}
    }
}

export const formSubmit = async (domain: Domain): Promise<{message: string, type: 'error'|'response'}> => {
    const prisma = new PrismaClient();

    const user = (await auth())!.user;
    if (!user) return {message: 'User not logged in', type: 'error'}
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
        return {message: 'Form submitted successfully', type: 'response'}
    } catch (error) {
        return {message: 'Form submission failed due to an unknown error. Please try again later or reach out to us.', type: 'error'}
    }
}