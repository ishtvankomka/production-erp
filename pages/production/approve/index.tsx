import { useApproveOrders } from "@/hooks/orders";
import { ProductionTable } from '@/components/ProductionTable';

export default function Page() {

    const { orders, loadingOrders } = useApproveOrders()

    return (
        <ProductionTable
            orders={orders}
            loadingOrders={loadingOrders}
            path='approve'
        />
    );
}