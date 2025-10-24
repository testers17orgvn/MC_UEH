"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import LoginModal from "./LoginModal"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MC</span>
              </div>
              <span className="font-bold text-lg text-primary hidden sm:inline">MC UEH 2025</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-foreground hover:text-primary transition">
                Trang chủ
              </Link>
              <Link href="/thi-sinh" className="text-foreground hover:text-primary transition">
                Thí sinh
              </Link>
              <Link href="/dang-ky" className="text-foreground hover:text-primary transition">
                Đăng ký
              </Link>
            </div>

            {/* Desktop Login Button */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setIsLoginOpen(true)}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                Đăng nhập
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden pb-4 border-t border-border">
              <Link
                href="/"
                className="block py-2 text-foreground hover:text-primary transition"
                onClick={() => setIsOpen(false)}
              >
                Trang chủ
              </Link>
              <Link
                href="/thi-sinh"
                className="block py-2 text-foreground hover:text-primary transition"
                onClick={() => setIsOpen(false)}
              >
                Thí sinh
              </Link>
              <Link
                href="/dang-ky"
                className="block py-2 text-foreground hover:text-primary transition"
                onClick={() => setIsOpen(false)}
              >
                Đăng ký
              </Link>
              <Button
                variant="outline"
                onClick={() => {
                  setIsLoginOpen(true)
                  setIsOpen(false)
                }}
                className="w-full mt-4 border-primary text-primary hover:bg-primary hover:text-white"
              >
                Đăng nhập
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  )
}
