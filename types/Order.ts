import { CartItem } from "./CartProduct"

export type OrderStatus = 'created' | 'approved_for_production' | 'produced' | 'tested' | 'found_defects' | 'delivering' | 'delivered'

export type Order = {
    id: string
    date_created: number
    items: CartItem[]
    email: string
    status: OrderStatus
    shipping_data: string
    
    defect_items?: CartItem[]
}