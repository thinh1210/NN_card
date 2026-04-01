'use client'

import { useState } from 'react'
import { login } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await login(password)
    if (res.error) {
      setError(res.error)
    } else {
      router.refresh()
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', fontFamily: 'sans-serif' }}>
      <h2>Đăng nhập Admin</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
        <input
          type="password"
          placeholder="Insert password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
        <button type="submit" style={{ padding: '10px', cursor: 'pointer', background: '#0277bd', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
          Đăng nhập
        </button>
      </form>
    </div>
  )
}
