"use client";
import React from 'react';
import style from "@/app/components/linenos.module.css";
import Modal from "@/app/components/modal";
import {Prisma} from ".prisma/client";
import RoundUserGetPayload = Prisma.RoundUserGetPayload;
import {Slot} from "@prisma/client";

function Json({rounduser, slots}: {
    rounduser: RoundUserGetPayload<{
        include: {
            round: {
                include: {
                    Meet: true
                }
            },
            Meet_User: {
                include: {
                    slot: true
                }
            }
        },
    }>, slots: Slot[]
}) {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => setIsOpen(prev=>!prev);
    return (
        (!rounduser.Meet_User) ?
            <>
                <div className={style.code} style={{
                    padding: "5px",
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <code style={{
                        color: "yellow"
                    }}>&#123;</code>
                    <code><span style={{
                        color: "#7CDCF1"
                    }}>&nbsp;&nbsp;&nbsp;&nbsp;&quot;activity&quot;</span> : <span style={{
                        color: "#CE9178"
                    }}>&quot;{rounduser.round.Meet!.title}&quot;</span>,</code>
                    <code><span style={{
                        color: "#7CDCF1"
                    }}>&nbsp;&nbsp;&nbsp;&nbsp;&quot;Scheduling link&quot;</span> : <span onClick={toggle} style={{
                        color: "#CE9178"
                    }}>&quot;Click Here to Schedule!&quot;</span>,</code>
                    <code style={{
                        color: "yellow"
                    }}>&#125;</code>
                </div>
                <Modal isOpen={isOpen} toggle={toggle} roundId={rounduser.roundId} slots={slots}/>
            </> :
            <div className={style.code} style={{
                padding: "5px",
                display: "flex",
                flexDirection: "column",
            }}>
            <code style={{
                    color: "yellow"
                }}>&#123;</code>
                <code><span style={{
                    color: "#7CDCF1"
                }}>&nbsp;&nbsp;&nbsp;&nbsp;&quot;activity&quot;</span> : <span style={{
                    color: "#CE9178"
                }}>&quot;{rounduser.round.Meet!.title}&quot;</span>,</code>
                <code><span style={{
                    color: "#7CDCF1"
                }}>&nbsp;&nbsp;&nbsp;&nbsp;&quot;time&quot;</span> : <span style={{
                    color: "#CE9178"
                }}>&quot;{rounduser.Meet_User.slot.from.toLocaleString()}-{rounduser.Meet_User.slot.to.toLocaleString()}&quot;</span>,</code>
                <code><span style={{
                    color: "#7CDCF1"
                }}>&nbsp;&nbsp;&nbsp;&nbsp;&quot;meeting link&quot;</span> : <span onClick={()=>window.open(rounduser.round.Meet!.meetLink )} style={{
                    color: "#CE9178"
                }}>&quot;{rounduser.round.Meet!.meetLink}&quot;</span>,</code>
                <code style={{
                    color: "yellow"
                }}>&#125;</code>
            </div>
    );
}

export default Json;