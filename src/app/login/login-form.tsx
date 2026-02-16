
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (signInError) {
                setError('Access Denied: Invalid credentials')
                setIsLoading(false)
                return
            }

            router.push('/admin')
            router.refresh()
        } catch (error) {
            setError('An error occurred')
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="text-accent-coral text-sm font-mono bg-accent-coral/10 p-2 rounded border border-accent-coral/20">{error}</div>}
            <div>
                <label className="block text-sm font-medium mb-2 text-slate">Identifier</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all font-mono text-sm"
                    required
                    placeholder="admin@example.com"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-2 text-slate">Passkey</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-blue/50 transition-all font-mono text-sm"
                    required
                    placeholder="••••••••"
                />
            </div>
            <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
            >
                {isLoading ? 'Authenticating...' : 'Access Lab'}
            </Button>
        </form>
    )
}
