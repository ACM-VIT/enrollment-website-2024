'use server';
import {PrismaClient, Domain, RoundStatus, RoundType} from '@prisma/client';
import {auth} from "@/lib/auth";
import {Prisma} from ".prisma/client";
import RoundUserGetPayload = Prisma.RoundUserGetPayload;

interface consoleResponse {
    console: {
        message: string;
        type: 'error' | 'response';
    },
    roundUser?: RoundUserGetPayload<{ include: { round: true } }>[]
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
        await prisma.roundUser.create({
            data: {
                round: {
                    connect: {
                        domain_number: {
                            domain: domain,
                            number: 1
                        }
                    }
                },
                user: {
                    connect: {
                        id: userId
                    }
                },
                status: RoundStatus.pending
            }
        })

        const roundUser = await prisma.roundUser.findMany({
            where: {
                userId: userId
            },
            include: {
                round: true
            }
        })
        return {console: {message: 'Registration successful', type: 'response'}, roundUser}
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return {console: {message: 'User already registered for this domain', type: 'error'}}
            }
        }
        console.error(error)
        return {
            console: {
                message: 'Registration failed due to an unknown error. Please try again later or reach out to us.',
                type: 'error'
            }
        }
    }
}

export const submitForm = async (domain: Domain): Promise<consoleResponse> => {
    const prisma = new PrismaClient();

    const session = await auth();
    if (!session || !session.user) return {console: {message: 'User not logged in', type: 'error'}}

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: session.user.email!
        },
        include: {
            RoundUser: {
                where: {
                    round: {
                        domain: domain
                    }
                },
                orderBy: {
                    round: {
                        number: 'desc'
                    }
                },
                include: {
                    round: true,
                    formSubmission: true
                }
            }
        }
    })


    if (user.RoundUser.length === 0) return {
        console: {
            message: 'You have not registered for this domain',
            type: 'error'
        }
    };

    // noinspection JSPotentiallyInvalidTargetOfIndexedPropertyAccess
    const roundUser = user.RoundUser[0]

    if (roundUser.round.type !== RoundType.form) return {
        console: {
            message: 'There is no active form to be submitted',
            type: 'error'
        }
    };

    if (!roundUser.round.active) return {
        console: {
            message: 'Form submissions for this round have been closed',
            type: 'error'
        }
    };

    if (!roundUser.formSubmission) return {
        console: {
            message: 'You have not filled the form',
            type: 'error'
        }
    }

    if (!roundUser.formSubmission.valid) return {
        console: {
            message: 'Form is invalid. Please check your responses and try again',
            type: 'error'
        }
    }

    if (roundUser.round.eliminates) {
        await prisma.roundUser.update({
            where: {
                id: roundUser.id
            },
            data: {
                status: RoundStatus.evaluate
            }
        })
        return {console: {message: 'Form submitted successfully. Wait for results.', type: 'response'}}
    } else {
        await Promise.allSettled([prisma.roundUser.update({
            where: {
                id: roundUser.id
            },
            data: {
                status: RoundStatus.promoted
            }
        }), prisma.roundUser.create({
            data: {
                round: {
                    connect: {
                        domain_number: {
                            domain: domain,
                            number: roundUser.round.number + 1
                        }
                    }
                },
                user: {
                    connect: {
                        id: user.id
                    }
                },
                status: RoundStatus.pending
            }
        })])
        return {console: {message: 'Form submitted successfully. Proceed to next activity.', type: 'response'}}
    }



    // const roundUser = await prisma.roundUser.findFirst({
    //     where: {
    //         userId: userId,
    //         round: {
    //             domain: domain,
    //         }
    //     },
    //     include: {
    //         round: true
    //     },
    //     orderBy: {
    //         round: {
    //             number: 'desc'
    //         }
    //     }
    // })

    // if (!roundUser) return {console: {message: 'User not registered for this domain', type: 'error'}}

    //
    // try {
    //     await prisma.registration.update({
    //         where: {
    //             domain_userId: {
    //                 userId: userId,
    //                 domain: domain,
    //             }
    //         },
    //         data: {
    //             formSubmittedAt: new Date()
    //         }
    //     })
    //     const registrations = await prisma.registration.findMany({
    //         where: {
    //             userId: userId
    //         },
    //     })
    //     // revalidatePath(`/forms/${domain}`)
    //     return {console: {message: 'Form submitted successfully', type: 'response'}, registrations}
    // } catch (error) {
    //     return {console: {message: 'Form submission failed due to an unknown error. Please try again later or reach out to us.', type: 'error'}}
    // }
}