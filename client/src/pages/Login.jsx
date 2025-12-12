"use client"

import { useState } from "react"
import API from "../api"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { Mail, Lock, ArrowRight } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const nav = useNavigate()

  async function submit(e) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await API.post("/auth/login", { email, password })
      localStorage.setItem("token", res.data.token)
      nav("/")
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4">
        <div className="sakeja-container max-w-md w-full">
          <div className="sakeja-card p-8 md:p-10">
            <div className="mb-8">
              <h1 className="font-serif text-3xl font-bold text-neutral-900 mb-2">Welcome Back</h1>
              <p className="text-neutral-600">Sign in to manage your properties</p>
            </div>

            <form onSubmit={submit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-3.5 text-neutral-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="sakeja-input pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-3.5 text-neutral-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="sakeja-input pl-10"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="sakeja-button-primary w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-neutral-600 text-sm">
                First time here?{" "}
                <button className="text-primary hover:text-primary-dark font-medium transition-colors">
                  Create an account
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
