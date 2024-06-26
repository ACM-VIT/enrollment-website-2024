'use server';
import {PrismaClient, Domain, RoundStatus, RoundType} from '@prisma/client';
import {auth} from "@/lib/auth";
import {Prisma} from ".prisma/client";
import RoundUserGetPayload = Prisma.RoundUserGetPayload;
import {revalidatePath} from "next/cache";

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
        return {console: {message: 'Well, registration successful! You can proceed to form-filling...', type: 'response'}, roundUser}
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return {console: {message: 'Since you have have already registered for this domain previously, you cannot re-register again.', type: 'error'}}
            }
        }
        console.error(error)
        return {
            console: {
                message: 'Registration failed due to an unknown error. Please try again later or reach out to us :)',
                type: 'error'
            }
        }
    }
}

export const submitForm = async (domain: Domain): Promise<consoleResponse> => {
    try {

    const prisma = new PrismaClient();

    const session = await auth();
    if (!session || !session.user) return {console: {message: 'Please log in again', type: 'error'}}

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: session.user.email!,
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
            message: 'Seems like you have not registered for this domain...',
            type: 'error'
        }
    };

    // noinspection JSPotentiallyInvalidTargetOfIndexedPropertyAccess
    const roundUser = user.RoundUser[0]

    if (roundUser.round.type !== RoundType.form) return {
        console: {
            message: 'Seems like there is no active form to be submitted...',
            type: 'error'
        }
    };

    if (!roundUser.round.active) return {
        console: {
            message: 'You just missed! Form submissions for this round have closed!',
            type: 'error'
        }
    };

    if (roundUser.status !== RoundStatus.pending) return {
        console: {
            message: 'Seems like you have already submitted the form for this round...',
            type: 'error'
        }
    }

    if (!roundUser.formSubmission) return {
        console: {
            message: 'Please fill the form before submitting it!',
            type: 'error'
        }
    }

    if (!roundUser.formSubmission.valid) return {
        console: {
            message: 'There is something incomplete or wrong in the form that you need to recheck. Please try again',
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
        const roundUsers = await prisma.roundUser.findMany({
            where: {
                userId: user.id
            },
            include: {
                round: true
            }
        })

        return {console: {message: 'Letsgoo! Form submitted successfully. You can check your status using the fork icon on the top-left corner.', type: 'response'}, roundUser: roundUsers}
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
        const roundUsers = await prisma.roundUser.findMany({
            where: {
                userId: user.id
            },
            include: {
                round: true
            }
        })
        return {console: {message: 'Letsgoo! Form submitted successfully.', type: 'response'}, roundUser: roundUsers}
    }
    } catch (error) {
        return {console: {message: 'Form submission failed due to an unknown error. Please try again later or reach out to us.', type: 'error'}}
    }

}

export const submitTask = async (domain: Domain, content: string): Promise<consoleResponse> => {
    try {

    const prisma = new PrismaClient();

    const session = await auth();
    if (!session || !session.user) return {console: {message: 'Please log in again', type: 'error'}}

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: session.user.email!,
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
                    Task: true,
                    TaskSubmission: true
                }
            }
        }
    })


    if (user.RoundUser.length === 0) return {
        console: {
            message: 'Seems like you have not registered for this domain...',
            type: 'error'
        }
    };

    // noinspection JSPotentiallyInvalidTargetOfIndexedPropertyAccess
    const roundUser = user.RoundUser[0]

    if (roundUser.round.type !== RoundType.task) return {
        console: {
            message: 'Seems like there is no active task to be submitted...',
            type: 'error'
        }
    };

    if (!roundUser.Task) return {
        console: {
            message: 'You hav not been assigned a Task yet.',
            type: 'error'
        }
    }

    if (!roundUser.round.active || new Date() > roundUser.Task.deadline) return {
        console: {
            message: 'You just missed! Form submissions for this round have closed!',
            type: 'error'
        }
    };

    if (roundUser.status !== RoundStatus.pending) return {
        console: {
            message: 'Seems like you have already submitted the form for this round...',
            type: 'error'
        }
    }

    if (!!roundUser.TaskSubmission) return {
        console: {
            message: 'You have already submitted the task for this round...',
            type: 'error'
        }
    }

    if (roundUser.round.eliminates) {
        await prisma.roundUser.update({
            where: {
                id: roundUser.id
            },
            data: {
                status: RoundStatus.evaluate,
                TaskSubmission: {
                    create: {
                        text: content
                    }
                }
            }
        })
        const roundUsers = await prisma.roundUser.findMany({
            where: {
                userId: user.id
            },
            include: {
                round: true
            }
        })

        return {console: {message: 'Letsgoo! Task submitted successfully. You can check your status using the fork icon on the top-left corner.', type: 'response'}, roundUser: roundUsers}
    } else {
        await Promise.allSettled([prisma.roundUser.update({
            where: {
                id: roundUser.id
            },
            data: {
                status: RoundStatus.promoted,
                TaskSubmission: {
                    create: {
                        text: content
                    }
                }
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
        const roundUsers = await prisma.roundUser.findMany({
            where: {
                userId: user.id
            },
            include: {
                round: true
            }
        })
        return {console: {message: 'Letsgoo! Task submitted successfully.', type: 'response'}, roundUser: roundUsers}
    }
    } catch (error) {
        return {console: {message: 'Task submission failed due to an unknown error. Please try again later or reach out to us.', type: 'error'}}
    }

}