/**
 * ============================================================================
 * LIB/WORDPRESS.TS
 * - Đã cập nhật để đọc API URL từ Environment Variable.
 * - Đã sửa lỗi tên CPT, Field Group, Field theo kết quả debug.
 * ============================================================================
 */

import type {
  Candidate, Event, Sponsor, WpCandidate, WpEvent, WpSponsor,
  AllCandidatesResponse, CandidateBySlugResponse, AllEventsResponse, AllSponsorsResponse,
} from "@/lib/types";

// 1. ĐỌC API URL TỪ BIẾN MÔI TRƯỜNG
// Giá trị này sẽ được lấy từ Vercel Environment Variable khi deploy.
// Nếu chạy local, bạn cần tạo file .env.local và định nghĩa biến này.
const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

// Kiểm tra xem biến môi trường đã được set chưa
if (!API_URL) {
  throw new Error(`
    ============================================================================
    LỖI CẤU HÌNH: Biến môi trường NEXT_PUBLIC_WORDPRESS_API_URL chưa được đặt.
    - Nếu deploy trên Vercel, hãy vào Settings -> Environment Variables.
    - Nếu chạy local, hãy tạo file .env.local và thêm dòng:
      NEXT_PUBLIC_WORDPRESS_API_URL=https://cms.envangsinhvien.edu.vn/graphql
      (Hoặc thay bằng URL WordPress local của bạn nếu có)
    ============================================================================
  `);
}

// ----------------------------------------------------------------------------
// HÀM FETCH API LÕI (Không đổi)
// ----------------------------------------------------------------------------
async function fetchAPI(query: string, variables: Record<string, any> = {}) {
  const headers = { 'Content-Type': 'application/json' };

  try {
    const res = await fetch(API_URL!, { // Sử dụng API_URL đã đọc
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    });

    const json = await res.json();

    if (json.errors) {
      console.error("LỖI KHI FETCH API (lib/wordpress.ts):", JSON.stringify(json.errors, null, 2));
      throw new Error(`Failed to fetch API: ${json.errors[0]?.message || 'Unknown GraphQL error'}`);
    }
     if (!res.ok) {
        console.error("HTTP error!", res.status, await res.text());
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    return json.data;

  } catch (error) {
    console.error("NETWORK/FETCH ERROR in fetchAPI:", error);
     if (error instanceof Error) {
        // Ném lại lỗi để Server Component có thể bắt và hiển thị trang lỗi
        throw new Error(`Network error fetching API: ${error.message}`);
    } else {
        throw new Error('An unknown network error occurred');
    }
  }
}


// ----------------------------------------------------------------------------
// CÁC HÀM "BIẾN ĐỔI" (TRANSFORMERS) - Đã sửa tên 'vote'
// ----------------------------------------------------------------------------
function transformCandidate(wpCandidate: WpCandidate): Candidate | null {
   if (!wpCandidate) return null; // Trả về null nếu input là null
  return {
    id: wpCandidate.id,
    databaseId: wpCandidate.databaseId,
    name: wpCandidate.title || 'Tên chưa cập nhật',
    slug: wpCandidate.slug,
    bio: wpCandidate.content || null, // Có thể là null
    image: wpCandidate.featuredImage?.node?.sourceUrl || "/images/placeholder-avatar.jpg",
    sbd: wpCandidate.thongTinThiSinh?.sbd || "N/A",
    votes: wpCandidate.thongTinThiSinh?.vote || 0, // <-- Dùng tên 'vote' đúng
    queQuan: wpCandidate.thongTinThiSinh?.queQuan || null,
    chieuCao: wpCandidate.thongTinThiSinh?.chieuCao || null,
    soDoBaVong: wpCandidate.thongTinThiSinh?.soDoBaVong || null,
  };
}

function transformEvent(wpEvent: WpEvent): Event | null {
  if (!wpEvent) return null;
  return {
    id: wpEvent.id,
    title: wpEvent.title || 'Sự kiện chưa có tên',
    description: wpEvent.content || null,
    date: wpEvent.eventFields?.date || "Ngày chưa xác định", // Tên eventFields cần kiểm tra
    time: wpEvent.eventFields?.time || "Giờ chưa xác định",
    location: wpEvent.eventFields?.location || "Địa điểm chưa xác định",
  };
}

function transformSponsor(wpSponsor: WpSponsor): Sponsor | null {
   if (!wpSponsor) return null;
  return {
    id: wpSponsor.id,
    name: wpSponsor.title || 'Nhà tài trợ chưa có tên',
    logoUrl: wpSponsor.sponsorFields?.logo?.node?.sourceUrl || "/images/placeholder-logo.png", // Tên sponsorFields cần kiểm tra
    website: wpSponsor.sponsorFields?.website || "#",
    level: wpSponsor.sponsorFields?.level || "default",
  };
}

// ----------------------------------------------------------------------------
// CÁC HÀM API EXPORTED - Đã sửa tên CPT và Field
// ----------------------------------------------------------------------------
export async function getAllCandidates(): Promise<Candidate[]> {
  const query = `
    query GetAllCandidates {
      thSinhs(first: 100) { # <-- Tên CPT đúng: thSinhs
        nodes {
          id
          databaseId
          title
          slug
          content
          featuredImage { node { sourceUrl(size: LARGE) } }
          thongTinThiSinh { # <-- Tên Field Group đúng
            sbd
            vote          # <-- Tên Field đúng
          }
        }
      }
    }
  `;

 try {
    const data = await fetchAPI(query) as AllCandidatesResponse['data'];
     if (!data?.thSinhs?.nodes) return [];

    const candidates = data.thSinhs.nodes
        .map(transformCandidate)
        .filter((c): c is Candidate => c !== null); // Lọc bỏ null

    candidates.sort((a, b) => b.votes - a.votes);
    return candidates;
 } catch (error) {
     console.error("Error in getAllCandidates:", error);
     return []; // Trả về mảng rỗng khi có lỗi để trang không bị crash
 }
}

export async function getCandidateBySlug(slug: string): Promise<Candidate | null> {
  const query = `
    query GetCandidateBySlug($slug: ID!) {
      thSinh(id: $slug, idType: SLUG) { # <-- Tên query đúng: thSinh
        id
        databaseId
        title
        slug
        content(format: RENDERED)
        featuredImage { node { sourceUrl(size: LARGE) } }
        thongTinThiSinh { # <-- Tên Field Group đúng
          sbd
          vote          # <-- Tên Field đúng
          queQuan
          chieuCao
          soDoBaVong
        }
      }
    }
  `;
  const variables = { slug };

  try {
    const data = await fetchAPI(query, variables) as CandidateBySlugResponse['data'];
    if (!data?.thSinh) return null;
    return transformCandidate(data.thSinh);
   } catch (error) {
     console.error(`Error in getCandidateBySlug for slug "${slug}":`, error);
     return null; // Trả về null khi có lỗi
   }
}

export async function getAllEvents(): Promise<Event[]> {
  // TODO: Thay "events" và "eventFields" bằng tên đúng từ GraphQL Schema
  const query = `
    query GetAllEvents {
      # events(first: 10, where: {orderby: {field: DATE, order: ASC}}) {
      #   nodes {
      #     id
      #     title
      #     content
      #     eventFields { date time location }
      #   }
      # }
       # Tạm thời trả về mảng rỗng để tránh lỗi build
       __typename # Thêm field này để query không bị rỗng
    }
  `;
    console.warn("getAllEvents: Query is commented out. Need correct CPT/Field names from WP GraphQL Schema.");
    return []; // Tạm thời trả về mảng rỗng

//  try {
//     const data = await fetchAPI(query) as AllEventsResponse['data'];
//      if (!data?.events?.nodes) return [];
//     const events = data.events.nodes
//         .map(transformEvent)
//         .filter((e): e is Event => e !== null);
//     return events;
//    } catch (error) {
//         console.error("Error in getAllEvents:", error);
//         return [];
//    }
}

export async function getAllSponsors(): Promise<Sponsor[]> {
  // TODO: Thay "sponsors" và "sponsorFields" bằng tên đúng từ GraphQL Schema
  const query = `
    query GetAllSponsors {
      # sponsors(first: 50) {
      #   nodes {
      #     id
      #     title
      #     sponsorFields { website level logo { node { sourceUrl } } }
      #   }
      # }
       # Tạm thời trả về mảng rỗng để tránh lỗi build
        __typename # Thêm field này để query không bị rỗng
    }
  `;
    console.warn("getAllSponsors: Query is commented out. Need correct CPT/Field names from WP GraphQL Schema.");
    return []; // Tạm thời trả về mảng rỗng

//  try {
//     const data = await fetchAPI(query) as AllSponsorsResponse['data'];
//      if (!data?.sponsors?.nodes) return [];
//     const sponsors = data.sponsors.nodes
//         .map(transformSponsor)
//         .filter((s): s is Sponsor => s !== null);
//     return sponsors;
//    } catch (error) {
//      console.error("Error in getAllSponsors:", error);
//      return [];
//    }
}

// TODO: Viết hàm submitRegistration, submitVote

