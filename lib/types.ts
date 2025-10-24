/**
 * ============================================================================
 * LIB/TYPES.TS
 * Đây là "hợp đồng dữ liệu", định nghĩa cấu trúc dữ liệu cho toàn bộ app.
 * Bao gồm cả kiểu dữ liệu "sạch" (Clean Types) mà frontend sử dụng
 * và kiểu dữ liệu "thô" (Raw WP Types) mà API GraphQL trả về.
 * - Đã thêm các trường chi tiết cho Candidate (queQuan, chieuCao...)
 * - Đã cập nhật WpCandidateFields để khớp với tên trường 'vote' từ GraphQL.
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// CLEAN TYPES (Dành cho Frontend Components)
// ----------------------------------------------------------------------------

export interface Candidate {
  id: string;             // GraphQL ID (dùng làm key)
  databaseId: number;     // WordPress Post ID (dùng nếu cần)
  name: string;           // Tiêu đề (title) từ WP
  slug: string;           // Đường dẫn (slug) từ WP
  bio: string | null;     // Nội dung bài viết (content) từ WP, có thể là null
  image: string;          // URL ảnh đại diện (featuredImage), có fallback
  sbd: string;            // Số báo danh (từ ACF)
  votes: number;          // Số lượt vote (từ ACF, tên field 'vote')
  // Các trường chi tiết (có thể null/undefined nếu chưa nhập)
  queQuan?: string | null;
  chieuCao?: string | null;
  soDoBaVong?: string | null;
}

export interface Event {
  id: string;
  title: string;
  description: string | null; // Nội dung (content) từ WP
  date: string;              // Ngày (từ ACF)
  time: string;              // Giờ (từ ACF)
  location: string;          // Địa điểm (từ ACF)
}

export interface Sponsor {
  id: string;
  name: string;           // Tiêu đề (title) từ WP
  logoUrl: string;        // URL logo (từ ACF), có fallback
  website: string;        // URL website (từ ACF)
  level: string;          // Cấp độ tài trợ (từ ACF)
}

// ----------------------------------------------------------------------------
// RAW WP GRAPHQL TYPES (Kiểu dữ liệu "thô" trả về từ API)
// ----------------------------------------------------------------------------
// Lưu ý: Tên các field và type phải khớp 100% với schema GraphQL của bạn

// --- Kiểu cho Thí sinh ---
export interface WpCandidateFields {
  sbd?: string | null;
  vote?: number | null; // <-- ĐÃ SỬA TỪ soVote thành vote
  queQuan?: string | null;
  chieuCao?: string | null;
  soDoBaVong?: string | null;
  // Thêm các trường ACF khác của Thí sinh ở đây
}

export interface WpCandidate {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  content: string | null;
  featuredImage?: {
    node?: {
      sourceUrl?: string | null;
    } | null;
  } | null;
  thongTinThiSinh?: WpCandidateFields | null; // Tên Field Group trong GraphQL
}

// --- Kiểu cho Sự kiện ---
export interface WpEventFields {
  date?: string | null;
  time?: string | null;
  location?: string | null;
  // Thêm các trường ACF khác của Sự kiện ở đây
}

export interface WpEvent {
  id: string;
  title: string;
  content: string | null;
  eventFields?: WpEventFields | null; // Tên Field Group giả định
}

// --- Kiểu cho Nhà tài trợ ---
export interface WpSponsorFields {
  website?: string | null;
  level?: string | null; // Giả sử là string, cần xem lại kiểu enum nếu có
  logo?: {
    node?: {
      sourceUrl?: string | null;
    } | null;
  } | null;
  // Thêm các trường ACF khác của Nhà tài trợ ở đây
}

export interface WpSponsor {
  id: string;
  title: string;
  sponsorFields?: WpSponsorFields | null; // Tên Field Group giả định
}

// --- Kiểu cho API Response ---
// (Dùng để ép kiểu dữ liệu trả về từ fetchAPI)

export interface AllCandidatesResponse {
  data: {
    thSinhs: { // Tên query số nhiều trong GraphQL
      nodes: WpCandidate[];
    };
  };
}

export interface CandidateBySlugResponse {
  data: {
    thSinh: WpCandidate | null; // Tên query số ít trong GraphQL
  };
}

export interface AllEventsResponse {
  data: {
    events: { // Tên query số nhiều giả định
      nodes: WpEvent[];
    };
  };
}

export interface AllSponsorsResponse {
  data: {
    sponsors: { // Tên query số nhiều giả định
      nodes: WpSponsor[];
    };
  };
}

