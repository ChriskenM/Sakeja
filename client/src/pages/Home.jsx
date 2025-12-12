"use client"

import { useEffect, useState } from "react"
import API from "../api"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import { Heart, MapPin, ArrowRight } from "lucide-react"

export default function Home() {
  const [houses, setHouses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get("/houses")
      .then((res) => setHouses(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary to-primary-dark py-20 px-4">
          <div className="sakeja-container">
            <div className="max-w-2xl">
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#c4714d] mb-6">Discover Your Dream Home</h1>
              <p className="text-primary-light text-lg md:text-xl mb-8 leading-relaxed">
                Browse premium properties curated just for you. Find the perfect space that matches your lifestyle.
              </p>
              <Link to="/add" className="sakeja-button-secondary hover:scale-105">
                List Your Property
              </Link>
            </div>
          </div>
        </section>

        {/* Properties Section */}
        <section className="sakeja-section">
          <div className="sakeja-container">
            <div className="mb-12">
              <h2 className="font-serif text-4xl font-bold text-neutral-900 mb-3">Featured Properties</h2>
              <p className="text-neutral-600 text-lg">Hand-picked homes from our exclusive collection</p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : houses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {houses.map((h) => (
                  <Link key={h._id} to={`/houses/${h._id}`} className="group">
                    <div className="sakeja-card">
                      {/* Image Container */}
                      <div className="relative h-64 bg-neutral-200 overflow-hidden">
                        {h.images && h.images[0] ? (
                          <img
                            src={h.images[0] || "/placeholder.svg"}
                            alt={h.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-neutral-300 text-neutral-600">
                            No image available
                          </div>
                        )}

                        {/* Save Button */}
                        <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-primary-light transition-colors">
                          <Heart size={20} className="text-primary" />
                        </button>

                        {/* Price Badge */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <p className="text-white text-xl font-bold">${h.rent_price}/mo</p>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6">
                        <h3 className="font-serif text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors">
                          {h.title}
                        </h3>

                        <div className="flex items-center text-neutral-600 mb-4">
                          <MapPin size={18} className="mr-2 text-primary" />
                          <p className="text-sm">{h.location}</p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                          <span className="text-secondary font-medium text-sm">View Details</span>
                          <ArrowRight
                            size={18}
                            className="text-primary group-hover:translate-x-1 transition-transform"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-neutral-600 text-lg mb-6">No properties available yet</p>
                <Link to="/add" className="sakeja-button-primary inline-block">
                  Be the First to List
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-light py-16 px-4">
          <div className="sakeja-container text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
              Ready to List Your Property?
            </h2>
            <p className="text-neutral-700 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of property owners who trust Sakeja to connect them with perfect tenants.
            </p>
            <Link to="/add" className="sakeja-button-primary">
              Add Your Property Today
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
