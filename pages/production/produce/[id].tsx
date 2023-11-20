import { useOrder } from '@/hooks/orders'
import { useRouter } from 'next/router'
import produceOrder from './requests'

export default function Page() {
    const router = useRouter()
    const { query } = router
    const { id } = query

    const { order, loadingOrder } = useOrder(id as string)

    const handleProduceOrder = async () => {
        const data = {
            id: id as string
        }
        await produceOrder(data).then(() => {
            router.push('/production/produce')
        })
    }

    return (
        <div>
            {
                !loadingOrder && order &&
                <div>
                    <p>order# {order.date_created}</p>
                    {JSON.stringify(order)}
                    <button onClick={() => { handleProduceOrder() }}>
                        Produce
                    </button>
                </div>
            }
        </div>
    );
}