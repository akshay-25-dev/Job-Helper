import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        const result = await handleLogin({ email, password })
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
                    <div className="w-8 h-8 border-3 border-accent border-t-transparent rounded-full animate-spin" />
                    <p className="text-muted text-sm">Loading...</p>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-page px-4">
            <div className="w-full max-w-[440px] bg-card border border-border rounded-2xl p-8 md:p-10 shadow-2xl">

                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="w-12 h-12 bg-accent/15 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-txt mb-1">Welcome back</h1>
                    <p className="text-sm text-muted">Sign in to your account to continue</p>
                </div>

                {/* Error */}
                {error && (
                    <div className="flex items-center gap-2 bg-severity-high/10 border border-severity-high/25 text-severity-high text-sm rounded-xl px-4 py-3 mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                            <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-sm font-medium text-txt">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="you@example.com"
                            required
                            className="w-full bg-input border border-border rounded-xl px-4 py-3.5 text-txt text-[0.95rem] placeholder:text-muted outline-none transition-all duration-200 focus:border-accent focus:ring-1 focus:ring-accent/40"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="password" className="text-sm font-medium text-txt">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                            className="w-full bg-input border border-border rounded-xl px-4 py-3.5 text-txt text-[0.95rem] placeholder:text-muted outline-none transition-all duration-200 focus:border-accent focus:ring-1 focus:ring-accent/40"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-accent to-accent-btn text-white font-semibold text-base py-3.5 rounded-xl cursor-pointer border-none transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-accent/20 active:scale-[0.98] mt-1"
                    >
                        Sign In
                    </button>
                </form>

                {/* Footer */}
                <p className="text-sm text-muted text-center mt-6">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-accent font-medium no-underline hover:underline">
                        Create one
                    </Link>
                </p>
            </div>
        </main>
    )
}

export default Login