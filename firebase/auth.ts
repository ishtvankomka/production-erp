import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import firebase_app, { db } from "./config";
import { addDoc, collection } from "firebase/firestore";

const auth = getAuth(firebase_app);

export default async function signUp(email: string, password: string) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
        const { user } = result
        const { uid } = user
        if (uid) {
            await addDoc(collection(db, "Customers"), {
                date_created: new Date().getTime(),
                uid,
                email 
            });
        }

    } catch (e) {
        error = e;
    }

    return { result, error };
}
