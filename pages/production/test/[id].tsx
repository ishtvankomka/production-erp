import { useOrder } from '@/hooks/orders'
import { useRouter } from 'next/router'
import { foundDefetcsOrder, testOrder } from './requests'
import { useEffect, useState } from 'react'
import { CartItem } from '@/types/CartProduct'

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

    const [openDefects, setOpenDefects] = useState(false)

    const inreaseDefectItemsCount = (i: number) => {
        setDefectItems([...defectItems].map((e, index) => {
            if (i === index) {
                const { count } = e
                return {
                    ...e,
                    count: count + 1
                }
            }
            return e
        }))
    }

    const decreaseDefectItemsCount = (i: number) => {
        setDefectItems([...defectItems].map((e, index) => {
            if (i === index) {
                const { count } = e
                const resultCount = count ? count - 1 : 0
                return {
                    ...e,
                    count: resultCount
                }
            }
            return e
        }))
    }

    const handleReportDefectOrder = async () => {
        if (openDefects && defectItems.length) {
            const validDefectItems = defectItems.filter((e) => e.count)
            if (validDefectItems) {

            }
            const data = {
                defect_items: defectItems,
                id: id as string
            }
            await foundDefetcsOrder(data).then(() => {
                router.push('/')
            })
        }
    }

    return (
        <div>
            {
                !loadingOrder && order &&
                <div>
                    <div>
                        <p>order# {order.date_created}</p>
                        {JSON.stringify(order)}
                        <button onClick={() => { handleTestOrder() }}>
                            Approve Test
                        </button>
                    </div>

                    <div>
                        <button onClick={() => { setOpenDefects(!openDefects) }}>
                            Report defects
                        </button>
                        {
                            openDefects ?
                                <div>
                                    <div>
                                        {
                                            defectItems?.map((defectItem, i) => {
                                                return (
                                                    <div key={i}>
                                                        <p>{defectItem.name} </p>
                                                        <div>
                                                            <button onClick={() => decreaseDefectItemsCount(i)}>
                                                                -
                                                            </button>
                                                            <b>{defectItem.count}</b>
                                                            <button onClick={() => inreaseDefectItemsCount(i)}>
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <button onClick={() => { handleReportDefectOrder() }}>
                                        Send defects to production
                                    </button>
                                </div>
                                : null
                        }
                    </div>
                </div>
            }
        </div>
    );
}