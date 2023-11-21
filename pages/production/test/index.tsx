import { useTestOrders } from "@/hooks/orders";
import { ProductionTable } from '@/components/ProductionTable';

export default function Page() {

    const { orders, loadingOrders } = useTestOrders()

    return (
        <ProductionTable
            orders={orders}
            loadingOrders={loadingOrders}
            path='test'
        />
    );
}