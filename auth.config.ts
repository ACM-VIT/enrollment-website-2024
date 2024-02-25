import type {NextAuthConfig} from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import {PrismaAdapter} from "@auth/prisma-adapter";

import {PrismaClient} from "@prisma/client";


export const authConfig = {
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: '/landing',
        newUser: '/landing',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: 'https://accounts.google.com/o/oauth2/auth?response_type=code&hd=vitstudent.ac.in',
        }),
    ],
    adapter: PrismaAdapter(new PrismaClient()),
} satisfies NextAuthConfig;