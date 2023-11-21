import { useOrder } from '@/hooks/orders'
import { useRouter } from 'next/router'
import { Deliver } from '@/components/Deliver'
import deliverRequests from './_requests'

export default function Page() {
    const router = useRouter()
    const { query } = router
    const { id } = query

    const { order, loadingOrder } = useOrder(id as string)

    const handleDeliverOrder = async () => {
        const data = {
            id: id as string
        }
        await deliverRequests.deliveringOrder(data).then(() => {
            router.push('/production/deliver')
        })
    }

    const handleApproveDeliveredOrder = async () => {
        const data = {
            id: id as string
        }
        await deliverRequests.deliveredOrder(data).then(() => {
            router.push('/production/deliver')
        })
    }

    return (
        <>
            {
                order &&
                <Deliver
                    order={order}
                    loadingOrder={loadingOrder}
                    handleDeliverOrder={handleDeliverOrder}
                    handleApproveDeliveredOrder={handleApproveDeliveredOrder}
                />
            }
        </>
    );
}