import { useOrder } from '@/hooks/orders'
import { useRouter } from 'next/router'
import { deliveredOrder, deliveringOrder } from './requests'

export default function Page() {
    const router = useRouter()
    const { query } = router
    const { id } = query

    const { order, loadingOrder } = useOrder(id as string)

    const handleDeliverOrder = async () => {
        const data = {
            id: id as string
        }
        await deliveringOrder(data).then(() => {
            router.push('/production/deliver')
        })
    }

    const handleApproveDeliveredOrder = async () => {
        const data = {
            id: id as string
        }
        await deliveredOrder(data).then(() => {
            router.push('/production/deliver')
        })
    }

    return (
        <div>
            {
                !loadingOrder && order &&
                <div>
                    <p>order# {order.date_created}</p>
                    {JSON.stringify(order)}
                    {
                        order?.status === 'delivering' ?
                            <button onClick={() => { handleApproveDeliveredOrder() }}>
                                Approve Deliver
                            </button>
                            :
                            <button onClick={() => { handleDeliverOrder() }}>
                                Deliver
                            </button>
                    }
                </div>
            }
        </div>
    );
}