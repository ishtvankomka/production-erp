"use client"
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    getAuth,
} from 'firebase/auth';
import firebase_app from '@/firebase/config';
import { useWorkerByEmail } from "@/hooks/workers";
import { useCustomerByEmail } from "@/hooks/customers";
import { UserCustomer, UserWorker } from "@/types/User";
import Link from 'next/link'

const auth = getAuth(firebase_app);

type AuthState = {
    customer: UserCustomer
    worker: UserWorker
};

const AuthContext = createContext<AuthState | null>(null);

const useAuth = (): AuthState | { customer: null, worker: null } => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("Please use AuthProvider in parent component");
    }

    return context || { customer: null, worker: null };
};

export const AuthProvider = (props: PropsWithChildren) => {
    const [loading, setLoading] = useState(true);

    //const [user, setUser] = useState<object | null>(null);
    const [userEmail, setUserEmail] = useState<string>('');

    const { worker } = useWorkerByEmail(userEmail)
    const { customer } = useCustomerByEmail(userEmail)


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log('auth:', auth)
            console.log('user:', user)
            if (user) {
                //setUser(user);
                setUserEmail(user?.email || '')
            } else {
                //setUser(null);
                setUserEmail('')
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);


    return (
        <AuthContext.Provider value={{ worker, customer }}>
            <p><b>{JSON.stringify(worker)}</b></p>
            <p><b>{JSON.stringify(customer)}</b></p>
            <header>
                <Link href="/">Catalogue</Link>
                {
                    !worker && customer &&
                    <Link href="/cart">Cart</Link>
                }
                {
                    !(worker || customer) &&
                    <>
                        <Link href="/signin">Sign in</Link>
                        <Link href="/signup">Sign up</Link>
                    </>
                }
                {
                    worker &&
                    <Link href="/production">Production</Link>
                }
                {
                    (worker || customer) &&
                    <Link href="/signout">Sign out</Link>
                }
            </header>
            {loading ? <div>Loading...</div> : props.children}
        </AuthContext.Provider>
    );
};

export default useAuth;