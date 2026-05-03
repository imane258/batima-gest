'use client'
import Sidebar from '../../components/Sidebar'

export default function Documents() {
  const docs = [
    { nom: 'Règlement intérieur.pdf', type: 'Document général', icon: '📋' },
    { nom: 'Convocation réunion.pdf', type: 'Assemblée générale', icon: '📅' },
    { nom: 'Facture Charges Mars 2024.pdf', type: 'Facture', icon: '💰' },
    { nom: 'Certification Travaux.pdf', type: 'Travaux', icon: '🔨' },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#eaf2fd', color: '#4e5357' }}>
      <Sidebar active="documents" resident={null} />
      <main style={{ flex: 1, padding: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 , color: '#29323a' }}>Mes Documents</h1>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28 }}>Tous vos documents de copropriété</p>

        <div style={{ background: 'white', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          {docs.map((d, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: i < docs.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, background: '#eff6ff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{d.icon}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{d.nom}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>{d.type}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 6, padding: '6px 14px', fontSize: 13, cursor: 'pointer' }}>Visualiser</button>
                <button style={{ background: '#1e40af', color: 'white', border: 'none', borderRadius: 6, padding: '6px 14px', fontSize: 13, cursor: 'pointer' }}>↓ Télécharger</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}