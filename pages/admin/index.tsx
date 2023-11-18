'use client'
import useAuth from "@/context/AuthContext";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
    const { worker, customer } = useAuth()!
    const router = useRouter();

    useEffect(() => {
        console.log('worker: ', worker)
        //if (user == null) router.push("/")
    }, [worker])

    useEffect(() => {
        console.log('customer: ', customer)
        //if (user == null) router.push("/")
    }, [customer])


    return (<h1>Only logged in users can view this page {/* {JSON.stringify(user)} */}</h1>);
}