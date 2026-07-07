import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const { loading, handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setSubmitting(true)
        const result = await handleRegister({ username, email, password })
        setSubmitting(false)
        if (result.success) {
            navigate("/login")
        } else {
            setError(result.message)
        }
    }

    if (loading) {
        return (
            <main className="min-h-screen w-full flex items-center justify-center bg-white">
                <div className="w-10 h-10 border-[3px] border-orange-200 border-t-orange-500 rounded-full animate-spin" />
            </main>
        )
    }

    return (
        <main className="min-h-screen w-full bg-white relative overflow-hidden flex items-center justify-center px-4 py-12">

            {/* Decorative circles */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-[400px] flex flex-col items-center relative z-10">

                {/* Heading */}
                <h1 className="text-[2rem] font-bold text-gray-900 tracking-tight text-center mb-10">
                    Create an account
                </h1>

                {/* Error */}
                {error && (
                    <div className="w-full flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-600 text-[0.85rem] rounded-xl px-4 py-3 mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                    <input
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        required
                        className="w-full h-[52px] bg-[#f5f5f5] rounded-xl px-5 text-gray-900 text-[0.95rem] placeholder:text-gray-400 outline-none border border-transparent transition-all duration-200 focus:border-gray-300 focus:bg-white"
                    />
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email address"
                        required
                        className="w-full h-[52px] bg-[#f5f5f5] rounded-xl px-5 text-gray-900 text-[0.95rem] placeholder:text-gray-400 outline-none border border-transparent transition-all duration-200 focus:border-gray-300 focus:bg-white"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        required
                        className="w-full h-[52px] bg-[#f5f5f5] rounded-xl px-5 text-gray-900 text-[0.95rem] placeholder:text-gray-400 outline-none border border-transparent transition-all duration-200 focus:border-gray-300 focus:bg-white"
                    />

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full h-[52px] bg-orange-500 hover:bg-orange-600 text-white font-semibold text-[0.95rem] rounded-full cursor-pointer border-none transition-all duration-300 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(249,115,22,0.3)] hover:shadow-[0_6px_24px_rgba(249,115,22,0.4)]"
                    >
                        {submitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Creating account...
                            </>
                        ) : 'Create an Account'}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-10 flex items-center gap-2 text-[0.9rem] text-gray-400">
                    <span>Already have an account?</span>
                    <Link to="/login" className="flex items-center gap-1.5 text-gray-900 font-medium no-underline hover:text-orange-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" />
                        </svg>
                        Log In
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default Register