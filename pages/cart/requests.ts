import { db } from "@/firebase/config";
import { CartItem } from "@/types/CartProduct";
import { addDoc, collection } from "firebase/firestore";

type OrderData = {
    items: CartItem[]
    email: string
    user_id: string
    shipping_data: string
}

export default async function createOrder(data: OrderData) {
    const {
        items,
        email,
        user_id,
        shipping_data
    } = data

    let result = null,
        error = null;
    try {
        result = await addDoc(collection(db, "Orders"), {
            date_created: new Date().getTime(),
            items,
            email,
            user_id,
            status: 'created',
            shipping_data
        });

    } catch (e) {
        error = e;
    }

    return { result, error };
}
