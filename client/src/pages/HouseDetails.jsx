"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import API from "../api"
import Navbar from "../components/Navbar"
import { MapPin, DollarSign, Heart, Share2, ChevronLeft, ChevronRight, Phone, Mail } from "lucide-react"

export default function HouseDetails() {
  const { id } = useParams()
  const [house, setHouse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [imageIndex, setImageIndex] = useState(0)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    API.get(`/houses/${id}`)
      .then((res) => setHouse(res.data))
      .catch((err) => {
        console.error("Error fetching house", err)
        setHouse(null)
      })
      .finally(() => setLoading(false))
  }, [id])

  const nextImage = () => {
    if (house?.images) {
      setImageIndex((prev) => (prev + 1) % house.images.length)
    }
  }

  const prevImage = () => {
    if (house?.images) {
      setImageIndex((prev) => (prev - 1 + house.images.length) % house.images.length)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </>
    )
  }

  if (!house) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-bold text-neutral-900 mb-4">Property Not Found</h1>
            <p className="text-neutral-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
            <Link to="/" className="sakeja-button-primary inline-block">
              Back to Listings
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-neutral-50">
        {/* Image Gallery */}
        <div className="relative h-96 md:h-[600px] bg-neutral-200 overflow-hidden">
          {house.images && house.images.length > 0 ? (
            <>
              <img
                src={house.images[imageIndex] || "/placeholder.svg"}
                alt={`${house.title} ${imageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Navigation Arrows */}
              {house.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
                  >
                    <ChevronLeft size={24} className="text-neutral-900" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all z-10"
                  >
                    <ChevronRight size={24} className="text-neutral-900" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/60 px-4 py-2 rounded-full text-white text-sm">
                    {imageIndex + 1} / {house.images.length}
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-3 z-20">
                <button
                  onClick={() => setSaved(!saved)}
                  className="bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all"
                >
                  <Heart size={20} className={saved ? "fill-primary text-primary" : "text-neutral-900"} />
                </button>
                <button className="bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all">
                  <Share2 size={20} className="text-neutral-900" />
                </button>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-neutral-300 text-neutral-600">
              No images available
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="sakeja-section">
          <div className="sakeja-container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h1 className="font-serif text-4xl md:text-5xl font-bold text-neutral-900 mb-4">{house.title}</h1>
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <MapPin size={20} className="text-primary" />
                      <span className="text-neutral-600 text-lg">{house.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign size={20} className="text-primary" />
                      <span className="text-2xl font-bold text-neutral-900">
                        ${house.rent_price}
                        <span className="text-sm text-neutral-600">/month</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="sakeja-card p-8 mb-8">
                  <h2 className="font-serif text-2xl font-bold text-neutral-900 mb-4">About This Property</h2>
                  <p className="text-neutral-700 leading-relaxed text-lg">
                    {house.description || "No description provided for this property."}
                  </p>
                </div>

                {/* Additional Image Grid */}
                {house.images && house.images.length > 1 && (
                  <div className="mb-8">
                    <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-4">Property Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {house.images.map((url, idx) => (
                        <button
                          key={idx}
                          onClick={() => setImageIndex(idx)}
                          className={`relative h-32 md:h-40 rounded-lg overflow-hidden border-2 transition-all ${
                            imageIndex === idx ? "border-primary shadow-lg" : "border-neutral-200 hover:border-primary"
                          }`}
                        >
                          <img
                            src={url || "/placeholder.svg"}
                            alt={`Gallery ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar - Contact Card */}
              <div className="lg:col-span-1">
                <div className="sakeja-card p-8 sticky top-24">
                  <h3 className="font-serif text-2xl font-bold text-neutral-900 mb-6">Interested?</h3>

                  <div className="space-y-4 mb-6">
                    <button className="sakeja-button-primary w-full flex items-center justify-center gap-2">
                      <Phone size={18} />
                      Schedule Viewing
                    </button>
                    <button className="sakeja-button-outline w-full flex items-center justify-center gap-2">
                      <Mail size={18} />
                      Message Owner
                    </button>
                  </div>

                  <div className="border-t border-neutral-200 pt-6">
                    <p className="text-sm text-neutral-600 mb-3 font-medium">PROPERTY DETAILS</p>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Price</span>
                        <span className="font-semibold text-neutral-900">${house.rent_price}/mo</span>
                      </div>
                      <div className="flex justify-between text-sm pb-3 border-b border-neutral-200">
                        <span className="text-neutral-600">Location</span>
                        <span className="font-semibold text-neutral-900">{house.location}</span>
                      </div>
                    </div>
                  </div>

                  <Link to="/" className="mt-6 sakeja-button-secondary w-full block text-center">
                    ← Back to Listings
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
