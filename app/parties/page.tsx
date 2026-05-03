'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Sidebar from '../../components/Sidebar'

export default function PartiesPage() {
  const router = useRouter()
  const [resident, setResident] = useState<any>(null)
  const [parties, setParties] = useState<any[]>([])

 const images: any = {
    'Ascenseur': '/ascenseur.jpg',
    'Parking': '/parking.jpg',
    'Jardin': '/jardin.jpg',
    'Local': '/local.jpg',
  }

  const getImage = (nom: string) => {
    const key = Object.keys(images).find(k => nom.includes(k))
    return key ? images[key] : null
  }

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: res } = await supabase.from('residents').select('*').eq('id', user.id).single()
      setResident(res)
      const { data } = await supabase.from('parties_communes').select('*')
      setParties(data || [])
    }
    load()
  }, [])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#eaf2fd' }}>
      <Sidebar active="parties" resident={resident} />
      <main style={{ flex: 1, padding: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 , color: '#29323a' }}>Parties Communes</h1>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28 }}>Consultez les équipements et services de votre copropriété</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {parties.map((p, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              {getImage(p.nom)
                ? <img src={getImage(p.nom)} alt={p.nom} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
                : <div style={{ background: 'linear-gradient(135deg, #1e40af, #3b82f6)', height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>🏢</div>
              }
              <div style={{ padding: 20 }}>
                <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 , color: '#243660' }}>{p.nom}</h3>
                <p style={{ color: '#64748b', fontSize: 13, marginBottom: 12 }}>{p.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ background: p.statut === 'Actif' ? '#dcfce7' : '#fef9c3', color: p.statut === 'Actif' ? '#16a34a' : '#ca8a04', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{p.statut}</span>
                  <button onClick={() => router.push('/nouveau-signalement')} style={{ background: '#1e40af', color: 'white', border: 'none', borderRadius: 8, padding: '8px 14px', fontSize: 13, cursor: 'pointer' }}>Signaler</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}