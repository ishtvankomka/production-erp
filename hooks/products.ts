import { db } from "@/firebase/config"
import { Product } from "@/types/Product"
import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loadingProducts, setLoadingProducts] = useState(false)

    useEffect(() => {
        setLoadingProducts(true)
        getDocs(collection(db, "Products"))
            .then((querySnapshot) => {
                const products = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setProducts(products as Product[]);
                console.log('products: ', products);
                setLoadingProducts(false)
            })

        return () => {
            setProducts([])
            setLoadingProducts(false)
        }
    }, [])

    return { products, loadingProducts }
}