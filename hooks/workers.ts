import { db } from "@/firebase/config"
import { UserWorker } from "@/types/User"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"

export const useWorkerByEmail = (email: string) => {
    const [workers, setWorkers] = useState<UserWorker[]>([])
    useEffect(() => {
        getDocs(collection(db, "Workers"))
            .then((querySnapshot) => {
                const workers = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setWorkers(workers as UserWorker[]);
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

    return { worker }
}

export const useWorkers = () => {
    const [workers, setWorkers] = useState<UserWorker[]>([])
    const [loadingWorkers, setLoadingWorkers] = useState(false)

    useEffect(() => {
        setLoadingWorkers(true)
        getDocs(collection(db, "Workers"))
            .then((querySnapshot) => {
                const workers = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setWorkers(workers as UserWorker[]);
                console.log('workers: ', workers);
                setLoadingWorkers(false)
            })

        return () => {
            setWorkers([])
            setLoadingWorkers(false)
        }
    }, [])

    return { workers, loadingWorkers }
}

export const useWorker = (id: string) => {
    const [worker, setWorker] = useState<UserWorker>()
    const [loadingWorker, setLoadingWorker] = useState(false)

    useEffect(() => {
        setLoadingWorker(true)
        const docRef = doc(db, "Workers", id);

        getDoc(docRef)
            .then((querySnapshot) => {
                const workerData = querySnapshot
                const worker = {
                    ...workerData.data(),
                    id: workerData.id
                }
                setWorker(worker as UserWorker);
                console.log('worker: ', worker);
                setLoadingWorker(false)
            })

        return () => {
            setWorker(undefined)
            setLoadingWorker(false)
        }
    }, [])

    return { worker, loadingWorker }
}