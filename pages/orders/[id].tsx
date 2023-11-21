import { useOrder } from '@/hooks/orders'
import { useRouter } from 'next/router'
import { CustomerOrder } from '@/components/CustomerOrder'

export default function Page() {
    const router = useRouter()
    const { query } = router
    const { id } = query

    const { order, loadingOrder } = useOrder(id as string)

    return (
        <>
            {
                order &&
                <CustomerOrder
                    order={order}
                    loadingOrder={loadingOrder}
                />
            }
        </>
    );
}