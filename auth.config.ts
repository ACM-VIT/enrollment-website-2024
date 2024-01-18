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
    // callbacks: {
    //     // async signIn({user, account, profile}) {
    //     //     return !!(account?.provider === 'google' &&
    //     //         profile?.verified_email === true &&
    //     //         profile?.email?.endsWith('@vitstudent.ac.in'));
    //     // },
    //     // authorized({auth}) {
    //     //     return auth?.user?.email?.endsWith('@vitstudent.ac.in');
    //     // }
    // },
    adapter: PrismaAdapter(new PrismaClient()),
} satisfies NextAuthConfig;