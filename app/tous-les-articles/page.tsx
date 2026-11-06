import Link from 'next/link'
import { articles } from '@/app/lib/articles'

export default function TousLesArticlesPage() {
  return (
    <div className="min-h-screen text-slate-100 font-sans">
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
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 text-divine-glow">
            Tous les <span className="text-amber-400">Articles</span>
          </h1>
          <p className="text-indigo-200/70 max-w-2xl mx-auto">
            Parcourez l'ensemble des enseignements disponibles sur la plateforme.
          </p>
        </div>

        <div className="glass-card p-8 rounded-3xl">
          <ul className="space-y-4">
            {articles.map(article => (
              <li key={article.id} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                <Link href={`/article/${article.id}`} className="group flex flex-col gap-1">
                  <span className="text-lg font-semibold text-white group-hover:text-amber-300 transition-colors">
                    {article.title || "Sans titre"}
                  </span>
                  <span className="text-sm text-indigo-200/60">
                    {article.theme} • {article.quarter}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}