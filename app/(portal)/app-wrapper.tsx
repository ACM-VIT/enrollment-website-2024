'use client';
import React from 'react';
import {Prisma} from ".prisma/client";
import UserGetPayload = Prisma.UserGetPayload;
import App from "@/app/layout/App";
import {isDesktop} from "react-device-detect";
import Chottahai from "@/app/layout/chottahai";

function AppWrapper({
                        user,
                        children,
                    }: {
    children: React.ReactNode;
    user: UserGetPayload<{
        include: {
            RoundUser: {
                include: {
                    round: {
                        include: {
                            Meet: true,
                        },
                    },
                    Meet_User: true
                },
                orderBy: {
                    round: {
                        number: "desc",
                    },
                }
            },
        }
    }>;
}) {
    return isDesktop ? (
        <App user={user}>{children}</App>
    ) : (
        <Chottahai/>
    );
}

export default AppWrapper;