import { db } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";

type ProduceOrderData = {
    id: string
}

export default async function produceOrder(data: ProduceOrderData) {
    const {
        id
    } = data

    let result = null,
        error = null;
    try {
        const docRef = doc(db, "Orders", id);

        const updateData = {
            status: 'produced'
        }

        result = await updateDoc(docRef, updateData);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
