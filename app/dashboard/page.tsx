'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/app/lib/client'
import { articles } from '@/app/lib/articles'

export default function Dashboard() {
    const router = useRouter()

    const themes = Array.from(new Set(articles.map(a => a.theme)))
    const [stars, setStars] = useState<{ id: number, top: string, left: string, size: string, duration: string, delay: string, isGold: boolean }[]>([])

    useEffect(() => {
        const generatedStars = Array.from({ length: 30 }).map((_, i) => ({
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

    const handleLogout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push('/')
    }

    return (
        <div className="relative min-h-screen bg-divine-gradient text-slate-100 overflow-hidden font-sans">
            <div className="divine-light-ray opacity-30"></div>
            <div className="shooting-star shooting-star-1"></div>
            <div className="shooting-star shooting-star-2"></div>
            <div className="shooting-star shooting-star-3"></div>
            <div className="divine-aura opacity-50"></div>

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
                        <Link href="/series" className="hover:text-amber-400 transition-colors">Séries</Link>
                        <Link href="/trimestres" className="hover:text-amber-400 transition-colors">Trimestres</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLogout}
                            className="text-sm font-medium text-indigo-200 hover:text-red-400 transition-colors hidden sm:block"
                        >
                            Déconnexion
                        </button>
                    </div>
                </div>
            </header>

            <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 text-divine-glow">
                        Bienvenue dans votre <span className="text-amber-400">Sanctuaire</span>
                    </h1>
                    <p className="text-indigo-200/70 max-w-2xl mx-auto">
                        Explorez les mystères et les enseignements à travers nos 10 blogs unifiés.
                    </p>
                </div>

                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-2xl font-serif font-bold text-white whitespace-nowrap">Explorer par Thèmes</h2>
                        <div className="h-px w-full bg-gradient-to-r from-amber-500/50 to-transparent"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {themes.slice(0, 8).map((theme, index) => (
                            <Link href={`/themes`} key={index} className="glass-card p-6 rounded-2xl group">
                                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center mb-4 border border-amber-500/20 group-hover:bg-amber-500/20 transition-all">
                                    <span className="text-amber-400">📖</span>
                                </div>
                                <h3 className="text-lg font-bold text-white capitalize mb-1">{theme}</h3>
                                <p className="text-xs text-amber-400/80 font-medium">
                                    {articles.filter(a => a.theme === theme).length} articles
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>

                <section>
                    <div className="flex justify-between items-end mb-8 border-t border-white/10 pt-10">
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-white mb-2">Dernières Publications</h2>
                            <p className="text-indigo-200/60 text-sm">Les ajouts les plus récents à la plateforme.</p>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {articles.slice(0, 6).map((article) => (
                            <div key={article.id} className="glass-card rounded-2xl p-6 flex flex-col group">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                                        {article.theme}
                                    </span>
                                    <span className="text-xs text-indigo-200/50">{article.quarter}</span>
                                </div>

                                <h3 className="text-xl font-serif font-bold text-white mb-3 leading-tight group-hover:text-amber-100 transition-colors">
                                    {article.title || "Sans titre"}
                                </h3>

                                <p className="text-sm text-indigo-200/60 mb-6 flex-grow leading-relaxed">
                                    {article.excerpt}
                                </p>

                                <Link
                                    href={`/article/${article.id}`}
                                    className="text-sm font-semibold text-amber-400 hover:text-amber-300 inline-flex items-center gap-2 mt-auto transition-colors"
                                >
                                    Lire l'article <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}