'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [appartement, setAppartement] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    if (isSignup) {
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
      })
      if (signupError) { setError(signupError.message); setLoading(false); return }
      
      await supabase.from('residents').insert({
        id: data.user?.id,
        nom,
        prenom,
        numero_appartement: appartement,
        residence: 'Résidence Les Oranges, Bâtiment A',
      })
      router.push('/dashboard')
    } else {
      const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })
      if (loginError) { setError('Email ou mot de passe incorrect'); setLoading(false); return }
      router.push('/dashboard')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4f8' }}>
      <div style={{ display: 'flex', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.12)', width: 900, maxWidth: '95vw' }}>
        
        {/* Formulaire gauche */}
        <div style={{ background: 'white', padding: 48, width: 400, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}><img src="/logo.png" style={{ width:40, height: 40 }} /></div>
            <div>
              <div style={{ fontWeight: 700, color: '#1e40af', fontSize: 18 }}>Batima-Gest</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>Gestion de Copropriété Simplifiée</div>
            </div>
          </div>

          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#353453' , marginBottom: 6 }}>
            {isSignup ? 'Créer un compte' : 'Bienvenue !'}
          </h1>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28 }}>
            {isSignup ? 'Inscrivez-vous à votre espace résident' : 'Connectez-vous à votre espace résident'}
          </p>

          {isSignup && (
            <>
              <input
                placeholder="Nom"
                value={nom}
                onChange={e => setNom(e.target.value)}
                style={inputStyle}
              />
              <input
                placeholder="Prénom"
                value={prenom}
                onChange={e => setPrenom(e.target.value)}
                style={inputStyle}
              />
              <input
                placeholder="Numéro d'appartement (ex: A12)"
                value={appartement}
                onChange={e => setAppartement(e.target.value)}
                style={inputStyle}
              />
            </>
          )}

          <input
            placeholder="Votre email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            placeholder="Mot de passe"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={inputStyle}
          />

          {error && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 12 }}>{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ width: '100%', padding: '10px', background: '#1e40af', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 15, cursor: 'pointer', marginBottom: 16 }}
          >
            {loading ? 'Chargement...' : isSignup ? "S'inscrire" : 'Se connecter'}
          </button>

          <p style={{ textAlign: 'center', fontSize: 14, color: '#64748b' }}>
            {isSignup ? 'Déjà inscrit ? ' : 'Pas encore inscrit ? '}
            <span
              onClick={() => setIsSignup(!isSignup)}
              style={{ color: '#1e40af', fontWeight: 600, cursor: 'pointer' }}
            >
              {isSignup ? 'Se connecter' : 'Créer un compte'}
            </span>
          </p>
        </div>

        {/* Panel droit bleu */}
        <div style={{ background: 'linear-gradient(135deg, #1e40af, #3b82f6)', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: 0, color: 'white' }}>
          <div style={{ marginBottom: 0 }}><img src="/page.png" style={{ width: '100%', maxWidth: 600 }} /></div>
         
        </div>

      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '2px 10px',
  border: '1px solid #e2e8f0',
  borderRadius: 6,
  fontSize: 14,
  marginBottom: 14,
  outline: 'none',
  display: 'block',
  color: '#393f47',
}
