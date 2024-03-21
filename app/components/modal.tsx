import Image from "next/image";
import "./modal-styling.css";
import info from "./assets/info.svg";
import close_red from "./assets/close-red.png";
import close_white from "./assets/close-white.png";
import {Slot} from "@prisma/client";
import React, {useTransition} from "react";
import schedule from "@/app/actions/schedule";

interface ModalType {
    // children?: ReactNode;
    isOpen: boolean;
    toggle: () => void;
    slots: Slot[];
    roundId: string;
}

const timings = [
    {startTime: "", endTime: ""},
    {startTime: "", endTime: ""},
    {startTime: "", endTime: ""},
    {startTime: "", endTime: ""},
]

export default function Modal(props: ModalType) {
    const [pending, startTransition] = useTransition();
    const [selectedSlot, setSelectedSlot] = React.useState("");
    const [error, setError] = React.useState("");
    function handleSchedule() {
        if (!selectedSlot) {
            setError("Please select a time slot");
            return;
        }
        startTransition(async () => {
            setError("");
            const res = await schedule(selectedSlot, props.roundId)
            if (!res) setError("Something went wrong. Please try again later");
            if (res === 2) setError("You have already scheduled an interview for this round");
            if (res === 3) setError("This slot is already full. Please select another slot");
            if (res === 1) {
                setError("Interview scheduled successfully");
                props.toggle();
            }
        })
    }

    return (
        <>
            {props.isOpen && (
                <div className="modal-overlay">
                    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                        <div className="title" style={{
                            color: "blue"
                        }}>
                            <span>Visual Studio Code</span>
                            <button className="exit-button" onClick={props.toggle}>
                                <Image src={close_white} className="white" alt=""></Image>
                                <Image src={close_red} className="red" alt=""></Image>
                            </button>
                        </div>
                        <div style={{
                            color: "black"
                        }}>
                            <div className="error">
                                <Image src={info} alt="info-icon"/>
                                SCHEDULE YOUR INTERVIEW!
                            </div>
                            <div className="details">
                                Select a time slot appropriate for you!!
                            </div>
                            <div style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center"

                            }}>
                                <select id="timesots" style={{
                                    width: "70%",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                    fontWeight: "600",
                                    backgroundColor: "white",
                                    color:"black"
                                }} value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)}>
                                    <option value="" disabled selected>Select a time slot</option>
                                    {props.slots.map((time) => (
                                        <option key={time.id} value={time.id}>
                                            {time.from.toLocaleString()} - {time.to.toLocaleString()}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div style={{color: "red"}}>{error}&nbsp;</div>
                            <div className="okay-button" >
                                <button disabled={pending} style={{
                                    color: "blue"
                                }} onClick={handleSchedule}>OK</button>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </>
    );
}
