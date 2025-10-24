/**
 * ============================================================================
 * APP/(CAC-TRANG)/THI-SINH/PAGE.TSX (Trang Danh sách Thí sinh)
 * Trang hiển thị danh sách tất cả thí sinh.
 * - Đây là Server Component, gọi API trực tiếp khi build/request.
 * - Đã sửa lỗi tên hàm import và quay lại dùng path alias.
 * - **Đã quay lại sử dụng alias `@/` theo cấu hình tsconfig.json.**
 * ============================================================================
 */
import Link from "next/link"; // Dùng Link của Next.js
import { Search } from 'lucide-react'; // Import icon Search

// Import component (dùng path alias)
import CandidateCard from "@/components/CandidateCard"; // <-- Dùng lại @/
// Import API function (dùng path alias)
import { getAllCandidates } from "@/lib/wordpress"; // <-- Dùng lại @/
// Import Type (dùng path alias)
import type { Candidate } from "@/lib/types"; // <-- Dùng lại @/

export default async function CandidateListPage() {

  // 1. Gọi API thật trên Server
  const allCandidates: Candidate[] = await getAllCandidates();

  return (
    <div className="py-16 md:py-24 bg-gray-50 min-h-screen"> {/* Thêm padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* === Header === */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-ueh-dark-blue mb-4">
            Gương mặt Thí sinh MC UEH 2025
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá và bình chọn cho những tài năng MC triển vọng của UEH.
          </p>
        </div>

        {/* === Thanh Tìm kiếm & Sắp xếp (Placeholder) === */}
        <div className="mb-10 md:mb-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Ô Tìm kiếm */}
          <div className="relative w-full sm:max-w-xs">
            <input
              type="search"
              placeholder="Tìm theo tên hoặc SBD..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-ueh-blue focus:ring-1 focus:ring-ueh-blue shadow-sm text-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          {/* Dropdown Sắp xếp */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort-by" className="text-sm font-medium text-gray-700">Sắp xếp:</label>
            <select
              id="sort-by"
              // TODO: Thêm state và logic sort nếu cần Client Component
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-1 focus:ring-ueh-blue focus:border-ueh-blue"
            >
              <option value="votes">Bình chọn (Cao nhất)</option>
              <option value="name">Tên (A-Z)</option>
              <option value="sbd">SBD (Thấp nhất)</option>
            </select>
          </div>
        </div>

        {/* === Lưới Thí sinh === */}
        {allCandidates && allCandidates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {allCandidates.map((candidate: Candidate) => ( // Thêm type
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
              />
            ))}
          </div>
        ) : (
          // Trường hợp không có thí sinh
          <div className="text-center py-16">
            <p className="text-lg text-gray-500">Chưa có thí sinh nào được cập nhật.</p>
            {/* Có thể thêm hình ảnh placeholder */}
          </div>
        )}

        {/* === Phân trang (Placeholder) === */}
        <div className="mt-12 md:mt-16 flex justify-center">
          <nav aria-label="Pagination">
            <ul className="flex items-center gap-2">
              <li><button className="px-3 py-1 rounded border bg-white text-gray-500 text-sm hover:bg-gray-100 disabled:opacity-50" disabled>Trước</button></li>
              <li><button className="px-3 py-1 rounded border bg-ueh-blue text-white text-sm font-medium">1</button></li>
              <li><button className="px-3 py-1 rounded border bg-white text-gray-700 text-sm hover:bg-gray-100">2</button></li>
              <li><button className="px-3 py-1 rounded border bg-white text-gray-700 text-sm hover:bg-gray-100">3</button></li>
              <li><button className="px-3 py-1 rounded border bg-white text-gray-700 text-sm hover:bg-gray-100">Sau</button></li>
            </ul>
          </nav>
        </div>

      </div>
    </div>
  );
}

