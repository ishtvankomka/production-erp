"use client"
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

  const { worker, customer } = useAuth()


  return (
    <main>
      <div>
        <h1>Catalogue</h1>
        {
          loadingProducts ?
            <p>loading...</p>
            :
            <div>
              {
                products?.map((product, i) => {
                  return (
                    <div key={i}>
                      <p>{product.name}</p>
                      {
                        !worker &&
                        <button onClick={() => addToCart(product)}>
                          add to cart
                        </button>
                      }
                    </div>
                  )
                })
              }
            </div>
        }
      </div>
    </main>
  )
}
