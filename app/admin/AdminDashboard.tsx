'use client'

import { useState, useEffect } from 'react'
import { createInvite, deleteInvite } from '@/lib/actions'
import { logout } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export default function AdminDashboard({ initialInvites }: { initialInvites: any[] }) {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [origin, setOrigin] = useState('')
  const router = useRouter()

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await createInvite(name)
    setLoading(false)
    if (res?.error) {
      alert(res.error)
    } else {
      setName('')
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc muốn xoá?')) {
      const res = await deleteInvite(id)
      if (res?.error) {
        alert(res.error)
      }
    }
  }

  const handleCopy = (slug: string) => {
    navigator.clipboard.writeText(`${origin}/invite/${slug}`)
    alert('Đã copy link!')
  }

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Quản lý thư mời</h2>
        <button
          onClick={async () => { await logout(); router.refresh() }}
          style={{ padding: '8px 16px', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '4px', background: '#fff' }}
        >
          Đăng xuất
        </button>
      </div>

      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 15px 0' }}>Tạo mới</h3>
        <form onSubmit={handleCreate} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Tên khách mời (VD: Ngọc)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
          <button type="submit" disabled={loading} style={{ padding: '10px 20px', cursor: 'pointer', background: '#0277bd', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
            {loading ? 'Đang tạo...' : 'Tạo link'}
          </button>
        </form>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <thead>
          <tr style={{ background: '#0277bd', color: 'white', textAlign: 'left' }}>
            <th style={{ padding: '12px 15px' }}>Khách mời</th>
            <th style={{ padding: '12px 15px' }}>Link</th>
            <th style={{ padding: '12px 15px', width: '150px' }}>Hành động</th>
          </tr>
        </thead>
        <tbody style={{ background: '#fff' }}>
          {initialInvites.map((invite) => (
            <tr key={invite.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px 15px' }}>{invite.guest_name}</td>
              <td style={{ padding: '12px 15px' }}>
                <a href={`${origin}/invite/${invite.slug}`} target="_blank" rel="noopener noreferrer" style={{ color: '#0277bd', textDecoration: 'none' }}>
                  {origin}/invite/{invite.slug}
                </a>
              </td>
              <td style={{ padding: '12px 15px', display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleCopy(invite.slug)}
                  style={{ cursor: 'pointer', padding: '6px 12px', background: '#e0f2f1', border: '1px solid #b2dfdb', borderRadius: '4px', color: '#00695c' }}
                >
                  Copy
                </button>
                <button
                  onClick={() => handleDelete(invite.id)}
                  style={{ cursor: 'pointer', padding: '6px 12px', background: '#ffebee', border: '1px solid #ffcdd2', borderRadius: '4px', color: '#c62828' }}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
          {initialInvites.length === 0 && (
            <tr>
              <td colSpan={3} style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                Chưa có thư mời nào. Hãy tạo mới ở biểu mẫu phía trên!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
