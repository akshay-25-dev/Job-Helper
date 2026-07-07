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
            navigate("/")
        } else {
            setError(result.message)
        }
    }

    if (loading) {
        return (
            <main className="min-h-screen w-full flex items-center justify-center">
                <h1 className="text-2xl font-bold text-txt">Loading.......</h1>
            </main>
        )
    }

    return (
        <main className="min-h-screen w-full flex items-center justify-center">
            <div className="min-w-[350px] flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-txt">Register</h1>
                {error && (
                    <p className="text-red-500 text-sm mb-1">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="text-sm text-txt">Username</label>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter username"
                            className="border-none outline-none px-4 py-3 rounded-xl bg-input text-txt placeholder:text-muted"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm text-txt">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter email address"
                            className="border-none outline-none px-4 py-3 rounded-xl bg-input text-txt placeholder:text-muted"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-sm text-txt">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                            className="border-none outline-none px-4 py-3 rounded-xl bg-input text-txt placeholder:text-muted"
                        />
                    </div>

                    <button className="border-none outline-none px-6 py-3 rounded-2xl cursor-pointer transition-all duration-300 ease-in-out bg-accent-btn text-white active:scale-90 hover:opacity-90">
                        Register
                    </button>
                </form>

                <p className="text-sm text-muted">
                    Already have an account?{' '}
                    <Link to="/login" className="text-accent-btn no-underline hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </main>
    )
}

export default Register