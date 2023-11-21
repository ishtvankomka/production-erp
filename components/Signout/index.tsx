"use client"
import { useRouter } from 'next/router';
import { Button, Flex, Typography } from 'antd';

const { Title } = Typography


interface SignOutProps {
    handleSignOut: () => void
}

export const SignOut: React.FC<SignOutProps> = (data) => {
    const router = useRouter()

    const { handleSignOut } = data

    const handleClickYes = () => {
        handleSignOut()
    }

    const handleClickNo = () => {
        return router.push("/")
    }

    return (
        <Flex
            vertical
            gap='large'
            align='center'
            style={{ height: '100%' }}
        >
            <Flex
                vertical
                gap='large'
                justify="space-between"
                align='center'
                style={{ height: '150px' }}
            >
                <Title>Are you sure you want to sign out?</Title>
                <Flex
                    gap='large'
                    justify="space-between"
                    style={{ width: '200px' }}
                >
                    <Button
                        type='primary'
                        onClick={handleClickYes}
                        danger
                    >
                        Yes
                    </Button>
                    <Button
                        type='primary'
                        onClick={handleClickNo}
                    >
                        No
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default SignOut;