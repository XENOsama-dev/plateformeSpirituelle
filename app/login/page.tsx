'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/app/lib/client'

export default function AuthPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // On crée le client Supabase au moment du clic
    const supabase = createClient()

    try {
      if (isLogin) {
        // Vérification réelle des identifiants
        const { error } = await supabase.auth.signInWithPassword({ 
          email: email.trim(), 
          password 
        })
        if (error) throw error
      } else {
        // Inscription
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { data: { name } },
        })
        if (error) throw error
      }
      
      // Si tout est bon, on redirige
      router.replace('/dashboard')
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Identifiants invalides. Vérifiez votre email et mot de passe.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-[#0f172a] text-slate-100">
      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-indigo-500/20">

        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mb-4 border border-yellow-500/20">
            <span className="text-yellow-400 text-2xl">✦</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Aura & Éther</h1>
          <p className="text-indigo-200/60 text-sm uppercase tracking-widest">Sanctuaire Éditorial</p>
        </div>

        <div className="flex justify-center gap-8 mb-8 border-b border-white/10 pb-2">
          <button 
            onClick={() => { setIsLogin(true); setError(null); }} 
            className={`text-sm font-medium pb-2 ${isLogin ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400'}`}
          >
            Connexion
          </button>
          <button 
            onClick={() => { setIsLogin(false); setError(null); }} 
            className={`text-sm font-medium pb-2 ${!isLogin ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400'}`}
          >
            Inscription
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-400/30 text-red-300 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-medium text-indigo-200 mb-1">Nom de plume</label>
              <input 
                type="text" 
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full bg-white/5 border border-white/20 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400" 
                placeholder="Votre nom" 
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-medium text-indigo-200 mb-1">Adresse de correspondance</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full bg-white/5 border border-white/20 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400" 
              placeholder="votre@email.com" 
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-indigo-200 mb-1">Clé secrète d'accès</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full bg-white/5 border border-white/20 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400" 
              placeholder="••••••••" 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading} 
            className="mt-4 w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-3 rounded-xl disabled:opacity-50"
          >
            {loading ? 'Vérification...' : (isLogin ? 'Pénétrer dans le sanctuaire' : 'Créer mon compte')}
          </button>
        </form>
      </div>
    </div>
  )
}