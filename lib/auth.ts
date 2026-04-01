'use server'
import { cookies } from 'next/headers'

export async function login(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD || '123456';
  if (password === adminPassword) {
    const cookieStore = await cookies();
    cookieStore.set('admin_auth', 'true', { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
    return { success: true }
  }
  return { error: 'Sai mật khẩu' }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_auth')
}

export async function isAuthenticated() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('admin_auth')
  return authCookie?.value === 'true'
}
