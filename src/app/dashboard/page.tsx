import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { SignoutButton } from './components/signout-button'

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/auth')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-1">
      <h1 className="text-sm">{session.user.name}</h1>
      <SignoutButton />
    </div>
  )
}
