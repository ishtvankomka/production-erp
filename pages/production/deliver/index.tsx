import { useDeliveryOrders } from "@/hooks/orders";
import { ProductionTable } from '@/components/ProductionTable';

export default function Page() {

    const { orders, loadingOrders } = useDeliveryOrders()

    return (
        <ProductionTable
            orders={orders}
            loadingOrders={loadingOrders}
            path='deliver'
        />
    );
}