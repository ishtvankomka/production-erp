import { useRouter } from 'next/router'
import { useWorker } from '@/hooks/workers'
import { useEffect, useState } from 'react'
import { CheckboxValueType } from 'antd/es/checkbox/Group'
import { UserWorkerPermissions } from '@/types/User'
import { Button, Checkbox, Flex, Input, Typography } from 'antd'
import saveWorker from './requests'

const { Group } = Checkbox
const { Title, Text } = Typography

export default function Page() {
    const router = useRouter()
    const { query } = router
    const { id } = query

    const { worker, loadingWorker } = useWorker(id as string)

    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [secondName, setSecondName] = useState('')
    const [permissions, setPermissions] = useState<UserWorkerPermissions>(
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

    const [defaultOptions, setDefaultOptions] = useState<string[]>([])
    useEffect(() => {
        console.log('defaultOptions: ', defaultOptions)
    }, [defaultOptions])

    useEffect(() => {
        if (worker && !loadingWorker) {
            const {
                email,
                first_name,
                second_name,
                permissions
            } = worker

            setEmail(email)
            setFirstName(first_name)
            setSecondName(second_name)
            if (permissions)
                setPermissions(permissions)

            let defaultOptions = []
            for (const [key, value] of Object.entries(permissions)) {
                if (value)
                    defaultOptions.push(key)
            }
            console.log(defaultOptions)
            setDefaultOptions(defaultOptions)
        }
    }, [worker, loadingWorker])


    const onChangePermission = (checkedValues: CheckboxValueType[]) => {
        setDefaultOptions(checkedValues as string[])
        let resultPermission: any = JSON.parse(JSON.stringify(permissions))
        checkedValues.forEach((v) => {
            resultPermission[v as string] = true
        })
        setPermissions(resultPermission)
    };


    const handleSaveWorker = async () => {
        const data = {
            id: id as string,
            firstName,
            secondName,
            permissions
        }

        const { result, error } = await saveWorker(data);

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
            <Title level={2}>Change worker</Title>
            <Text>{email}</Text>
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
                <Group options={permissionOptions} value={defaultOptions} onChange={onChangePermission} />
            </Flex>
            <Button
                type='primary'
                onClick={() => { handleSaveWorker() }}
                disabled={!(firstName?.length && secondName?.length)}
            >
                Save Worker
            </Button>
        </Flex>
    );
}