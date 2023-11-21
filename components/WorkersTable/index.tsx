"use client"
import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { UserWorker } from '@/types/User';
import Link from 'next/link'
import { InfoCircleOutlined } from '@ant-design/icons';


interface WorkersTableProps {
    workers: UserWorker[]
    loadingWorkers: boolean
}

export const WorkersTable: React.FC<WorkersTableProps> = (data) => {
    const {
        workers,
        loadingWorkers
    } = data

    interface DataType extends UserWorker {
        key: number;
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name'
        },
        {
            title: 'Second Name',
            dataIndex: 'second_name',
            key: 'second_name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Info',
            key: 'info',
            render: (_, record) => (
                <Link href={`/production/workers/details/${record.id}`}>
                    <InfoCircleOutlined />
                </Link>
            )
        },
    ];


    return (
        <Table
            columns={columns}
            dataSource={
                workers?.map((e, i) => {
                    return {
                        ...e,
                        key: i
                    }
                })
            }
            bordered
            pagination={false}
            loading={loadingWorkers}
        />
    )
}