"use client"
import React from 'react';
import { Flex, Typography, Button, Table } from 'antd';
import { CartItem } from '@/types/CartProduct';
import type { ColumnsType } from 'antd/es/table';
import { Order } from '@/types/Order';

const { Title } = Typography;

interface ProduceProps {
    order: Order
    loadingOrder: boolean
    handleProduceOrder: () => void
}

export const Produce: React.FC<ProduceProps> = (data) => {
    const {
        order,
        loadingOrder,
        handleProduceOrder
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
            <Title level={2}>Order # {order?.date_created}</Title>
            <Title level={4}>Created {`${new Date(order?.date_created).getDate()}/${new Date(order?.date_created).getMonth()}/${new Date(order?.date_created).getFullYear()}`}</Title>

            {
                order.status === 'approved_for_production' &&
                <Flex vertical>
                    <Title level={5}>Original Items</Title>
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
            }
            {
                order.status === 'found_defects' && order?.defect_items?.length &&
                <Flex vertical>
                    <Title level={5}>Defected Items</Title>
                    <Table
                        columns={columns}
                        dataSource={
                            order?.defect_items.map((e, i) => {
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
            }

            <Button
                type='primary'
                onClick={() => { handleProduceOrder() }}
            >
                Order produced
            </Button>
        </Flex>
    )
}