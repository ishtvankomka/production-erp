import { db } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";

type DeliveringOrderData = {
    id: string
}

export async function deliveringOrder(data: DeliveringOrderData) {
    const {
        id
    } = data

    let result = null,
        error = null;
    try {
        const docRef = doc(db, "Orders", id);

        const updateData = {
            status: 'delivering'
        }

        result = await updateDoc(docRef, updateData);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

type DeliverOrderData = {
    id: string
}

export async function deliveredOrder(data: DeliverOrderData) {
    const {
        id
    } = data

    let result = null,
        error = null;
    try {
        const docRef = doc(db, "Orders", id);

        const updateData = {
            status: 'delivered'
        }

        result = await updateDoc(docRef, updateData);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
