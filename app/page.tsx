'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function LandingPage() {
  const [stars, setStars] = useState<{ id: number, top: string, left: string, size: string, duration: string, delay: string, isGold: boolean }[]>([])

  useEffect(() => {
    const generatedStars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() > 0.9 ? '3px' : Math.random() > 0.7 ? '2px' : '1.5px',
      duration: `${Math.random() * 4 + 2}s`,
      delay: `${Math.random() * 4}s`,
      isGold: Math.random() > 0.8
    }))
    setStars(generatedStars)
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden bg-divine-gradient text-slate-100">

      <div className="divine-light-ray"></div>
      <div className="shooting-star shooting-star-1"></div>
      <div className="shooting-star shooting-star-2"></div>
      <div className="shooting-star shooting-star-3"></div>
      <div className="divine-aura"></div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {stars.map(star => (
          <div
            key={star.id}
            className={`star ${star.isGold ? 'star-gold' : ''}`}
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDuration: star.duration,
              animationDelay: star.delay
            }}
          />
        ))}
      </div>

      <main className="relative z-10 max-w-5xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-wide text-white mb-6 text-divine-glow leading-tight">
          Découvrez la Parole de Dieu, <br />
          <span className="text-amber-400">Unifiée</span>.
        </h1>
        <p className="text-lg md:text-2xl text-indigo-100/80 mb-14 max-w-3xl mx-auto leading-relaxed font-light">
          Accédez à l'ensemble des enseignements de nos 10 blogs thématiques en une seule plateforme.
          Une publication quotidienne, classée par thèmes et par trimestres, pour nourrir votre foi.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-24">
          <Link href="/login" className="px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg rounded-full hover:from-amber-400 hover:to-orange-400 transition-all shadow-[0_0_40px_rgba(245,158,11,0.3)] hover:shadow-[0_0_60px_rgba(245,158,11,0.6)] transform hover:-translate-y-1">
            Créer un compte gratuit
          </Link>
          <Link href="/login" className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/20 text-white font-bold text-lg rounded-full hover:bg-white/10 hover:border-amber-400/50 transition-all">
            Se connecter
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="glass-card p-8 rounded-3xl">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center mb-6 border border-amber-500/20">
              <span className="text-amber-400 text-3xl">📖</span>
            </div>
            <h3 className="font-bold text-xl text-white mb-3">10 Blogs Unifiés</h3>
            <p className="text-indigo-200/60 text-sm font-light leading-relaxed">Tout le contenu de nos sites rassemblé en un seul endroit pour une étude approfondie.</p>
          </div>
          <div className="glass-card p-8 rounded-3xl">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center mb-6 border border-amber-500/20">
              <span className="text-amber-400 text-3xl">🗓️</span>
            </div>
            <h3 className="font-bold text-xl text-white mb-3">Classement Trimestriel</h3>
            <p className="text-indigo-200/60 text-sm font-light leading-relaxed">Retrouvez facilement les études par thèmes et par trimestres pour suivre votre progression.</p>
          </div>
          <div className="glass-card p-8 rounded-3xl">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center mb-6 border border-amber-500/20">
              <span className="text-amber-400 text-3xl">✨</span>
            </div>
            <h3 className="font-bold text-xl text-white mb-3">Publication Quotidienne</h3>
            <p className="text-indigo-200/60 text-sm font-light leading-relaxed">Ne manquez aucun nouvel article grâce à notre flux mis à jour chaque jour.</p>
          </div>
        </div>
      </main>
    </div>
  )
}