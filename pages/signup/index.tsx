'use client'
import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import signUp from "@/firebase/auth";
import { Flex, Typography, Input, Button } from 'antd';

const { Password } = Input
const { Title, Text } = Typography

function Page() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSignUp = async () => {
        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error)
        }

        console.log(result)
        return router.push("/")
    }

    return (
        <Flex
            vertical
            gap='large'
            justify="center"
            align="center"
        >
            <Title level={2}>Sign up</Title>
            <Flex
                gap='small'
                vertical
            >
                <Text>Email</Text>
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Flex>
            <Flex
                gap='small'
                vertical
            >
                <Text>Password</Text>
                <Password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Flex>
            <Button
                type='primary'
                onClick={() => { handleSignUp() }}
                disabled={!(email.length && password.length)}
            >
                Sign up
            </Button>
        </Flex>
    );
}

export default Page;