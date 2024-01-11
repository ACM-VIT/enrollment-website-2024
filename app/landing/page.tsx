import React from 'react';
import {auth} from "@/lib/auth";
import {signIn, signOut} from "@/lib/auth";
import {redirect} from "next/navigation";

async function Page() {
    return (
        <div>
            <form action={async () => {
                "use server";
                if (!(await auth())?.user) {
                    await signIn('google');
                } else {
                    redirect('./')
                }
            }}>
                <button>
                    {(await auth())?.user ? "Register for Enrolments" : "Sign in with Google"}
                </button>
            </form>
        </div>
    )
        ;
}

export default Page;