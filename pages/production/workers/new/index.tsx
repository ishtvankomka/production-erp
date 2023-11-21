import { useState } from 'react';
import { Checkbox, Flex, Typography, Input, Button } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useRouter } from 'next/router';
import createNewWorker from './requests';

const { Group } = Checkbox
const { Title, Text } = Typography
const { Password } = Input

export default function Page() {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [secondName, setSecondName] = useState('')
    const [permissions, setPermissions] = useState(
        {
            WarehouseManager: false,
            ProductionManager: false,
            Tester: false,
            DeliveryManager: false,
            SystemAdmin: false
        }
    )

    const permissionOptions = [
        { label: 'Warehouse Manager', value: 'WarehouseManager' },
        { label: 'Production Manager', value: 'ProductionManager' },
        { label: 'Tester', value: 'Tester' },
        { label: 'Delivery Manager', value: 'DeliveryManager' },
        { label: 'System Administrator', value: 'SystemAdmin' }
    ];

    const onChangePermission = (checkedValues: CheckboxValueType[]) => {
        let resultPermission: any = JSON.parse(JSON.stringify(permissions))
        checkedValues.forEach((key, value) => {
            if (value)
                resultPermission[key as string] = true
        })
        setPermissions(resultPermission)
    };

    const handleCreateNewWorker = async () => {
        const data = {
            email,
            password,
            firstName,
            secondName,
            permissions
        }

        const { result, error } = await createNewWorker(data);

        if (error) {
            return console.log(error)
        }

        console.log(result)
        return router.push("/production/workers")
    }


    return (
        <Flex
            vertical
            gap='large'
        >
            <Title level={2}>Create new worker</Title>
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
            <Flex
                gap='small'
                vertical
            >
                <Text>First name</Text>
                <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </Flex>
            <Flex
                gap='small'
                vertical
            >
                <Text>Second name</Text>
                <Input
                    value={secondName}
                    onChange={(e) => setSecondName(e.target.value)}
                />
            </Flex>
            <Flex
                gap='small'
                vertical
            >
                <Text>Permissions</Text>
                <Group options={permissionOptions} onChange={onChangePermission} />
            </Flex>
            <Button
                type='primary'
                onClick={() => { handleCreateNewWorker() }}
                disabled={!(email.length && firstName.length && secondName.length)}
            >
                Create Worker
            </Button>
        </Flex>
    );
}