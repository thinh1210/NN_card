'use client'

import { useState } from 'react'
import './invite.css'

export default function InviteCard({ guestName }: { guestName: string }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="invite-body">
      <div
        className={`flip-card ${flipped ? 'flipped' : ''}`}
        onClick={() => setFlipped(!flipped)}
      >
        <div className="flip-card-inner">
          {/* Mặt trước */}
          <div className="flip-card-front">
            {/* Hình trang trí 4 góc */}
            <img src="/flipped-image.png" alt="Cá trái" style={{ position: 'absolute', top: '15px', left: '15px', width: '45px', zIndex: 10 }} />
            <img src="/caheophai.png" alt="Cá phải" style={{ position: 'absolute', top: '15px', right: '15px', width: '45px', zIndex: 10 }} />
            <img src="/minion1.png" alt="Minion trái" style={{ position: 'absolute', bottom: '15px', left: '15px', width: '55px', zIndex: 10 }} />
            <img src="/minion2.png" alt="Minion phải" style={{ position: 'absolute', bottom: '15px', right: '15px', width: '55px', zIndex: 10 }} />

            <div className="bow" style={{ marginTop: '10px' }}>🎀</div>
            <p style={{ fontSize: '18px', margin: '4px 0', color: '#1565c0', fontWeight: 600 }}>Thân gửi {guestName},</p>
            <h1 className="main-title" style={{ fontSize: '17px', margin: '4px 0' }}>TRÂN TRỌNG KÍNH MỜI BẠN<br />ĐẾN DỰ LỄ TỐT NGHIỆP CỦA <br /> NHƯ NGỌC</h1>

            <img src="/image copy.png" alt="Cú tốt nghiệp" style={{ width: '70px', margin: '10px 0' }} />

            <div style={{ fontSize: '12.5px', color: '#1565c0', textAlign: 'center', lineHeight: '1.4' }}>
              <p style={{ margin: '3px 0' }}><strong>⏰ 17h00 - 17h30 Thứ Bảy, 04/04/2026</strong></p>
              <p style={{ margin: '3px 0' }}><strong>📍 UEH cơ sở A</strong> - 59C Nguyễn Đình Chiểu,<br />Phường Võ Thị Sáu, Quận 3, TP.HCM</p>
              <p style={{ margin: '3px 0' }}><strong>📞 Liên hệ: 0795444502</strong></p>

              <div style={{ marginTop: '12px', fontSize: '11px', textAlign: 'left', background: 'rgba(255,255,255,0.6)', padding: '8px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <strong>🚗 Bãi đỗ xe Ô tô/Xe máy: (Tùy chọn)</strong>
                <ul style={{ margin: '4px 0 0', paddingLeft: '16px', color: '#0d47a1' }}>
                  <li>Bãi xe trụ sở cơ quan đối diện Hồ Con Rùa</li>
                  <li>Bộ GD&ĐT – 03 Công Trường Quốc Tế</li>
                  <li>Công viên cây xanh – 02 Công Trường Quốc Tế</li>
                  <li>Highlands Coffee – 2Bis Công Trường Quốc Tế</li>
                  <li>Bãi xe Nhà Văn hóa Thanh niên</li>
                </ul>
              </div>
            </div>

            <button
              style={{ marginTop: '15px' }}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setFlipped(!flipped)
              }}
            >
              Xem chi tiết →
            </button>
          </div>

          {/* Mặt sau */}
          <div className="flip-card-back">
            <img src="/image.png" alt="Thiệp mời tốt nghiệp đầy đủ" className="back-image" />
          </div>
        </div>
      </div>
    </div>
  )
}
