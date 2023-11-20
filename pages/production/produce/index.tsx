'use client'
import Link from 'next/link'
import { useProduceOrders } from "@/hooks/orders";

export default function Page() {

    const { orders, loadingOrders } = useProduceOrders()

    return (
        <div>
            {
                loadingOrders ?
                    <p>loading...</p>
                    :
                    <div>
                        {
                            orders.map((order, i) => {
                                return <div key={i}>
                                    <p>order# {order.date_created}</p>
                                    <Link href={`/production/produce/${order.id}`}>details</Link>
                                </div>
                            })
                        }
                    </div>
            }
        </div>
    );
}