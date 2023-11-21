import React from 'react';
import { Flex, Typography, InputNumber, Button, Table } from 'antd';
import { CartItem } from '@/types/CartProduct';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface CartProps {
    cartItems: CartItem[]
    deleteCartItem: (i: number) => void
    setCartItemCount: (i: number, v: number) => void
    handleOrderProducts: () => void
}

export const Cart: React.FC<CartProps> = (data) => {
    const {
        cartItems,
        deleteCartItem,
        setCartItemCount,
        handleOrderProducts
    } = data

    interface DataType extends CartItem {
        key: number;
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (_, record) => (
                <p>{`$${record.price}`}</p>
            )
        },
        {
            title: 'Count',
            dataIndex: 'count',
            key: 'count',
            render: (_, record, index) => (
                <InputNumber min={1} max={1000} value={record.count} onChange={(e) => { setCartItemCount(index, e as number) }} />
            )
        },
        {
            title: 'Total',
            key: 'total',
            render: (_, record) => (
                <p>{`$${record.price * record.count}`}</p>
            )
        },

        {
            title: 'Delete',
            key: 'total',
            render: (_, record, index) => (
                <Button
                    danger
                    ghost
                    type='primary'
                    onClick={() => { deleteCartItem(index) }}
                >
                    <DeleteOutlined />
                </Button>
            )
        },
    ];


    return (
        <Flex vertical justify='flex-start' align='center' gap='large'>
            <Title>Cart items</Title>
            <Table
                columns={columns}
                dataSource={
                    cartItems.map((e, i) => {
                        return {
                            ...e,
                            key: i
                        }
                    })
                }
                bordered
                pagination={false}
            />
            <Title level={4}>Total {cartItems.length ? cartItems.reduce((p, c) => p + c.count, 0) : 0}$</Title>
            <Button
                type='primary'
                onClick={() => { handleOrderProducts() }}
                disabled={!cartItems.length}
            >
                Order products
            </Button>
        </Flex>
    )
}