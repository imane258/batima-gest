'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '../../components/Sidebar'

export default function ContactPage() {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSend = () => {
    if (!message) return
    setSuccess(true)
    setMessage('')
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#eaf2fd' , color: '#4e5357' }}>
      <Sidebar active="contact" resident={null} />
      <main style={{ flex: 1, padding: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 ,  color: '#29323a' }}>Nous Contacter</h1>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28 }}>
          Si vous avez besoin d'assistance, n'hésitez pas à nous contacter via le formulaire ci-dessous.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={{ background: 'white', borderRadius: 14, padding: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontWeight: 600, fontSize: 16, marginBottom: 20 }}>Coordonnées du Syndic</h2>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 16, background: '#f8fafc', borderRadius: 10 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 22 }}>M</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Marc Dupont</div>
                <div style={{ fontSize: 13, color: '#64748b' }}>Gestionnaire de Copropriété</div>
                <div style={{ fontSize: 13, color: '#64748b', marginTop: 6 }}>📞 +213 23 45 67 89</div>
                <div style={{ fontSize: 13, color: '#64748b' }}>✉️ contact@batima-gest.dz</div>
              </div>
            </div>
            <div style={{ marginTop: 16, padding: 14, background: '#f8fafc', borderRadius: 10 }}>
              <div style={{ fontSize: 13, color: '#64748b' }}>📍 Agence Batima-Gest</div>
              <div style={{ fontSize: 13, color: '#475569', fontWeight: 600, marginTop: 4 }}>Akbou-Algerie</div>
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: 14, padding: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontWeight: 600, fontSize: 16, marginBottom: 20 }}>Envoyez-nous un message</h2>
            {success && <div style={{ background: '#dcfce7', color: '#16a34a', padding: 12, borderRadius: 8, marginBottom: 16, fontWeight: 600 }}>✅ Message envoyé !</div>}

            <label style={labelStyle}>Message</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Décrivez votre problème ou votre demande ici..."
              style={{ width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14, marginBottom: 16, outline: 'none', background: 'white', display: 'block', height: 150, resize: 'vertical' }}
            />

            <button onClick={handleSend} style={{ width: '100%', padding: 13, background: '#1e40af', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>
              Envoyer
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

const labelStyle: React.CSSProperties = { display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 6, color: '#374151' }