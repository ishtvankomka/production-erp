import { useProduceOrders } from "@/hooks/orders";
import { ProductionTable } from '@/components/ProductionTable';

export default function Page() {

    const { orders, loadingOrders } = useProduceOrders()

    return (
        <ProductionTable
            orders={orders}
            loadingOrders={loadingOrders}
            path='produce'
        />
    );
}