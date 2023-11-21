"use client"
import { Product } from '@/types/Product'
import { UserCustomer, UserWorker } from '@/types/User'
import React from 'react';
//import styles from './styles.module.sass'
import { Flex, Typography } from 'antd';
import { Row } from "antd";
import { ProductCard } from './Product';

const { Title, Text } = Typography;

interface CatalogueProps {
    products: Product[]
    loadingProducts: boolean
    addToCart: (product: Product) => void
    customer: UserCustomer | null
    worker: UserWorker | null
}

export const Catalogue: React.FC<CatalogueProps> = (data) => {
    const {
        products,
        loadingProducts,
        addToCart,
        customer,
        worker
    } = data

    return (
        <Flex vertical justify='flex-start' align='center' gap='large'>
            <Title>Catalogue</Title>
            {
                loadingProducts ?
                    <Text strong>Loading...</Text>
                    :
                    <div>
                        <Flex justify="space-evenly" wrap="wrap">
                            {
                                products?.map((product, i) => {
                                    return (
                                        <ProductCard
                                            key={i}
                                            product={product}
                                            customer={customer}
                                            worker={worker}
                                            addToCart={addToCart}
                                        />
                                    )
                                })
                            }
                        </Flex>

                    </div>
            }
        </Flex>
    )
}
