import { useOrder } from '@/hooks/orders'
import { useRouter } from 'next/router'
import produceOrder from './_requests'
import { Produce } from '@/components/Produce'

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
        <>
            {
                order &&
                <Produce
                    order={order}
                    loadingOrder={loadingOrder}
                    handleProduceOrder={handleProduceOrder}
                />
            }
        </>
    );
}