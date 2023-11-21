import { useOrder } from '@/hooks/orders'
import { useRouter } from 'next/router'
import { History } from '@/components/History'

export default function Page() {
    const router = useRouter()
    const { query } = router
    const { id } = query

    const { order, loadingOrder } = useOrder(id as string)

    return (
        <>
            {
                order &&
                <History
                    order={order}
                    loadingOrder={loadingOrder}
                />
            }
        </>
    );
}