import { db } from "@/firebase/config";
import { UserWorkerPermissions } from "@/types/User";
import { doc, updateDoc } from "firebase/firestore";

type SaveWorkerData = {
    id: string
    firstName: string
    secondName: string
    permissions: UserWorkerPermissions
}

export default async function saveWorker(data: SaveWorkerData) {
    const {
        id,
        firstName,
        secondName,
        permissions
    } = data

    let result = null,
        error = null;
    try {
        const docRef = doc(db, "Workers", id);

        const updateData = {
            first_name: firstName,
            second_name: secondName,
            permissions
        }

        result = await updateDoc(docRef, updateData);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
