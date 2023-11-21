"use client"
import React, { useState } from 'react';
import { Flex, Typography, Button, Table, Checkbox, InputNumber } from 'antd';
import { CartItem } from '@/types/CartProduct';
import type { ColumnsType } from 'antd/es/table';
import { Order } from '@/types/Order';

const { Title } = Typography;

interface TestProps {
    order: Order
    loadingOrder: boolean
    defectItems: CartItem[]
    handleTestOrder: () => void
    setDefectItemsCount: (i: number, v: number) => void
    handleReportDefectOrder: () => void
}

export const Test: React.FC<TestProps> = (data) => {
    const {
        order,
        loadingOrder,
        defectItems,
        handleTestOrder,
        setDefectItemsCount,
        handleReportDefectOrder
    } = data

    interface DataType extends CartItem {
        key: number;
    }

    const columnsItems: ColumnsType<DataType> = [
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

    const columnsDefectedItems: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Count',
            dataIndex: 'count',
            key: 'count',
            render: (_, record, index) => (
                <InputNumber min={1} value={record.count} onChange={(e) => { setDefectItemsCount(index, e as number) }} />
            )
        }
    ];

    const [openDefects, setOpenDefects] = useState(false)

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
                    columns={columnsItems}
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
                onClick={() => { handleTestOrder() }}
            >
                Approve Test
            </Button>

            <Checkbox
                onChange={(e) => setOpenDefects(e.target.checked)}
                value={openDefects}
            >
                Report defects
            </Checkbox>
            {
                openDefects &&
                <Flex
                    vertical
                    gap='large'
                >
                    <Table
                        columns={columnsDefectedItems}
                        dataSource={
                            defectItems.map((e, i) => {
                                return {
                                    ...e,
                                    key: i
                                }
                            })
                        }
                        bordered
                        pagination={false}
                    />
                    <Button
                        type='primary'
                        onClick={() => { handleReportDefectOrder() }}
                    >
                        Send defects to production
                    </Button>
                </Flex>
            }
        </Flex>
    )
}