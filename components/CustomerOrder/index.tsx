import React from 'react';
import { Flex, Typography, Table } from 'antd';
import { CartItem } from '@/types/CartProduct';
import type { ColumnsType } from 'antd/es/table';
import { Order } from '@/types/Order';

const { Title } = Typography;

interface CustomerOrderProps {
    order: Order
    loadingOrder: boolean
}

export const CustomerOrder: React.FC<CustomerOrderProps> = (data) => {
    const {
        order,
        loadingOrder
    } = data

    interface DataType extends CartItem {
        key: number;
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Count',
            dataIndex: 'count',
            key: 'count'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Total',
            key: 'total',
            render: (_, record) => (
                <p>{`$${record.price * record.count}`}</p>
            )
        }
    ];


    return (
        <Flex
            vertical
            justify='flex-start'
            align='flex-start'
            gap='large'
            style={{ padding: '0px 20px 0px 50px' }}
        >
            <Title level={4}>Created {`${new Date(order?.date_created).getDate()}/${new Date(order?.date_created).getMonth()}/${new Date(order?.date_created).getFullYear()}`}</Title>
            <Title level={5}>Total {`$${order.items.reduce((p, c) => p + c.count * c.price, 0)}`}</Title>
            <Title level={5}>
                {
                    order.status === 'created' ? 'Waiting for approve' :
                        (order.status === 'approved_for_production' || order.status === 'produced' || order.status === 'tested' || order.status === 'found_defects') ? 'Producing' :
                            order.status === 'delivering' ? `Delivering to ${order.shipping_data}` :
                                order.status === 'delivered' ? `Delivered to ${order.shipping_data}` : ''
                }
            </Title>

            <Flex vertical>
                <Title level={5}>Products</Title>
                <Table
                    columns={columns}
                    dataSource={
                        order?.items.map((e, i) => {
                            return {
                                ...e,
                                key: i
                            }
                        })
                    }
                    bordered
                    pagination={false}
                    loading={loadingOrder}
                />
            </Flex>
        </Flex>
    )
}