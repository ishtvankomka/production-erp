import { useClientOrders } from "@/hooks/orders";
import useAuth from "@/context/AuthContext";
import { CustomerOrdersTable } from "@/components/CustomerOrdersTable";

export default function Page() {

    const { customer } = useAuth()
    const { orders, loadingOrders } = useClientOrders(customer?.id || '', customer?.email || '',)

    return (
        <CustomerOrdersTable
            orders={orders}
            loadingOrders={loadingOrders}
        />
    );
}