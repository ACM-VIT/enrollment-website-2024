'use client';

import "./onboarding.css";
import Image from "next/image";
import H2 from "./assets/H2.png";
import rectangle_26 from "./assets/Rectangle 26.png";
import Dots from "./assets/Dots.png";
import rect from "./assets/rect.png";
import rectangle_25 from "./assets/Rectangle 25.png";
import rectangle_27 from "./assets/Rectangle 27.png";
import rectangle_24 from "./assets/Rectangle 24.png";
import h2_rev from "./assets/H2 rev.png";
import { useFormStatus } from 'react-dom'
import {User} from "@prisma/client";
import saveForm from "@//app/actions/onboarding";

const Onboarding = ({user}: {user: User}) => {


    return (
        <div className="container1">
            <Image src={H2} alt="" className="H21"/>
            <Image src={rectangle_26} alt="" className="side_half1"/>
            <Image src={Dots} alt="" className="top_dots1"/>
            <Image src={rect} alt="" className="top_rect1"/>
            <Image src={rectangle_25} alt="" className="top_half1"/>

            <div className="main1">
                <div className="profile1">
                    <h1>PROFILE</h1>
                </div>
                <form action={saveForm}>
                    <input type="text" name="" placeholder="Name" readOnly={true}
                           value={user!.name!.slice(0, user!.name!.length - 10)}/>
                    <input type="email" name="" placeholder="E-Mail" readOnly={true} value={user!.email!}/>
                    <input type="text" name="" placeholder="Registration Number" readOnly={true}
                           value={user!.name!.slice(user!.name!.length - 9)}/>
                    <input
                        type="number"
                        max={9999999999}
                        min={1000000000}
                        name="phone"
                        placeholder="Contact Number"
                    />
                    {
                        // TODO Error message for invalid phone number
                    }
                    <SubmitButton/>
                </form>
            </div>

            <Image src={rect} alt="" className="bottom_rect1"/>
            <Image src={Dots} alt="" className="bottom_dots1"/>
            <Image src={rectangle_27} alt="" className="side_half21"/>
            <Image src={rectangle_24} alt="" className="bottom_half1"/>
            <Image src={h2_rev} alt="" className="H2_rev1"/>
        </div>
    );
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return <button type="submit" id="submit_button" aria-disabled={pending}>SUBMIT</button>;
}

export default Onboarding;
