'use client'
import React from "react";
import { useRouter } from 'next/navigation'
import signOutUser from "@/firebase/signout";
import SignOut from "@/components/Signout";

function Page() {
    const router = useRouter()

    const handleSignOut = async () => {
        try {
            await signOutUser();
        }
        catch (e) {
            console.error(e)
        }

        return router.push("/")
    }

    return (
        <SignOut
            handleSignOut={handleSignOut}
        />
    );
}

export default Page;