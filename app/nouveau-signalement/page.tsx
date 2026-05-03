'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import Sidebar from '../../components/Sidebar'

export default function NouveauSignalementPage() {
  const router = useRouter()
  const [resident, setResident] = useState<any>(null)
  const [parties, setParties] = useState<any[]>([])
  const [categorie, setCategorie] = useState('')
  const [description, setDescription] = useState('')
  const [partieId, setPartieId] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

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

  const handleSubmit = async () => {
    if (!categorie || !description || !partieId) return
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    let photo_url = ''

    if (file) {
      const ext = file.name.split('.').pop()
      const filename = `${user?.id}-${Date.now()}.${ext}`
      const { data: upload } = await supabase.storage.from('signalements-photos').upload(filename, file)
      if (upload) {
        const { data: url } = supabase.storage.from('signalements-photos').getPublicUrl(filename)
        photo_url = url.publicUrl
      }
    }
const { data, error } = await supabase.from('signalements').insert({
  resident_id: user?.id,
  partie_id: partieId,
  categorie,
  description,
  statut: 'En attente',
  photo_url,
})
console.log('data:', data)
console.log('error:', error)

    setLoading(false)
    setSuccess(true)
    setTimeout(() => router.push('/signalements'), 1500)
  }

  const labelStyle: React.CSSProperties = { display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 8, color: '#374151' }
  const inputStyle: React.CSSProperties = { width: '100%', padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14, marginBottom: 20, outline: 'none', background: 'white', display: 'block' }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#eaf2fd' , color: '#4e5357' }}>
      <Sidebar active="nouveau-signalement" resident={resident} />
      <main style={{ flex: 1, padding: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 , color: '#29323a' }}>Nouveau Signalement</h1>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28 }}>Remplissez le formulaire pour signaler un problème</p>

        <div style={{ background: 'white', borderRadius: 14, padding: 32, maxWidth: 680, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          {success && <div style={{ background: '#dcfce7', color: '#16a34a', padding: 14, borderRadius: 8, marginBottom: 20, fontWeight: 600 }}>✅ Signalement envoyé avec succès !</div>}

          <label style={labelStyle}>Catégorie</label>
          <select value={categorie} onChange={e => setCategorie(e.target.value)} style={inputStyle}>
            <option value="">Sélectionner une catégorie</option>
            {['Électricité', 'Plomberie', 'Ascenseur', 'Nettoyage', 'Sécurité', 'Autre'].map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <label style={labelStyle}>Préciser l'emplacement</label>
          <select value={partieId} onChange={e => setPartieId(e.target.value)} style={inputStyle}>
            <option value="">Sélectionner un lieu</option>
            {parties.map(p => <option key={p.id} value={p.id}>{p.nom}</option>)}
          </select>

          <label style={labelStyle}>Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Décrivez le problème rencontré..." style={{ ...inputStyle, height: 120, resize: 'vertical' }} />

          <label style={labelStyle}>Photo du problème</label>
          <div style={{ border: '2px dashed #cbd5e1', borderRadius: 10, padding: 28, textAlign: 'center', marginBottom: 24, background: '#f8fafc' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>☁️</div>
            <p style={{ color: '#64748b', fontSize: 14, marginBottom: 12 }}>Glissez-déposez ou</p>
            <label style={{ background: '#1e40af', color: 'white', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>
              Sélectionner un fichier
              <input type="file" accept="image/*,.pdf" onChange={e => setFile(e.target.files?.[0] || null)} style={{ display: 'none' }} />
            </label>
            {file && <p style={{ marginTop: 10, fontSize: 13, color: '#10b981' }}>✅ {file.name}</p>}
            <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 8 }}>PNG, JPG, PDF jusqu'à 10 Mo</p>
          </div>

          <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', padding: 14, background: '#1e40af', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>
            {loading ? 'Envoi en cours...' : 'Envoyer le signalement'}
          </button>
        </div>
      </main>
    </div>
  )
}
const inputStyle: React.CSSProperties = { 
  width: '100%', 
  padding: '12px 16px', 
  border: '1px solid #e2e8f0', 
  borderRadius: 8, 
  fontSize: 14, 
  marginBottom: 20, 
  outline: 'none', 
  background: 'white', 
  display: 'block',
  color: '#5c5d60'
}