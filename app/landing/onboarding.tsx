"use client";

import React from "react";
import "./onboarding.css";
import Image from "next/image";
import dots from "@/app/components/assets/dots.png";
import { useFormStatus } from "react-dom";
import { User } from "@prisma/client";
import saveForm from "@/app/actions/onboarding";
import parsePhoneNumber from 'libphonenumber-js'
import "../tailwind.css";

export default function Onboarding({ user }: { user: User }) {
    const [phone, setPhone] = React.useState('');
    const [error, setError] = React.useState('');
    return (
        <div className="flex flex-col h-screen w-screen" id="page">
            <header className="bg-[#040f1a] flex-1" id="header" />
            <main
                className="bg-[#100f0f] text-[#bcc5d1] flex flex-row flex-[4]"
                id="main"
            >
                <section className="flex-[0.5] pl-[1%]" id="sidebar">
                    <span
                        className="py-[20%] px-[5%] space-x-[1em] text-[0.8rem]"
                        id="title"
                    >
                        <span
                            className="underline underline-offset-[6px] text-white font-poppins"
                            id="underline-offset"
                        >
                            USER
                        </span>{" "}
                        WORKSPACE
                    </span>
                    <div
                        className="font-poppins pt-[15%] px-[15%] pb-[0%]"
                        id="info"
                    >
                        <ul>
                            User-Information
                            <li className="listitem">Name</li>
                            <li className="listitem">Registration Number</li>
                            <li className="listitem">Mail ID</li>
                            <li className="listitem">Phone Number</li>
                        </ul>
                    </div>
                    <Image
                        className=" relative left-0 top-[40%]"
                        src={dots}
                        alt="left dots"
                        id="left-dots"
                    />
                </section>
                <section
                    className="flex-[2] border-l-4 border-solid border-[#252527] py-[4%] px-[2%] overflow-hidden"
                    id="profile"
                >
                    <span
                        className="text-white font-poppins text-2xl font-semibold "
                        id="heading"
                    >
                        Profile
                    </span>
                    <form
                        className="bg-transparent	flex flex-col"
                        action={saveForm}
                        id="form"
                        onSubmit={(e) => {
                            const parsedPhone = parsePhoneNumber(phone, 'IN');
                            if (!parsedPhone || !parsedPhone.isValid()) {
                                e.preventDefault();
                                setError('Invalid Phone Number');
                            } else {
                                setError('');
                            }
                        }}
                    >
                        <div className="text-left	">
                            <div className="m-4">
                                Name:
                                <br />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    readOnly={true}
                                    value={user!.name!.slice(
                                        0,
                                        user!.name!.length - 10
                                    )}
                                    className="border-[1px] border-solid border-[#222222] font-dmSans text-[#b0b0b0] bg-[#27272d] rounded-[5px] h-[1.5rem] w-[50%] min-w-60 text-[1rem] px-[2.5%] py-[1.1%] box-content"
                                />
                            </div>
                            <div className="m-4">
                                Email:
                                <br />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="E-Mail"
                                    readOnly={true}
                                    value={user!.email!}
                                    className="border-[1px] border-solid border-[#222222] font-dmSans text-[#b0b0b0] bg-[#27272d] rounded-[5px] h-[1.5rem] w-[50%] min-w-60 text-[1rem] px-[2.5%] py-[1.1%] box-content "
                                />
                            </div>
                            <div className="m-4">
                                Registration Number:
                                <br />
                                <input
                                    type="text"
                                    name="reg"
                                    placeholder="Registration Number"
                                    readOnly={true}
                                    value={user!.name!.slice(
                                        user!.name!.length - 9
                                    )}
                                    className="border-[1px] border-solid border-[#222222] font-dmSans text-[#b0b0b0] bg-[#27272d] rounded-[5px] h-[1.5rem] w-[50%] min-w-60 text-[1rem] px-[2.5%] py-[1.1%] box-content"
                                />
                            </div>
                            <div className="m-4">
                                Contact Number:
                                <br />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Contact Number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    onInput={() => setError('')}
                                    className="border-[1px] border-solid border-[#222222] font-dmSans text-[#b0b0b0] bg-[#27272d] rounded-[5px] h-[1.5rem] w-[50%] min-w-60 text-[1rem] px-[2.5%] py-[1.1%] box-content"
                                />
                                  <div className="m-4 text-[#ff0000]">{error}&nbsp;</div>
                            </div>
                        </div>

                        <SubmitButton />
                    </form>
                </section>
                <Image
                    className="absolute right-0 bottom-[70%]"
                    src={dots}
                    alt="right dots"
                    id="right-dots"
                />
            </main>
            <aside
                className="flex-[1.5] bg-[#040f1a] font-poppins text-[#bbc5d1] py-[0.1%] px-[2%] [word-spacing:1em]"
                id="terminal"
            >
                PROBLEMS{" "}
                <span
                    className="underline underline-offset-[6px] text-white font-poppins"
                    id="underline-offset"
                >
                    OUTPUT
                </span>{" "}
                DEBUG CONSOLE TERMINAL
            </aside>
        </div>
    );
}
function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            aria-disabled={pending}
            disabled={pending}
            className="text-white bg-[#3279CB] w-[110px] m-4 rounded p-3"
            id="button"
        >
            {pending ? "Submitting.." : "SUBMIT"}
        </button>
    );
}
