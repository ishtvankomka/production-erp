"use client"
import useCart from '@/context/CartContext'
import createOrder from './requests'
import useAuth from '@/context/AuthContext'
import { useRouter } from 'next/router'
import { Cart } from '@/components/Cart'

export default function Page() {
    //const { products, loadingProducts } = useProducts()
    const { cartItems, setCartItems } = useCart()
    const { customer } = useAuth()
    const router = useRouter()

    const deleteCartItem = (i: number) => {
        setCartItems([...cartItems]?.filter((_, index) => index !== i))
    }

    const setCartItemCount = (i: number, v: number) => {
        setCartItems([...cartItems].map((e, index) => {
            if (i === index) {
                return {
                    ...e,
                    count: v
                }
            }
            return e
        }))
    }

    const handleOrderProducts = async () => {
        const { email } = customer
        const data = {
            items: cartItems,
            email
        }
        await createOrder(data).then(() => {
            router.push('/')
        })
    }

    return (
        <Cart
            cartItems={cartItems}
            deleteCartItem={deleteCartItem}
            setCartItemCount={setCartItemCount}
            handleOrderProducts={handleOrderProducts}
        />
    )
}
