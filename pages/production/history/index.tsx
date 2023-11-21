import { useDeliveryOrders } from "@/hooks/orders";
import { HistoryTable } from "@/components/HistoryTable";

export default function Page() {

    const { orders, loadingOrders } = useDeliveryOrders()

    return (
        <HistoryTable
            orders={orders}
            loadingOrders={loadingOrders}
        />
    );
}