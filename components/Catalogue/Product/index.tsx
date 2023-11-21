import { Product } from '@/types/Product'
import { UserCustomer, UserWorker } from '@/types/User'
import React from 'react';
import { Typography } from 'antd';
import { Col, Card } from "antd";
import { ShoppingCartOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface ProductCardProps {
    product: Product
    customer: UserCustomer | null
    worker: UserWorker | null
    addToCart: (product: Product) => void
}

export const ProductCard: React.FC<ProductCardProps> = (data) => {
    const {
        product,
        customer,
        worker,
        addToCart
    } = data

    return (
        <Card
            title={product?.name}
            actions={(customer && !worker) ? [<ShoppingCartOutlined onClick={() => { addToCart(product) }} />] : []}
            style={{ width: '300px', margin: '50px' }}
        >
            <img
                style={{ width: '250px', height: '250px', objectFit: 'cover' }}
                alt=""
                src={product?.image}
            />
            <Text>{product?.price ? `$${product.price}` : ''}</Text>
        </Card>
    )
}
