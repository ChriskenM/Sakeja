"use client"

import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-neutral-200 sticky top-0 z-50 shadow-sm">
      <div className="sakeja-container flex justify-between items-center py-4">
        <Link to="/" className="font-serif text-3xl font-bold text-primary">
          Sakeja
        </Link>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-neutral-900">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={`${isOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row gap-6 md:gap-8 absolute md:relative top-full left-0 right-0 md:top-auto bg-white md:bg-transparent p-4 md:p-0 border-b md:border-b-0 border-neutral-200 md:border-0 md:items-center`}
        >
          <Link to="/add" className="text-neutral-900 hover:text-primary font-medium transition-colors">
            Add Property
          </Link>
          <Link to="/houses/1" className="text-neutral-900 hover:text-primary font-medium transition-colors">
            View Property
          </Link>
          <Link to="/login" className="sakeja-button-primary">
            Login
          </Link>
        </div>
      </div>
    </nav>
  )
}
