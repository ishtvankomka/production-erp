import { useOrder } from '@/hooks/orders'
import { useRouter } from 'next/router'
import approveOrder from './_requests'
import { Approve } from '@/components/Approve'

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
        <>
            {
                order &&
                <Approve
                    order={order}
                    loadingOrder={loadingOrder}
                    handleApproveOrder={handleApproveOrder}
                />
            }
        </>
    );
}