'use client'
import React from "react";
import { useRouter } from 'next/navigation'
import signOutUser from "@/firebase/signout";

function Page() {
    const router = useRouter()

    const handlePress = async (event: any) => {
        event.preventDefault()

        try {
           await signOutUser();
        }
        catch (e) {
            console.error(e)
        }

        return router.push("/")
    }

    return (<div className="">
        <button onClick={(e) => { handlePress(e) }}>Sign out</button>
    </div>);
}

export default Page;