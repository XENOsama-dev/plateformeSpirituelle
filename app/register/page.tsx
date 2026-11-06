'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Register() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault()
        if (name && email && password) {
            router.push('/dashboard')
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h1 className="text-2xl font-serif font-bold text-slate-900 mb-6 text-center">Créer un compte</h1>
                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    <input type="text" placeholder="Nom complet" required value={name} onChange={(e) => setName(e.target.value)} className="border p-3 rounded-lg outline-none" />
                    <input type="email" placeholder="E-mail" required value={email} onChange={(e) => setEmail(e.target.value)} className="border p-3 rounded-lg outline-none" />
                    <input type="password" placeholder="Mot de passe" required value={password} onChange={(e) => setPassword(e.target.value)} className="border p-3 rounded-lg outline-none" />
                    <button type="submit" className="bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-700 transition">S'inscrire</button>
                    <p className="text-sm text-center mt-4 text-slate-600">
                        Déjà un compte ? <Link href="/login" className="text-orange-600 font-bold">Se connecter</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}