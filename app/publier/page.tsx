'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/app/lib/client'
import Link from 'next/link'

export default function PublierPage() {
    const router = useRouter()
    const supabase = createClient()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const title = formData.get('title') as string
        const content = formData.get('content') as string
        const theme = formData.get('theme') as string
        const series = formData.get('series') as string
        const quarter = formData.get('quarter') as string

        try {
            // Récupérer l'utilisateur connecté
            const { data: { user } } = await supabase.auth.getUser()

            // Insérer l'article dans Supabase
            const { error } = await supabase.from('articles').insert({
                title,
                content,
                theme,
                series,
                quarter,
                user_id: user?.id,
            })

            if (error) throw error
            setSuccess(true)
            setTimeout(() => router.push('/dashboard'), 2000)
        } catch (err: any) {
            setError(err.message || "Erreur lors de la publication.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-100 p-8">
            <div className="max-w-2xl mx-auto">
                <Link href="/dashboard" className="text-amber-400 hover:text-amber-300 mb-8 inline-block">
                    ← Retour au sanctuaire
                </Link>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl">
                    <h1 className="text-3xl font-serif font-bold text-white mb-6">Publier un article</h1>

                    {success && (
                        <div className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-400/30 text-green-300 text-center">
                            Article publié avec succès ! Redirection...
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-400/30 text-red-300 text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm text-indigo-200 mb-1">Titre</label>
                            <input name="title" required className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400" />
                        </div>
                        <div>
                            <label className="block text-sm text-indigo-200 mb-1">Thème</label>
                            <input name="theme" required className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400" />
                        </div>
                        <div>
                            <label className="block text-sm text-indigo-200 mb-1">Série</label>
                            <input name="series" required className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400" />
                        </div>
                        <div>
                            <label className="block text-sm text-indigo-200 mb-1">Trimestre</label>
                            <input name="quarter" required placeholder="ex: T1 2026" className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400" />
                        </div>
                        <div>
                            <label className="block text-sm text-indigo-200 mb-1">Contenu</label>
                            <textarea name="content" required rows={10} className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400" />
                        </div>
                        <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 rounded-xl disabled:opacity-50">
                            {loading ? 'Publication...' : 'Publier l\'article'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}