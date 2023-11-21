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
import { Loading } from "@/components/Loading";

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

    const [userEmail, setUserEmail] = useState<string>('');

    const { worker } = useWorkerByEmail(userEmail)
    const { customer } = useCustomerByEmail(userEmail)


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log('auth:', auth)
            console.log('user:', user)
            if (user) {
                setUserEmail(user?.email || '')
            } else {
                setUserEmail('')
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);


    return (
        <AuthContext.Provider value={{ worker, customer }}>
            {loading ? <Loading /> : props.children}
        </AuthContext.Provider>
    );
};

export default useAuth;