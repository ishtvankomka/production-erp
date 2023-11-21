import firebase_app, { db } from "@/firebase/config";
import { UserWorkerPermissions } from "@/types/User";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const auth = getAuth(firebase_app);

type NewWorkerData = {
    email: string
    password: string
    firstName: string
    secondName: string
    permissions: UserWorkerPermissions
}

export default async function createNewWorker(data: NewWorkerData) {
    const {
        email,
        password,
        firstName,
        secondName,
        permissions
    } = data

    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
        const { user } = result
        const { uid } = user
        if (uid) {
            await addDoc(collection(db, "Workers"), {
                date_created: new Date().getTime(),
                uid,
                email,
                first_name: firstName,
                second_name: secondName,
                permissions
            });
        }
    } catch (e) {
        error = e;
    }

    return { result, error };
}
