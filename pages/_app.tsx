import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <CartProvider>
                <Component {...pageProps} />
            </CartProvider>
        </AuthProvider>
    );
}