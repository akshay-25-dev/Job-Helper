import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const { loading, handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        const result = await handleRegister({ username, email, password })
        if (result.success) {
            navigate("/login")
        } else {
            setError(result.message)
        }
    }

    if (loading) {
        return (
            <main className="min-h-screen w-full flex items-center justify-center bg-page">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-3 border-accent border-t-transparent rounded-full animate-spin" />
                    <p className="text-muted text-sm">Creating your account...</p>
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
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-txt mb-1">Create an account</h1>
                    <p className="text-sm text-muted">Get started with your AI interview prep</p>
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
                        <label htmlFor="username" className="text-sm font-medium text-txt">Username</label>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Choose a username"
                            required
                            className="w-full bg-input border border-border rounded-xl px-4 py-3.5 text-txt text-[0.95rem] placeholder:text-muted outline-none transition-all duration-200 focus:border-accent focus:ring-1 focus:ring-accent/40"
                        />
                    </div>
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
                            placeholder="Create a strong password"
                            required
                            className="w-full bg-input border border-border rounded-xl px-4 py-3.5 text-txt text-[0.95rem] placeholder:text-muted outline-none transition-all duration-200 focus:border-accent focus:ring-1 focus:ring-accent/40"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-accent to-accent-btn text-white font-semibold text-base py-3.5 rounded-xl cursor-pointer border-none transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-accent/20 active:scale-[0.98] mt-1"
                    >
                        Create Account
                    </button>
                </form>

                {/* Footer */}
                <p className="text-sm text-muted text-center mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-accent font-medium no-underline hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </main>
    )
}

export default Register