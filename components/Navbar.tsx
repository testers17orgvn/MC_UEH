/**
 * ============================================================================
 * COMPONENTS/NAVBAR.TSX
 * Component Navbar "sạch" cho toàn bộ trang.
 * - Đã "fix" lại để dùng theme màu của UEH (từ tailwind.config.ts).
 * - Đã thay thế <Button> (shadcn) bằng <button> (HTML) + Tailwind.
 * - Dùng "use client" vì có state (mở/đóng menu, modal).
 * ============================================================================
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User } from "lucide-react"; // Import icon

// Import component LoginModal (dùng đường dẫn tương đối)
import LoginModal from "./LoginModal"; 

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Danh sách link (để dễ quản lý)
  const navLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/thi-sinh", label: "Thí sinh" },
    { href: "/dang-ky", label: "Đăng ký" },
    // { href: "/lich-trinh", label: "Lịch trình" }, // (Sẽ thêm sau)
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Dùng container */}
          <div className="flex justify-between items-center h-16">
            
            {/* 1. Logo (Dẫn về Trang chủ) */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <Image
                src="/images/logo-ueh.png" // (Giả sử bạn có logo UEH trong /public/images/)
                alt="MC UEH Logo"
                width={32}
                height={32}
                className="h-8 w-auto"
                priority
              />
              
            </Link>

            {/* 2. Desktop Menu (Links) */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="font-medium text-gray-600 hover:text-ueh-blue transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* 3. Desktop Login Button */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center justify-center px-4 py-2 border border-ueh-blue text-ueh-blue font-semibold rounded-lg text-sm
                           hover:bg-ueh-blue hover:text-white transition-all duration-200 shadow-card"
              >
                <User size={16} className="mr-2" />
                Đăng nhập
              </button>
            </div>

            {/* 4. Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* 5. Mobile Menu (Dropdown) */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg animate-fadeIn">
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-base font-medium text-gray-700 hover:text-ueh-blue hover:bg-ueh-blue-light rounded-md px-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-200 px-4 py-4">
              <button
                onClick={() => {
                  setIsLoginModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center px-4 py-2 border border-ueh-blue text-ueh-blue font-semibold rounded-lg text-sm
                           hover:bg-ueh-blue hover:text-white transition-all duration-200"
              >
                <User size={16} className="mr-2" />
                Đăng nhập
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* 6. Login Modal (Component riêng) */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />

      {/* 7. Spacer (Để nội dung trang không bị Navbar đè lên) */}
      <div className="h-16" /> 
    </>
  );
}

