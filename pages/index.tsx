"use client"
import useAuth from '@/context/AuthContext'

export default function Home() {

  const { worker, customer } = useAuth()!

  return (
    <main>
      <div>
        <h1>Home page</h1>
      </div>
    </main>
  )
}
