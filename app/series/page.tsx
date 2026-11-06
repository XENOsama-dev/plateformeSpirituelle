'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { articles } from '@/app/lib/articles'

export default function SeriesPage() {
    // On regroupe par "series" (le nom du blog d'origine)
    const seriesList = Array.from(new Set(articles.map(a => a.series)))

    const [stars, setStars] = useState<{ id: number, top: string, left: string, size: string, duration: string, delay: string, isGold: boolean }[]>([])

    useEffect(() => {
        const generatedStars = Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() > 0.9 ? '3px' : '1.5px',
            duration: `${Math.random() * 4 + 2}s`,
            delay: `${Math.random() * 4}s`,
            isGold: Math.random() > 0.8
        }))
        setStars(generatedStars)
    }, [])

    return (
        <div className="relative min-h-screen bg-divine-gradient text-slate-100 overflow-hidden font-sans">
            <div className="divine-aura opacity-40"></div>

            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {stars.map(star => (
                    <div key={star.id} className={`star ${star.isGold ? 'star-gold' : ''}`} style={{ top: star.top, left: star.left, width: star.size, height: star.size, animationDuration: star.duration, animationDelay: star.delay }} />
                ))}
            </div>

            <header className="relative z-20 border-b border-white/10 bg-[#0f172a]/60 backdrop-blur-xl sticky top-0">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/dashboard" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center group-hover:bg-amber-500/20 transition-all">
                            <span className="text-amber-400 text-xl">✦</span>
                        </div>
                        <span className="font-serif text-2xl font-bold tracking-wide text-white">Aura & Éther</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-indigo-200">
                        <Link href="/dashboard" className="hover:text-amber-400 transition-colors">Accueil</Link>
                        <Link href="/themes" className="hover:text-amber-400 transition-colors">Thèmes</Link>
                        <Link href="/series" className="text-amber-400 border-b-2 border-amber-400 pb-1">Séries</Link>
                        <Link href="/trimestres" className="hover:text-amber-400 transition-colors">Trimestres</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-sm font-medium text-indigo-200 hover:text-red-400 transition-colors">Déconnexion</Link>
                    </div>
                </div>
            </header>

            <main className="relative z-10 max-w-6xl mx-auto px-6 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 text-divine-glow">
                        Explorer par <span className="text-amber-400">Séries</span>
                    </h1>
                    <p className="text-indigo-200/70 max-w-2xl mx-auto">
                        Retrouvez les enseignements organisés par série d'études.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {seriesList.map(serie => (
                        <div key={serie} className="glass-card p-8 rounded-3xl flex flex-col group">
                            <h2 className="text-2xl font-bold text-white capitalize mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 text-sm">📚</span>
                                {serie.replace(/-/g, ' ')}
                            </h2>
                            <ul className="space-y-3 flex-grow">
                                {articles.filter(a => a.series === serie).slice(0, 4).map(article => (
                                    <li key={article.id}>
                                        <Link href={`/article/${article.id}`} className="text-indigo-200/80 hover:text-amber-300 transition-colors flex items-start gap-2 group/item">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500/50 group-hover/item:bg-amber-400 flex-shrink-0"></span>
                                            <span className="text-sm leading-relaxed">{article.title}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 pt-4 border-t border-white/10">
                                <span className="text-xs font-bold uppercase tracking-wider text-amber-400/70">
                                    {articles.filter(a => a.series === serie).length} articles
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}