import { getAuth, signOut } from "firebase/auth";
import firebase_app from "./config";

const auth = getAuth(firebase_app);

export default async function signOutUser() {
    await signOut(auth).then(() => {
        console.log('signed out')
    }).catch((error) => {
        console.error(error)
    });
}