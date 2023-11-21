import React from 'react';
import { Catalogue } from '@/components/Catalogue'
import useAuth from '@/context/AuthContext'
import useCart from '@/context/CartContext'
import { useProducts } from '@/hooks/products'
import { Product } from '@/types/Product'

export default function Home() {
  const { products, loadingProducts } = useProducts()
  const { cartItems, setCartItems } = useCart()

  const addToCart = (product: Product) => {
    if (!cartItems.some((e) => e.id === product.id))
      setCartItems([{ ...product, count: 1 }, ...cartItems])
  }

  const { customer, worker } = useAuth()


  return (
    <div>
      <Catalogue
        products={products}
        loadingProducts={loadingProducts}
        addToCart={addToCart}
        customer={customer}
        worker={worker}
      />
    </div>
  )
}
