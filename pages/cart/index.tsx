"use client"
import useCart from '@/context/CartContext'
import createOrder from './requests'
import useAuth from '@/context/AuthContext'
import { MouseEvent } from 'react'

export default function Page() {
    //const { products, loadingProducts } = useProducts()
    const { cartItems, setCartItems } = useCart()
    const { worker, customer } = useAuth()

    const deleteCartItem = (i: number) => {
        setCartItems([...cartItems]?.filter((e, index) => index !== i))
    }

    const inreaseCartItemCount = (i: number) => {
        setCartItems([...cartItems].map((e, index) => {
            if (i === index) {
                const { count } = e
                return {
                    ...e,
                    count: count + 1
                }
            }
            return e
        }))
    }

    const decreaseCartItemCount = (i: number) => {
        const newCartItems = ([...cartItems].map((e, index) => {
            if (i === index) {
                const { count } = e
                return {
                    ...e,
                    count: count - 1
                }
            }
            return e
        }))
        setCartItems(newCartItems.filter((e) => e.count))
    }

    const handleOrderProducts = async (e: MouseEvent) => {
        e.preventDefault()
        const { email } = customer
        const data = {
            items: cartItems,
            email
        }
        await createOrder(data)
    }

    return (
        <main>
            <div>
                <h1>Cart</h1>
                {
                    cartItems.length ?
                        <div>
                            <div>
                                {
                                    cartItems?.map((cartItem, i) => {
                                        return (
                                            <div key={i}>
                                                <p>{cartItem.name} </p>
                                                <div>
                                                    <button onClick={() => decreaseCartItemCount(i)}>
                                                        -
                                                    </button>
                                                    <b>{cartItem.count}</b>
                                                    <button onClick={() => inreaseCartItemCount(i)}>
                                                        +
                                                    </button>
                                                </div>
                                                <button onClick={() => deleteCartItem(i)}>
                                                    delete
                                                </button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div>
                                <button onClick={(e) => handleOrderProducts(e)}>
                                    Order products
                                </button>
                            </div>
                        </div>
                        : null
                }
            </div>
        </main>
    )
}
