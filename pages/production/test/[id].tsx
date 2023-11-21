import { useOrder } from '@/hooks/orders'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CartItem } from '@/types/CartProduct'
import { Test } from '@/components/Test'
import { foundDefetcsOrder, testOrder } from '@/requests/requests'

export default function Page() {
    const router = useRouter()
    const { query } = router
    const { id } = query

    const { order, loadingOrder } = useOrder(id as string)

    const [defectItems, setDefectItems] = useState<CartItem[]>([])
    useEffect(() => {
        if (order?.items?.length)
            setDefectItems(order.items.map((e) => { return { ...e, count: 0 } }))
    }, [order])

    const handleTestOrder = async () => {
        const data = {
            id: id as string
        }
        await testOrder(data).then(() => {
            router.push('/production/test')
        })
    }

    const setDefectItemsCount = (i: number, v: number) => {
        setDefectItems([...defectItems].map((e, index) => {
            if (i === index) {
                return {
                    ...e,
                    count: v
                }
            }
            return e
        }))
    }

    const handleReportDefectOrder = async () => {
        if (defectItems.length) {
            const validDefectItems = defectItems.filter((e) => e.count)
            if (validDefectItems) {

            }
            const data = {
                defect_items: validDefectItems,
                id: id as string
            }
            await foundDefetcsOrder(data).then(() => {
                router.push('/produce/test')
            })
        }
    }

    return (
        <>
            {
                order &&
                <Test
                    order={order}
                    loadingOrder={loadingOrder}
                    defectItems={defectItems}
                    handleTestOrder={handleTestOrder}
                    setDefectItemsCount={setDefectItemsCount}
                    handleReportDefectOrder={handleReportDefectOrder}
                />
            }
        </>
    );
}