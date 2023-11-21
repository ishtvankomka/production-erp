"use client"
import { PropsWithChildren } from "react";
import { Flex, Typography } from 'antd';
import Link from 'next/link'
import useAuth from "@/context/AuthContext";
import { useRouter } from 'next/router';
import useCart from "@/context/CartContext";

const { Text } = Typography

export const BodyWrapper = (props: PropsWithChildren) => {
    const { worker, customer } = useAuth()
    const { cartItems } = useCart()
    const router = useRouter()

    return (
        <Flex
            vertical
            gap='large'
            align='center'
        >
            <Flex
                gap='large'
                justify='space-evenly'
                style={{ width: '100%', padding: '20px' }}
            >
                <Link href="/">
                    <Text style={router?.pathname === '/' ? { color: 'blue' } : {}} strong>Catalogue</Text>
                </Link>
                {
                    !worker && customer &&
                    <Link href="/cart">
                        <Text style={router?.pathname === '/cart' ? { color: 'blue' } : {}} strong>Cart{cartItems?.length ? `(${cartItems?.length})` : ''}</Text>
                    </Link>
                }
                {
                    !(worker || customer) &&
                    <>
                        <Link href="/signin">
                            <Text style={router?.pathname === '/signin' ? { color: 'blue' } : {}} strong>Sign in</Text>
                        </Link>
                        <Link href="/signup">
                            <Text style={router?.pathname === '/signup' ? { color: 'blue' } : {}} strong>Sign up</Text>
                        </Link>
                    </>
                }
                {
                    worker &&
                    <Link href="/production">
                        <Text style={router?.pathname?.includes('/production') ? { color: 'blue' } : {}} strong>Production</Text>
                    </Link>
                }
                {
                    (worker || customer) &&
                    <Link href="/signout">
                        <Text style={router?.pathname === '/signout' ? { color: 'blue' } : {}} strong>Sign out</Text>
                    </Link>
                }
            </Flex>
            {
                router?.pathname?.includes('/production') ?
                    <Flex
                        gap='large'
                        style={{ width: '100%' }}
                        justify='flex-start'
                        align='flex-start'
                    >
                        <Flex
                            gap='large'
                            justify='space-evenly'
                            style={{ width: '200px', height: '100%', padding: '20px' }}
                            vertical
                        >
                            <Link href="/production/approve">
                                <Text style={router?.pathname?.includes('/production/approve') ? { color: 'blue' } : {}} strong>Approve</Text>
                            </Link>
                            <Link href="/production/produce">
                                <Text style={router?.pathname?.includes('/production/produce') ? { color: 'blue' } : {}} strong>Produce</Text>
                            </Link>
                            <Link href="/production/test">
                                <Text style={router?.pathname?.includes('/production/test') ? { color: 'blue' } : {}} strong>Test</Text>
                            </Link>
                            <Link href="/production/deliver">
                                <Text style={router?.pathname?.includes('/production/deliver') ? { color: 'blue' } : {}} strong>Deliver</Text>
                            </Link>
                            <Link href="/production/history">
                                <Text style={router?.pathname?.includes('/production/history') ? { color: 'blue' } : {}} strong>History</Text>
                            </Link>
                        </Flex>
                        <Flex
                            style={{ width: '100%', minHeight: '100%' }}
                        >
                            {props.children}
                        </Flex>
                    </Flex>
                    :
                    <Flex
                        style={{ width: '100%', height: '100%' }}
                        justify='center'
                    >
                        {props.children}
                    </Flex>
            }
        </Flex>
    );
};

export default BodyWrapper;