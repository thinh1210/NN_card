import { isAuthenticated } from '@/lib/auth'
import AdminDashboard from './AdminDashboard'
import LoginForm from './LoginForm'
import { getInvites } from '@/lib/actions'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const isAuth = await isAuthenticated()

  if (!isAuth) {
    return <LoginForm />
  }

  const invites = await getInvites()
  return <AdminDashboard initialInvites={invites} />
}
