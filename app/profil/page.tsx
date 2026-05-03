'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Sidebar from '../../components/Sidebar'

export default function ProfilPage() {
  const router = useRouter()
  const [resident, setResident] = useState<any>(null)
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [telephone, setTelephone] = useState('')
  const [appartement, setAppartement] = useState('')
  const [residence, setResidence] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: res } = await supabase.from('residents').select('*').eq('id', user.id).single()
      setResident(res)
      setNom(res?.nom || '')
      setPrenom(res?.prenom || '')
      setTelephone(res?.telephone || '')
      setAppartement(res?.numero_appartement || '')
      setResidence(res?.residence || '')
    }
    load()
  }, [])

  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('residents').update({ nom, prenom, telephone, numero_appartement: appartement, residence }).eq('id', user?.id)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2000)
  }

  const labelStyle: React.CSSProperties = { display: 'block', fontWeight: 600, fontSize: 13, marginBottom: 6, color: '#374151' }
  const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14, outline: 'none', background: 'white' }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#eaf2fd', color: '#4e5357' }}>
      <Sidebar active="profil" resident={resident} />
      <main style={{ flex: 1, padding: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 28, color: '#29323a' }}>Mon Profil</h1>
        <div style={{ background: 'white', borderRadius: 14, padding: 32, maxWidth: 700, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          {success && <div style={{ background: '#dcfce7', color: '#16a34a', padding: 12, borderRadius: 8, marginBottom: 20, fontWeight: 600 }}>✅ Modifications enregistrées !</div>}
          <div style={{ display: 'flex', gap: 32 }}>
            <div style={{ width: 90, height: 90, borderRadius: '50%', background: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 32, fontWeight: 700, flexShrink: 0 }}>
              {prenom?.[0]}{nom?.[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>Nom</label>
                  <input value={nom} onChange={e => setNom(e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Prénom</label>
                  <input value={prenom} onChange={e => setPrenom(e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Numéro de téléphone</label>
                <input value={telephone} onChange={e => setTelephone(e.target.value)} placeholder="+213 6 xx xx xx xx" style={inputStyle} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Numéro d'appartement</label>
                <input value={appartement} onChange={e => setAppartement(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>Résidence</label>
                <input value={residence} onChange={e => setResidence(e.target.value)} style={inputStyle} />
              </div>
              <button onClick={handleSave} style={{ background: '#1e40af', color: 'white', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                Enregistrer les modifications
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}