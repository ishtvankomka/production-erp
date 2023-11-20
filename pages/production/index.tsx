'use client'
import Link from 'next/link'

export default function Page() {
    return (
        <div>
            <Link href="/production/approve">approve</Link>
            <Link href="/production/produce">produce</Link>
            <Link href="/production/test">test</Link>
            <Link href="/production/deliver">deliver</Link>
        </div>
    );
}