import { articles } from '@/app/lib/articles'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
    // Next.js 15+ : on doit attendre les params
    const { id } = await params

    // On cherche l'article correspondant à l'ID
    const article = articles.find(a => a.id === id)

    // Si l'article n'existe pas, on affiche une 404
    if (!article) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-100 p-8">
            <div className="max-w-3xl mx-auto">
                <Link href="/dashboard" className="text-amber-400 hover:text-amber-300 mb-8 inline-block">
                    ← Retour au sanctuaire
                </Link>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl">
                    <span className="text-sm font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full">
                        {article.theme}
                    </span>
                    <h1 className="text-4xl font-serif font-bold text-white mt-6 mb-4 text-divine-glow">
                        {article.title}
                    </h1>
                    <p className="text-indigo-200/60 mb-8 text-sm">
                        Publié le {new Date(article.date).toLocaleDateString('fr-FR')} • {article.quarter}
                    </p>

                    <div className="prose prose-invert prose-amber max-w-none">
                        {/* On affiche le vrai contenu de l'article */}
                        <p className="text-indigo-100/80 leading-relaxed whitespace-pre-wrap">
                            {article.content}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}