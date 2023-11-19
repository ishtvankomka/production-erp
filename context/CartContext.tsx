"use client"
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { CartItem } from "@/types/CartProduct";


type CartState = {
    cartItems: CartItem[]
    setCartItems: (i: CartItem[]) => void
};

const CartContext = createContext<CartState>({ cartItems: [], setCartItems: () => { } });

const useCart = (): CartState => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("Please use CartContext in parent component");
    }

    return context;
};

export const CartProvider = (props: PropsWithChildren) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    return (
        <CartContext.Provider value={{ cartItems, setCartItems }}>
            {props.children}
        </CartContext.Provider>
    );
};

export default useCart;