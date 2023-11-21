import BodyWrapper from "@/components/BodyWrapper";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <CartProvider>
                <BodyWrapper>
                    <Component {...pageProps} />
                </BodyWrapper>
            </CartProvider>
        </AuthProvider>
    );
}