'use client'
import React from "react";
import { useRouter } from 'next/navigation'
import signIn from "@/firebase/signin";
import { Flex, Typography, Input, Button } from 'antd';

const { Password } = Input
const { Title, Text } = Typography

function Page() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const router = useRouter()

    const handleSignIn = async () => {
        const { result, error } = await signIn(email, password);

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
            <Title level={2}>Sign in</Title>
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
                onClick={() => { handleSignIn() }}
                disabled={!(email.length && password.length)}
            >
                Sign in
            </Button>
        </Flex>
    );
}

export default Page;