"use client"
import React from 'react';
import { Flex, Typography, Button, Table } from 'antd';
import { CartItem } from '@/types/CartProduct';
import type { ColumnsType } from 'antd/es/table';
import { Order } from '@/types/Order';

const { Title } = Typography;

interface ApproveProps {
    order: Order
    loadingOrder: boolean
    handleApproveOrder: () => void
}

export const Approve: React.FC<ApproveProps> = (data) => {
    const {
        order,
        loadingOrder,
        handleApproveOrder
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
            <Button
                type='primary'
                onClick={() => { handleApproveOrder() }}
            >
                Approve order for production
            </Button>
        </Flex>
    )
}