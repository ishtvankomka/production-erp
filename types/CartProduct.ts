import { Product } from "./Product";

type CartExtend = {
    count: number
}

export type CartItem = Product & CartExtend
