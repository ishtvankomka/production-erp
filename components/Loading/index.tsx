import { Flex, Typography } from 'antd';
const { Title } = Typography

export const Loading = () => {
    return (
        <Flex
            vertical
            align='center'
            justify='center'
            style={{ height: '100%', width: '100%' }}
        >
            <Title level={2}>Loading...</Title>
        </Flex>
    );
};