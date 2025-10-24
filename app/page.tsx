/**
 * ============================================================================
 * APP/PAGE.TSX (Trang chủ)
 * Trang chủ của ứng dụng MC UEH.
 * - Đây là Server Component, gọi API trực tiếp khi build/request.
 * - Đã sửa lỗi: Tên hàm API, Component Button, Màu Tailwind, Type, Path Alias.
 * ============================================================================
 */
import Image from "next/image"; // Sẽ hoạt động trong Next.js
import Link from "next/link";   // Sẽ hoạt động trong Next.js

// Import components "sạch" của chúng ta (dùng đường dẫn tương đối)
import CandidateCard from "../components/CandidateCard"; 

// Import API functions "sạch" của chúng ta (dùng đường dẫn tương đối)
import { getAllCandidates, getAllEvents, getAllSponsors } from "../lib/wordpress"; 
// Import Types "sạch" của chúng ta (dùng đường dẫn tương đối)
import type { Candidate, Event, Sponsor } from "../lib/types"; 

export default async function HomePage() {
  // 1. Gọi API thật trên Server (không còn mockup)
  const allCandidates: Candidate[] = await getAllCandidates(); 
  const allEvents: Event[] = await getAllEvents(); 
  const allSponsors: Sponsor[] = await getAllSponsors(); 

  // Lấy 3 thí sinh đầu (đã được sort theo vote trong hàm API)
  const topCandidates = allCandidates.slice(0, 3);

  return (
    <div className="min-h-screen"> {/* Không cần bg-background vì layout.tsx đã có bg-gray-50 */}
      
      {/* ======================= Hero Section ======================= */}
      <section className="bg-gradient-to-r from-ueh-blue to-ueh-green py-20 text-white shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8"> {/* Dùng container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Cột Trái: Text + Buttons */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight animate-fade-in-up">
                MC UEH 2025
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in-up animation-delay-200">
                Tìm kiếm và vinh danh tài năng MC thế hệ mới của Đại học Kinh tế TP. Hồ Chí Minh.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
                <Link href="/thi-sinh">
                  {/* Button "Xem thí sinh" (Style Primary) */}
                  <button className="w-full sm:w-auto px-8 py-3 bg-white text-ueh-blue font-bold rounded-lg shadow-md 
                                     hover:bg-gray-100 transition duration-300 transform hover:scale-105">
                    Xem Thí sinh
                  </button>
                </Link>
                <Link href="/dang-ky">
                  {/* Button "Đăng ký" (Style Outline) */}
                  <button className="w-full sm:w-auto px-8 py-3 border-2 border-white text-white font-bold rounded-lg 
                                     hover:bg-white/10 transition duration-300">
                    Đăng ký Dự thi
                  </button>
                </Link>
              </div>
            </div>
            {/* Cột Phải: Ảnh (Logo) */}
            <div className="relative h-64 md:h-80 lg:h-96 hidden md:block animate-fade-in-right">
              <Image 
                src="/images/logo-ueh.png" // (Giả sử bạn có logo)
                alt="MC UEH 2025 Banner" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain" // Giữ nguyên tỉ lệ logo
                priority // Ưu tiên tải ảnh này
              />
            </div>
          </div>
        </div>
      </section>

      {/* ======================= Top Candidates ======================= */}
      <section className="py-20 bg-gray-50"> {/* Dùng bg-gray-50 */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-ueh-dark-blue mb-3">
              Thí sinh Nổi bật
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những gương mặt đang nhận được nhiều sự quan tâm và bình chọn nhất.
            </p>
          </div>

          {/* Grid Thí sinh */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {topCandidates.map((candidate: Candidate) => ( // Thêm type
              <CandidateCard 
                key={candidate.id} 
                candidate={candidate} // Truyền cả object candidate
              />
            ))}
          </div>

          {/* Nút Xem tất cả */}
          <div className="text-center">
            <Link href="/thi-sinh">
              <button className="px-8 py-3 bg-ueh-blue hover:bg-ueh-dark-blue text-white font-semibold rounded-lg shadow-md
                                 transition duration-300 transform hover:scale-105">
                Xem Tất cả Thí sinh
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ======================= Schedule Section ======================= */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-ueh-dark-blue mb-3">
              Lịch trình Cuộc thi
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Đừng bỏ lỡ những cột mốc quan trọng và các vòng thi hấp dẫn.
            </p>
          </div>

          {/* Timeline Lịch trình */}
          <div className="max-w-3xl mx-auto space-y-8 relative 
                          before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 
                          before:bg-ueh-blue-light before:-z-10">
            {allEvents.map((event: Event, index: number) => ( // Thêm type
              <div key={event.id} className="relative pl-10">
                {/* Chấm tròn timeline */}
                <div className="absolute left-0 top-1 flex items-center justify-center 
                                w-10 h-10 rounded-full bg-ueh-blue text-white font-bold text-lg shadow-lg">
                  {index + 1}
                </div>
                {/* Nội dung Event */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-card hover:shadow-card-hover transition-shadow">
                  <h3 className="text-xl font-bold text-ueh-dark-blue mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-500 mb-1">
                    📅 {event.date} {event.time && `lúc ${event.time}`}
                  </p>
                  <p className="text-sm text-gray-500 mb-3">
                    📍 {event.location}
                  </p>
                  <p className="text-gray-700">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================= Sponsors Section ======================= */}
      <section className="py-20 bg-gray-100"> {/* Dùng bg-gray-100 */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-ueh-dark-blue mb-3">
              Nhà Tài trợ & Đồng hành
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trân trọng cảm ơn sự đồng hành quý báu từ các đơn vị.
            </p>
          </div>

          {/* Grid Logo */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center">
            {allSponsors.map((sponsor: Sponsor) => ( // Thêm type
              <a 
                key={sponsor.id} 
                href={sponsor.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center p-6 bg-white rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:scale-105"
                title={sponsor.name} // Thêm tooltip
              >
                <Image
                  src={sponsor.logoUrl} // Đã dùng logoUrl từ WP
                  alt={sponsor.name}
                  width={150} // Tăng kích thước logo
                  height={75}
                  className="object-contain h-12 w-auto" // Giới hạn chiều cao
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ======================= CTA Section ======================= */}
      <section className="py-20 bg-ueh-blue text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-bounce">
            Bạn có tố chất MC?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
            Đừng bỏ lỡ cơ hội tỏa sáng! Đăng ký ngay để trở thành thế hệ MC tiếp theo của UEH.
          </p>
          <Link href="/dang-ky">
            <button className="px-10 py-4 bg-white text-ueh-blue font-bold rounded-lg shadow-lg 
                               hover:bg-gray-100 transition duration-300 transform hover:scale-105 text-lg">
              Đăng ký Tham gia
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

