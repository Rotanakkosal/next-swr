import Link from 'next/link'

export default function Dashboard() {
  return (
    <main>
     <h1>Dashboard Page</h1>

     <Link href='/dashboard/setting'>
          Setting
     </Link>
    </main>
  )
}
