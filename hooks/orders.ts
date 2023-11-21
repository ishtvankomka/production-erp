import { db } from "@/firebase/config"
import { Order } from "@/types/Order"
import { DocumentData, Query, and, collection, doc, getDoc, getDocs, or, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"


export const useOrder = (id: string) => {
    const [order, setOrder] = useState<Order>()
    const [loadingOrder, setLoadingOrder] = useState(false)

    useEffect(() => {
        setLoadingOrder(true)
        const docRef = doc(db, "Orders", id);

        getDoc(docRef)
            .then((querySnapshot) => {
                const orderData = querySnapshot
                const order = {
                    ...orderData.data(),
                    id: orderData.id
                }
                setOrder(order as Order);
                console.log('order: ', order);
                setLoadingOrder(false)
            })

        return () => {
            setOrder(undefined)
            setLoadingOrder(false)
        }
    }, [])

    return { order, loadingOrder }
}

export const useOrders = (dbquery: Query<DocumentData, DocumentData>) => {
    const [orders, setOrders] = useState<Order[]>([])
    const [loadingOrders, setLoadingOrders] = useState(false)

    useEffect(() => {
        setLoadingOrders(true)
        getDocs(dbquery)
            .then((querySnapshot) => {
                const orders = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setOrders(orders as Order[]);
                console.log('orders: ', orders);
                setLoadingOrders(false)
            })

        return () => {
            setOrders([])
            setLoadingOrders(false)
        }
    }, [])

    return { orders, loadingOrders }
}


export const useApproveOrders = () => {
    const dbquery = query(collection(db, "Orders"), and(where('status', '==', 'created')))
    return useOrders(dbquery)
}

export const useProduceOrders = () => {
    const dbquery = query(collection(db, "Orders"), or(where('status', '==', 'approved_for_production'), where('status', '==', 'found_defects')))
    return useOrders(dbquery)
}

export const useTestOrders = () => {
    const dbquery = query(collection(db, "Orders"), and(where('status', '==', 'produced')))
    return useOrders(dbquery)
}

export const useDeliveryOrders = () => {
    const dbquery = query(collection(db, "Orders"), or(where('status', '==', 'tested'), where('status', '==', 'delivering')))
    return useOrders(dbquery)
}

export const useDeliveredOrders = () => {
    const dbquery = query(collection(db, "Orders"), or(where('status', '==', 'tested'), where('status', '==', 'delivered')))
    return useOrders(dbquery)
}

