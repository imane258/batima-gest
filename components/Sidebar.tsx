'use client'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'

export default function Sidebar({ active, resident }: { active: string, resident: any }) {
  const router = useRouter()

  const links = [
    { key: 'dashboard', label: 'Tableau de bord', icon: '/dashboard.png', path: '/dashboard' },
    { key: 'parties', label: 'Parties communes', icon: '/part.png', path: '/parties' },
    { key: 'signalements', label: 'Mes signalements', icon: '/sign.png', path: '/signalements' },
    { key: 'nouveau-signalement', label: 'Nouveau signalement', icon: '/nv.png', path: '/nouveau-signalement' },
    { key: 'documents', label: 'Mes documents', icon: '/docs.png', path: '/documents' },
    { key: 'profil', label: 'Profil', icon: '/profil.png', path: '/profil' },
    { key: 'notifications', label: 'Mes notifications', icon: '/notif.png', path: '/notifications' },
    { key: 'contact', label: 'Nous contacter', icon: '/contact.png', path: '/contact' },
  ]

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <aside style={{ width: 260, background: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', boxShadow: '2px 0 8px rgba(0,0,0,0.06)', padding: '24px 0' }}>
      <div style={{ padding: '0 24px 24px', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}><img src="/logo.png" style={{ width: 36, height: 36 }} /></div>
          <div>
            <div style={{ fontWeight: 700, color: '#1e40af', fontSize: 16 }}>Batima-Gest</div>
            <div style={{ fontSize: 11, color: '#64748b' }}>Gestion de Copropriété</div>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: '16px 12px' }}>
        {links.map(link => (
          <div
            key={link.key}
            onClick={() => router.push(link.path)}
            style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 8, cursor: 'pointer', marginBottom: 4,
              background: active === link.key ? '#eff6ff' : 'transparent',
              color: active === link.key ? '#1e40af' : '#475569',
              fontWeight: active === link.key ? 600 : 400, fontSize: 14,
            }}
          >
            <span>{link.icon.startsWith('/')
  ? <img src={link.icon} style={{ width: 25, height: 25, objectFit: 'contain' }} />
  : <span>{link.icon}</span>
}</span>
            {link.label}
          </div>
        ))}
      </nav>

      <div style={{ padding: '16px 24px', borderTop: '1px solid #f1f5f9' }}>
        <div style={{ background: '#eff6ff', borderRadius: 10, padding: 14, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1e40af' }}>🎧 Besoin d'aide ?</div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Contactez le syndic</div>
        </div>
        <div onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#64748b', fontSize: 14 }}>
          ⏻ Déconnexion
        </div>
      </div>
    </aside>
  )
}