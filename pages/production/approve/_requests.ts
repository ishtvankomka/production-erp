import { db } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";

type ApproveOrderData = {
    id: string
}

export default async function approveOrder(data: ApproveOrderData) {
    const {
        id
    } = data

    let result = null,
        error = null;
    try {
        const docRef = doc(db, "Orders", id);

        const updateData = {
            status: 'approved_for_production'
        }

        result = await updateDoc(docRef, updateData);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
