import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: About */}
          <div>
            <h3 className="font-bold text-lg mb-4">Về MC UEH 2025</h3>
            <p className="text-sm text-white/80">
              Cuộc thi tìm kiếm MC xuất sắc nhất của Trường Đại học Kinh tế TP.HCM
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/thi-sinh" className="text-white/80 hover:text-white transition">
                  Danh sách thí sinh
                </Link>
              </li>
              <li>
                <Link href="/dang-ky" className="text-white/80 hover:text-white transition">
                  Đăng ký tham gia
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Email: info@mcueh2025.edu.vn</li>
              <li>Điện thoại: (028) 3930 6060</li>
              <li>Địa chỉ: 59C Nguyễn Đình Chiểu, Q.1, TP.HCM</li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <h3 className="font-bold text-lg mb-4">Theo dõi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition">
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-sm text-white/80">
          <p>&copy; 2025 MC UEH. Bản quyền được bảo vệ.</p>
        </div>
      </div>
    </footer>
  )
}
