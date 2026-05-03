'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Sidebar from '../../components/Sidebar'

export default function MesSignalements() {
  const router = useRouter()
  const [resident, setResident] = useState<any>(null)
  const [signalements, setSignalements] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: res } = await supabase.from('residents').select('*').eq('id', user.id).single()
      setResident(res)
      const { data } = await supabase.from('signalements').select('*, parties_communes(nom)').eq('resident_id', user.id).order('created_at', { ascending: false })
      setSignalements(data || [])
    }
    load()
  }, [])

  const getColor = (statut: string) => {
    if (statut === 'En attente') return '#f59e0b'
    if (statut === 'En cours') return '#3b82f6'
    return '#10b981'
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#eaf2fd' }}>
      <Sidebar active="signalements" resident={resident} />
      <main style={{ flex: 1, padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700 , color: '#29323a' }}>Mes Signalements</h1>
            <p style={{ color: '#64748b', fontSize: 14 }}>Historique de tous vos signalements</p>
          </div>
          <button onClick={() => router.push('/nouveau-signalement')} style={{ background: '#1e40af',  fontSize: 15 , color: 'white', border: 'none', borderRadius: 8, padding: '5px 15px', fontWeight: 600, cursor: 'pointer' }}>+ Nouveau</button>
        </div>

        <div style={{ background: 'white', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          {signalements.length === 0 && (
            <div style={{ padding: 48, textAlign: 'center', color: '#94a3b8' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🔧</div>
              <p>Aucun signalement pour l'instant.</p>
            </div>
          )}
          {signalements.map((s, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: i < signalements.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                {s.photo_url
                  ? <img src={s.photo_url} alt="" style={{ width: 56, height: 56, borderRadius: 8, objectFit: 'cover' }} />
                  : <div style={{ width: 56, height: 56, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🔧</div>
                }
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 ,  color: '#243660' }}>{s.parties_communes?.nom} — {s.categorie}</div>
                  <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{s.description}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Signalé le {new Date(s.created_at).toLocaleDateString('fr-FR')}</div>
                </div>
              </div>
              <span style={{ background: getColor(s.statut) + '20', color: getColor(s.statut), padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>{s.statut}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}