import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Order } from '@/types/Order';
import Link from 'next/link'


interface HistoryTableProps {
    orders: Order[]
    loadingOrders: boolean
}

export const HistoryTable: React.FC<HistoryTableProps> = (data) => {
    const {
        orders,
        loadingOrders,
    } = data

    interface DataType extends Order {
        key: number;
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Date created',
            dataIndex: 'date_created',
            key: 'date_created',
            render: (_, record) => (
                <p>{`${new Date(record.date_created).getDate()}/${new Date(record.date_created).getMonth()}/${new Date(record.date_created).getFullYear()}`}</p>
            ),
            sorter: {
                compare: (a, b) => a.date_created - b.date_created
            }
        },
        {
            title: 'Items',
            key: 'items',
            render: (_, record) => (
                <p>{`${record.items.reduce((p, c) => p + c.count, 0)}`}</p>
            ),
            sorter: {
                compare: (a, b) => a.items.reduce((p, c) => p + c.count, 0) - b.items.reduce((p, c) => p + c.count, 0)
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status'
        },
        {
            title: 'Total',
            key: 'total',
            render: (_, record) => (
                <p>{`$${record.items.reduce((p, c) => p + c.count * c.price, 0)}`}</p>
            )
        },
        {
            title: 'Info',
            key: 'info',
            render: (_, record) => (
                <Link href={`/production/history/${record.id}`}>
                    <InfoCircleOutlined />
                </Link>
            )
        },
    ];


    return (
        <Table
            style={{ width: '90%' }}
            loading={loadingOrders}
            columns={columns}
            dataSource={
                orders.map((e, i) => {
                    return {
                        ...e,
                        key: i
                    }
                })
            }
            bordered
            pagination={false}
        />
    )
}