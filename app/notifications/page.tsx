'use client'
import { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'

const NOTIFS = [
  { id: 1, message: "Votre signalement 'Problème d'ascenseur' a été résolu.", time: 'Il y a 2 heures' },
  { id: 2, message: 'La dernière facture de charges est disponible pour téléchargement.', time: 'Il y a 1 jour' },
  { id: 3, message: "Rappel : Réunion de l'Assemblée Générale demain à 18h.", time: 'Il y a 2 jours' },
]

export default function NotificationsPage() {
  const [lues, setLues] = useState<number[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('notifs-lues')
    if (saved) setLues(JSON.parse(saved))
  }, [])

  const marquerLu = (id: number) => {
    const newLues = [...lues, id]
    setLues(newLues)
    localStorage.setItem('notifs-lues', JSON.stringify(newLues))
  }

  const toutMarquer = () => {
    const all = NOTIFS.map(n => n.id)
    setLues(all)
    localStorage.setItem('notifs-lues', JSON.stringify(all))
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background:'#eaf2fd' , color: '#4e5357' }}>
      <Sidebar active="notifications" resident={null} />
      <main style={{ flex: 1, padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700 , color: '#29323a'}}>Mes Notifications</h1>
          <button onClick={toutMarquer} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 8, padding: '8px 18px', fontSize: 13, cursor: 'pointer', color: '#475569' }}>
            Tout marquer comme lu
          </button>
        </div>

        <div style={{ background: 'white', borderRadius: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          {NOTIFS.map((n, i) => {
            const lu = lues.includes(n.id)
            return (
              <div key={n.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: i < NOTIFS.length - 1 ? '1px solid #f1f5f9' : 'none', background: lu ? 'white' : '#f8faff' }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 44, height: 44, background: '#eff6ff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🔔</div>
                  <div>
                    <p style={{ fontSize: 14, color: '#1e293b', marginBottom: 4 }}>{n.message}</p>
                    <p style={{ fontSize: 12, color: '#94a3b8' }}>{n.time}</p>
                  </div>
                </div>
                {!lu
                  ? <button onClick={() => marquerLu(n.id)} style={{ background: 'none', border: 'none', color: '#f59e0b', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>🔔 Marquer comme lu</button>
                  : <span style={{ fontSize: 12, color: '#94a3b8' }}>Lu</span>
                }
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}