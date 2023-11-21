"use client"
import useCart from '@/context/CartContext'
import createOrder from './requests'
import useAuth from '@/context/AuthContext'
import { useRouter } from 'next/router'
import { Cart } from '@/components/Cart'
import { useState } from 'react'

export default function Page() {
    const { cartItems, setCartItems } = useCart()
    const { customer } = useAuth()
    const router = useRouter()
    const [shippingData, setShippingData] = useState('')

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
        const { email = '', id = '' } = customer!
        const data = {
            items: cartItems,
            email,
            user_id: id,
            shipping_data: shippingData
        }
        await createOrder(data).then(() => {
            setCartItems([])
            router.push('/')
        })
    }

    return (
        <Cart
            cartItems={cartItems}
            deleteCartItem={deleteCartItem}
            setCartItemCount={setCartItemCount}
            shippingData={shippingData}
            setShippingData={setShippingData}
            handleOrderProducts={handleOrderProducts}
        />
    )
}
