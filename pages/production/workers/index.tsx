import { WorkersTable } from "@/components/WorkersTable";
import { useWorkers } from "@/hooks/workers";
import Link from 'next/link'
import { Flex } from 'antd';

export default function Page() {
    const { workers, loadingWorkers } = useWorkers()

    return (
        <Flex
            vertical
            gap='large'
        >
            <Link href={`/production/workers/new`}>
                Add new
            </Link>
            <WorkersTable
                workers={workers}
                loadingWorkers={loadingWorkers}
            />
        </Flex>
    );
}