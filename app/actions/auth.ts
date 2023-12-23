'use server';
import {auth, signIn, signOut} from "@/lib/auth";


export const signOutAction = async () => {
    if ((await auth())!.user) {
        await signOut();
    }
}

export const signInAction = async () => {
    if (!(await auth())!.user){
        await signIn('google')
    }
}
