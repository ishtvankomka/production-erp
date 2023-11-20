import { db } from "@/firebase/config";
import { CartItem } from "@/types/CartProduct";
import { addDoc, collection } from "firebase/firestore";

type OrderData = {
    items: CartItem[]
    email: string
}

export default async function createOrder(data: OrderData) {
    const {
        items,
        email
    } = data

    let result = null,
        error = null;
    try {
        result = await addDoc(collection(db, "Orders"), {
            date_created: new Date().getTime(),
            items,
            email,
            status: 'created'
        });

    } catch (e) {
        error = e;
    }

    return { result, error };
}
