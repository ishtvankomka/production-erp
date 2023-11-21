export type UserCustomer = {
    id: string
    email: string
}

export type UserWorkerPermissions = {
    WarehouseManager?: boolean
    ProductionManager?: boolean
    Tester?: boolean
    DeliveryManager?: boolean
    SystemAdmin?: boolean
}

export type UserWorker = {
    id: string
    email: string
    first_name: string
    second_name: string
    permissions: UserWorkerPermissions
}