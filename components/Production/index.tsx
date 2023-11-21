import { Flex, Typography } from 'antd';

const { Title } = Typography


export const Production = () => {
    return (
        <Flex
            vertical
            gap='large'
            align='center'
            style={{ height: '100%', width: '100%'  }}
        >
            <Flex
                vertical
                gap='large'
                justify="space-between"
                align='center'
                style={{ height: '150px', width: '100%' }}
            >
                <Title level={3}>Navigate to the production process you need</Title>
            </Flex>
        </Flex>
    );
};

export default Production;