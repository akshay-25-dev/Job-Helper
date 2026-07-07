import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setSubmitting(true)
        const result = await handleLogin({ email, password })
        setSubmitting(false)
        if (result.success) {
            navigate('/')
        } else {
            setError(result.message)
        }
    }

    if (loading) {
        return (
            <main className="min-h-screen w-full flex items-center justify-center bg-page">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-[3px] border-accent/30 border-t-accent rounded-full animate-spin" />
                    <p className="text-muted text-sm">Loading...</p>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-page px-4 py-8">
            <div className="w-full max-w-[460px]">

                {/* Card */}
                <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.4)]">

                    {/* Accent gradient bar */}
                    <div className="h-1 bg-gradient-to-r from-accent via-accent-btn to-accent-alt" />

                    <div className="px-8 py-10 md:px-10 md:py-12">

                        {/* Header */}
                        <div className="text-center mb-9">
                            <div className="w-14 h-14 bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </div>
                            <h1 className="text-[1.7rem] font-bold text-txt tracking-tight">Welcome back</h1>
                            <p className="text-muted text-[0.9rem] mt-1.5">Sign in to your account to continue</p>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="flex items-start gap-3 bg-severity-high/8 border border-severity-high/20 text-[0.85rem] rounded-xl px-4 py-3.5 mb-7">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-severity-high mt-0.5">
                                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                <span className="text-severity-high/90">{error}</span>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-[0.85rem] font-semibold text-txt tracking-wide">Email</label>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    required
                                    className="w-full h-[52px] bg-input border border-border/80 rounded-xl px-4 text-txt text-[0.95rem] placeholder:text-muted/70 outline-none transition-all duration-200 focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,45,120,0.12)]"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="password" className="text-[0.85rem] font-semibold text-txt tracking-wide">Password</label>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    required
                                    className="w-full h-[52px] bg-input border border-border/80 rounded-xl px-4 text-txt text-[0.95rem] placeholder:text-muted/70 outline-none transition-all duration-200 focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,45,120,0.12)]"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full h-[52px] bg-gradient-to-r from-accent to-accent-btn text-white font-semibold text-[0.95rem] rounded-xl cursor-pointer border-none transition-all duration-300 hover:shadow-[0_4px_24px_rgba(255,45,120,0.35)] hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed mt-1 flex items-center justify-center gap-2"
                            >
                                {submitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Signing in...
                                    </>
                                ) : 'Sign In'}
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="mt-8 pt-6 border-t border-border/50 text-center">
                            <p className="text-[0.85rem] text-muted">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-accent font-semibold no-underline hover:underline">
                                    Create one
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Branding */}
                <p className="text-center text-muted/50 text-xs mt-6">Job Helper — AI Interview Prep</p>
            </div>
        </main>
    )
}

export default Login