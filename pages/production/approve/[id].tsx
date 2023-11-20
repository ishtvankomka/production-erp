import { useOrder } from '@/hooks/orders'
import { useRouter } from 'next/router'
import approveOrder from './requests'

export default function Page() {
    const router = useRouter()
    const { query } = router
    const { id } = query

    const { order, loadingOrder } = useOrder(id as string)

    const handleApproveOrder = async () => {
        const data = {
            id: id as string
        }
        await approveOrder(data).then(() => {
            router.push('/production/approve')
        })
    }

    return (
        <div>
            {
                !loadingOrder && order &&
                <div>
                    <p>order# {order.date_created}</p>
                    {JSON.stringify(order)}
                    <button onClick={() => { handleApproveOrder() }}>
                        Approve
                    </button>
                </div>
            }
        </div>
    );
}