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
        <Col span={10}>
            <Card
                title={product?.name}
                actions={(customer && !worker) ? [<ShoppingCartOutlined onClick={() => { addToCart(product) }} />] : []}
                cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                }
            >
                <Text>{product?.price ? `$${product.price}` : ''}</Text>
            </Card>
        </Col>
    )
}
