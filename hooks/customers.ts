import { db } from "@/firebase/config"
import { UserCustomer } from "@/types/User"
import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"

export const useCustomerByEmail = (email: string) => {
    const [customers, setCustomers] = useState<UserCustomer[]>([])
    useEffect(() => {
        getDocs(collection(db, "Customers"))
            .then((querySnapshot) => {
                const customers = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setCustomers(customers as UserCustomer[]);
            })

        return () => {
            setCustomers([])
        }
    }, [email])

    const [customer, setcustomer] = useState<any>(null)
    useEffect(() => {
        const customer = customers?.find((e) => e?.email === email)
        setcustomer(customer || null)
    }, [customers])

    return { customers, customer }
}