'use server';
import {auth, signOut} from "@/lib/auth";


export const signOutAction = async () => {
    'use server';
    if ((await auth())!.user) {
        await signOut();
    }
}
