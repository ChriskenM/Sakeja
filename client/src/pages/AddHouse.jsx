"use client"

import { useState } from "react"
import API from "../api"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { Home, MapPin, DollarSign, FileText, ArrowRight, Upload } from "lucide-react"

export default function AddHouse() {
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [rent, setRent] = useState("")
  const [desc, setDesc] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const nav = useNavigate()

  async function submit(e) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await API.post("/houses", {
        title,
        location,
        rent_price: rent,
        description: desc,
      })
      nav("/")
    } catch (err) {
      setError("Failed to add property. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-neutral-50 py-12 px-4">
        <div className="sakeja-container max-w-2xl">
          <div className="sakeja-card p-8 md:p-10">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary-light p-2 rounded-lg">
                  <Home size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="font-serif text-3xl font-bold text-neutral-900">List Your Property</h1>
                  <p className="text-neutral-600 text-sm mt-1">Fill in the details below to showcase your property</p>
                </div>
              </div>
            </div>

            <form onSubmit={submit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">Property Title *</label>
                <div className="relative">
                  <Home size={18} className="absolute left-3 top-3.5 text-neutral-400" />
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Luxury 2BR Apartment Downtown"
                    className="sakeja-input pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">Location *</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-3.5 text-neutral-400" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., 123 Main Street, Downtown"
                    className="sakeja-input pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">Monthly Rent Price *</label>
                <div className="relative">
                  <DollarSign size={18} className="absolute left-3 top-3.5 text-neutral-400" />
                  <input
                    type="number"
                    value={rent}
                    onChange={(e) => setRent(e.target.value)}
                    placeholder="0.00"
                    className="sakeja-input pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">Description *</label>
                <div className="relative">
                  <FileText size={18} className="absolute left-3 top-3.5 text-neutral-400" />
                  <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Describe your property, amenities, and features..."
                    className="sakeja-input pl-10 pt-3 resize-none h-32"
                    required
                  />
                </div>
              </div>

              <div className="bg-primary-light rounded-lg p-4 border-2 border-dashed border-primary">
                <div className="flex items-center gap-3">
                  <Upload size={20} className="text-primary" />
                  <div>
                    <p className="text-sm font-medium text-neutral-900">Image Upload Coming Soon</p>
                    <p className="text-xs text-neutral-600">
                      You'll be able to upload property photos in the next version
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="sakeja-button-primary w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-base"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Publishing...
                  </>
                ) : (
                  <>
                    Publish Property
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 p-4 bg-neutral-100 rounded-lg">
              <p className="text-neutral-700 text-sm">
                <span className="font-medium text-neutral-900">Pro Tip:</span> Accurate descriptions and high-quality
                images get 3x more inquiries. Update your listing anytime from your dashboard.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
