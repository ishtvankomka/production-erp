'use client'
import Link from 'next/link'
import { useApproveOrders } from "@/hooks/orders";

export default function Page() {

    const { orders, loadingOrders } = useApproveOrders()

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
                                    <Link href={`/production/approve/${order.id}`}>details</Link>
                                </div>
                            })
                        }
                    </div>
            }
        </div>
    );
}