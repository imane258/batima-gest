'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Sidebar from '../../components/Sidebar'

export default function DashboardPage() {
  const router = useRouter()
  const [resident, setResident] = useState<any>(null)
  const [signalements, setSignalements] = useState<any[]>([])
  const [parties, setParties] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: res } = await supabase.from('residents').select('*').eq('id', user.id).single()
      setResident(res)
      const { data: sigs } = await supabase.from('signalements').select('*, parties_communes(nom)').eq('resident_id', user.id).order('created_at', { ascending: false }).limit(3)
      setSignalements(sigs || [])
      const { data: parts } = await supabase.from('parties_communes').select('*').limit(4)
      setParties(parts || [])
    }
    load()
  }, [])

  const getColor = (statut: string) => {
    if (statut === 'En attente') return '#f59e0b'
    if (statut === 'En cours') return '#3b82f6'
    return '#10b981'
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background:'#eaf2fd' }}>
      <Sidebar active="dashboard" resident={resident} />
      <main style={{ flex: 1, padding: 32 }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700 , color: '#29323a' }}>Bonjour, {resident?.prenom} 👋</h1>
          <p style={{ color: '#64748b', fontSize: 14 }}>{resident?.residence}</p>
        </div>

       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
  {[
    { label: 'Signalements', sub: 'En cours', value: signalements.filter(s => s.statut === 'En cours').length, color: '#3b82f6', bg: '#eff6ff', icon: '/stat1.png' },
    { label: 'Signalements', sub: 'Résolus', value: signalements.filter(s => s.statut === 'Résolu').length, color: '#10b981', bg: '#f0fdf4', icon: '/stat2.png' },
    { label: 'Parties communes', sub: 'Disponibles', value: parties.filter(p => p.statut === 'Actif').length, color: '#8b5cf6', bg: '#f5f3ff', icon: '/stat3.png' },
    { label: 'Signalements', sub: 'En attente', value: signalements.filter(s => s.statut === 'En attente').length, color: '#f97316', bg: '#fff7ed', icon: '/stat4.png' },
  ].map((stat, i) => (
    <div key={i} style={{ background: 'white', borderRadius: 14, padding: '20px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
         {stat.icon.startsWith('/') 
    ? <img src={stat.icon} style={{ width: 40, height: 40, objectFit: 'contain' }} />
    : stat.icon
  }
      </div>
      <div>
        <div style={{ fontSize: 26, fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>{stat.value}</div>
        <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{stat.label}</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: stat.color, marginTop: 2 }}>{stat.sub}</div>
      </div>
    </div>
  ))}
</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <h2 style={{ fontWeight: 600,fontSize: 20, color: '#243660' }}>Mes signalements récents</h2>
                  <span onClick={() => router.push('/signalements')} style={{ color: '#1e40af', fontSize: 13, cursor: 'pointer', border: '1px solid #e2e8f0', padding: '6px 14px', borderRadius: 20 }}>Voir tous →</span>

            </div>
            {signalements.length === 0 && <p style={{ color: '#777a7f', fontSize: 14 }}>Aucun signalement pour l'instant.</p>}
            {signalements.map((s, i) => (
    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px', borderRadius: 12, border: '1px solid #f1f5f9', marginBottom: 10, cursor: 'pointer' }}>
      {s.photo_url
        ? <img src={s.photo_url} style={{ width: 80, height: 64, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
        : <div style={{ width: 80, height: 64, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>🔧</div>
      }
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a', marginBottom: 4 }}>{s.parties_communes?.nom} — {s.categorie}</div>
        <div style={{ fontSize: 12, color: '#94a3b8' }}>Signalé le {new Date(s.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ background: getColor(s.statut) + '20', color: getColor(s.statut), padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>{s.statut}</span>
        <span style={{ color: '#94a3b8', fontSize: 18 }}>›</span>
      </div>
    </div>
  ))}
</div>

          <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <h2 style={{ fontWeight: 600, fontSize: 20, color: '#243660' }}>Parties communes</h2>
                  <span onClick={() => router.push('/parties')} style={{ color: '#1e40af', fontSize: 13, cursor: 'pointer', border: '1px solid #e2e8f0', padding: '6px 14px', borderRadius: 20 }}>Voir tous →</span>

            </div>
            {parties.map((p, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < parties.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 ,color: '#54585f' }}>{p.nom}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>{p.description}</div>
                </div>
                <span style={{ background: p.statut === 'Actif' ? '#dcfce7' : '#fef9c3', color: p.statut === 'Actif' ? '#16a34a' : '#ca8a04', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{p.statut}</span>
              </div>
            ))}
          </div>
        </div>

       <div style={{ background: 'white', borderRadius: 12, padding: 24, marginTop: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
  <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 16, color: '#243660' }}>Actions rapides</h2>
  <div style={{ display: 'flex', gap: 16 }}>
    {[
      { label: 'Nouveau signalement', sub: 'Signaler un problème', icon: '/st1.png', bg: '#eff6ff', path: '/nouveau-signalement' },
      { label: 'Voir les parties communes', sub: 'Consulter la liste', icon: '/st2.png', bg: '#f0fdf4', path: '/parties' },
      { label: 'Mes documents', sub: 'Accéder à vos fichiers', icon: '/st3.png', bg: '#f5f3ff', path: '/documents' },
    ].map((a, i) => (
      <div key={i} onClick={() => router.push(a.path)} style={{ flex: 1, background: a.bg, borderRadius: 14, padding: 20, cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 140 }}>
        <div style={{ width: 44, height: 44, background: 'white', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 16 }}>
          {a.icon.startsWith('/') 
  ? <img src={a.icon} style={{ width: 40, height: 40, objectFit: 'contain' }} />
  : a.icon
}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#0f172a', marginBottom: 4 }}>{a.label}</div>
          <div style={{ fontSize: 13, color: '#64748b' }}>{a.sub}</div>
        </div>
        <div style={{ textAlign: 'right', color: '#94a3b8', fontSize: 18, marginTop: 8 }}>›</div>
      </div>
    ))}
  </div>
</div>
      </main>
    </div>
  )
}