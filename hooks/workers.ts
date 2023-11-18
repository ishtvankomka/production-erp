import { db } from "@/firebase/config"
import { UserWorker } from "@/types/User"
import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"

export const useWorkerByEmail = (email: string) => {
    const [workers, setWorkers] = useState<UserWorker[]>([])
    useEffect(() => {
        getDocs(collection(db, "Workers"))
            .then((querySnapshot) => {
                const workers = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setWorkers(workers);
                //console.log('workers: ', workers);
            })

        return () => {
            setWorkers([])
        }
    }, [email])

    const [worker, setWorker] = useState<any>(null)
    useEffect(() => {
        const worker = workers?.find((e) => e?.email === email)
        setWorker(worker || null)
        //console.log('worker: ', worker);
    }, [workers])

    return { workers, worker }
}