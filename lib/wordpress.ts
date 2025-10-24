/**
 * ============================================================================
 * LIB/WORDPRESS.TS
 * Đây là "trái tim" của kết nối Headless.
 * File này chứa logic để fetch dữ liệu từ WordPress GraphQL API
 * và "biến đổi" (transform) nó thành dữ liệu "sạch" (Clean Types)
 * mà frontend của chúng ta có thể hiểu được (theo định nghĩa trong /lib/types.ts).
 * - Đã cập nhật tên CPT và Field Group đúng sau khi debug.
 * ============================================================================
 */

// Import các kiểu "sạch" và "thô" từ "hợp đồng dữ liệu"
import type {
  Candidate,
  Event,
  Sponsor,
  WpCandidate,
  WpEvent,
  WpSponsor,
  AllCandidatesResponse,
  CandidateBySlugResponse,
  AllEventsResponse,
  AllSponsorsResponse,
} from "@/lib/types"; // Dùng path alias

// 1. ĐỊA CHỈ API CỦA BẠN
const API_URL = "https://envangsinhvien.edu.vn/graphql";

// ----------------------------------------------------------------------------
// HÀM FETCH API LÕI
// ----------------------------------------------------------------------------
async function fetchAPI(query: string, variables: Record<string, any> = {}) {
  const headers = { 'Content-Type': 'application/json' };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
      cache: 'no-store', // Luôn lấy dữ liệu mới nhất
    });

    const json = await res.json();

    if (json.errors) {
      console.error("LỖI KHI FETCH API (lib/wordpress.ts):", JSON.stringify(json.errors, null, 2));
      // Ném lỗi chi tiết hơn
      throw new Error(`Failed to fetch API: ${json.errors[0]?.message || 'Unknown GraphQL error'}`);
    }

    if (!res.ok) {
        console.error("HTTP error!", res.status, await res.text());
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    return json.data;

  } catch (error) {
    console.error("NETWORK/FETCH ERROR in fetchAPI:", error);
    // Xử lý lỗi mạng hoặc lỗi fetch khác
    if (error instanceof Error) {
        throw new Error(`Network error fetching API: ${error.message}`);
    } else {
        throw new Error('An unknown network error occurred');
    }
  }
}


// ----------------------------------------------------------------------------
// CÁC HÀM "BIẾN ĐỔI" (TRANSFORMERS)
// ----------------------------------------------------------------------------
function transformCandidate(wpCandidate: WpCandidate): Candidate {
    // Kiểm tra xem wpCandidate có tồn tại không
    if (!wpCandidate) {
        // Có thể trả về null hoặc một object rỗng tùy theo logic của bạn
        // Ở đây ví dụ trả về một object rỗng với các giá trị mặc định an toàn
        console.warn("Attempted to transform a null or undefined wpCandidate");
        return {
            id: '',
            databaseId: 0,
            name: 'Unknown Candidate',
            slug: '',
            bio: '',
            image: "/images/placeholder-avatar.jpg",
            sbd: "N/A",
            votes: 0,
            // Thêm các trường khác với giá trị mặc định nếu cần
        };
    }
  return {
    id: wpCandidate.id,
    databaseId: wpCandidate.databaseId,
    name: wpCandidate.title || 'Tên chưa cập nhật', // Map "title" sang "name"
    slug: wpCandidate.slug,
    // Kiểm tra content có phải null không
    bio: wpCandidate.content || '', // Map "content" sang "bio"
    image: wpCandidate.featuredImage?.node?.sourceUrl || "/images/placeholder-avatar.jpg", // Thêm ảnh placeholder

    // Map từ field group "thongTinThiSinh" (ĐÚNG TÊN)
    sbd: wpCandidate.thongTinThiSinh?.sbd || "N/A",
    votes: wpCandidate.thongTinThiSinh?.vote || 0, // <-- ĐÃ SỬA thành "vote"

    // Các trường chi tiết (thêm kiểm tra null)
    queQuan: wpCandidate.thongTinThiSinh?.queQuan || "Chưa cập nhật",
    chieuCao: wpCandidate.thongTinThiSinh?.chieuCao || "Chưa cập nhật",
    soDoBaVong: wpCandidate.thongTinThiSinh?.soDoBaVong || "Chưa cập nhật",
  };
}

function transformEvent(wpEvent: WpEvent): Event {
   if (!wpEvent) {
        console.warn("Attempted to transform a null or undefined wpEvent");
        return {
            id: '', title: 'Unknown Event', description: '',
            date: "Ngày chưa xác định", time: "Giờ chưa xác định", location: "Địa điểm chưa xác định",
        };
    }
  return {
    id: wpEvent.id,
    title: wpEvent.title || 'Sự kiện chưa có tên',
    description: wpEvent.content || '', // Map "content" sang "description"

    // Map từ field group "eventFields" (TÊN NÀY CẦN KIỂM TRA LẠI TRONG ACF/GRAPHQL)
    date: wpEvent.eventFields?.date || "Ngày chưa xác định",
    time: wpEvent.eventFields?.time || "Giờ chưa xác định",
    location: wpEvent.eventFields?.location || "Địa điểm chưa xác định",
  };
}

function transformSponsor(wpSponsor: WpSponsor): Sponsor {
   if (!wpSponsor) {
        console.warn("Attempted to transform a null or undefined wpSponsor");
        return {
             id: '', name: 'Unknown Sponsor', logoUrl: "/images/placeholder-logo.png",
             website: "#", level: "default",
        };
    }
  return {
    id: wpSponsor.id,
    name: wpSponsor.title || 'Nhà tài trợ chưa có tên', // Map "title" sang "name"

    // Map từ field group "sponsorFields" (TÊN NÀY CẦN KIỂM TRA LẠI TRONG ACF/GRAPHQL)
    logoUrl: wpSponsor.sponsorFields?.logo?.node?.sourceUrl || "/images/placeholder-logo.png",
    website: wpSponsor.sponsorFields?.website || "#",
    level: wpSponsor.sponsorFields?.level || "default",
  };
}

// ----------------------------------------------------------------------------
// CÁC HÀM API EXPORTED (Dành cho Server Components)
// ----------------------------------------------------------------------------
export async function getAllCandidates(): Promise<Candidate[]> {
  const query = `
    query GetAllCandidates {
      thSinhs(first: 100) { # <-- ĐÃ SỬA thành "thSinhs"
        nodes {
          # ... (các trường id, databaseId, title, slug, content, featuredImage)
           id
          databaseId
          title
          slug
          content
          featuredImage {
            node {
              sourceUrl(size: LARGE) # Lấy ảnh size lớn hơn
            }
          }
          thongTinThiSinh { # <-- Tên Field Group ĐÚNG
            sbd
            vote          # <-- ĐÃ SỬA thành "vote"
            # Thêm các trường khác nếu cần cho Card
          }
        }
      }
    }
  `;

 try {
    const data = await fetchAPI(query) as AllCandidatesResponse['data'];

    // Kiểm tra data và nodes có tồn tại không
     if (!data?.thSinhs?.nodes) {
        console.warn("getAllCandidates received no nodes or invalid data structure");
        return []; // Trả về mảng rỗng nếu không có dữ liệu
    }

    // Biến đổi và lọc bỏ các thí sinh null (nếu có lỗi transform)
    const candidates = data.thSinhs.nodes
        .map(transformCandidate)
        .filter((c): c is Candidate => c !== null && c.id !== ''); // Đảm bảo candidate hợp lệ

    // Sắp xếp theo số vote giảm dần
    candidates.sort((a, b) => (b.votes ?? 0) - (a.votes ?? 0));

    return candidates;
 } catch (error) {
     console.error("Error in getAllCandidates:", error);
     return []; // Trả về mảng rỗng khi có lỗi
 }
}

export async function getCandidateBySlug(slug: string): Promise<Candidate | null> {
  const query = `
    query GetCandidateBySlug($slug: ID!) {
      thSinh(id: $slug, idType: SLUG) { # <-- Tên query lấy 1 người là "thSinh"
        # ... (các trường id, databaseId, title, slug, content, featuredImage)
        id
        databaseId
        title
        slug
        content(format: RENDERED) # Lấy content đã render HTML
        featuredImage {
           node {
              sourceUrl(size: LARGE)
           }
        }
        thongTinThiSinh { # <-- Tên Field Group ĐÚNG
          sbd
          vote          # <-- ĐÃ SỬA thành "vote"
          queQuan
          chieuCao
          soDoBaVong
          # Thêm các trường chi tiết khác
        }
      }
    }
  `;

  const variables = { slug };

  try {
    const data = await fetchAPI(query, variables) as CandidateBySlugResponse['data'];

    if (!data?.thSinh) {
      console.log(`Candidate with slug "${slug}" not found.`);
      return null;
    }

    // Biến đổi "thô" sang "sạch"
    return transformCandidate(data.thSinh);
   } catch (error) {
     console.error(`Error in getCandidateBySlug for slug "${slug}":`, error);
     return null; // Trả về null khi có lỗi
   }
}

export async function getAllEvents(): Promise<Event[]> {
    // TÊN CPT VÀ FIELD GROUP CẦN KIỂM TRA LẠI TRONG WP/GRAPHQL
    const query = `
    query GetAllEvents {
      # Giả sử tên CPT số nhiều là "events"
      events(first: 10, where: {orderby: {field: DATE, order: ASC}}) {
        nodes {
          id
          title
          content
          # Giả sử tên Field Group là "eventFields"
          eventFields {
            date
            time
            location
          }
        }
      }
    }
  `;

   try {
    const data = await fetchAPI(query) as AllEventsResponse['data'];
     if (!data?.events?.nodes) {
        console.warn("getAllEvents received no nodes or invalid data structure");
        return [];
    }
    const events = data.events.nodes
        .map(transformEvent)
        .filter((e): e is Event => e !== null && e.id !== '');
    return events;
   } catch (error) {
        console.error("Error in getAllEvents:", error);
        return [];
   }
}

export async function getAllSponsors(): Promise<Sponsor[]> {
     // TÊN CPT VÀ FIELD GROUP CẦN KIỂM TRA LẠI TRONG WP/GRAPHQL
    const query = `
    query GetAllSponsors {
      # Giả sử tên CPT số nhiều là "sponsors"
      sponsors(first: 50) {
        nodes {
          id
          title
           # Giả sử tên Field Group là "sponsorFields"
          sponsorFields {
            website
            level
            logo {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  `;

   try {
    const data = await fetchAPI(query) as AllSponsorsResponse['data'];
     if (!data?.sponsors?.nodes) {
        console.warn("getAllSponsors received no nodes or invalid data structure");
        return [];
    }
    const sponsors = data.sponsors.nodes
        .map(transformSponsor)
        .filter((s): s is Sponsor => s !== null && s.id !== '');
    return sponsors;
   } catch (error) {
     console.error("Error in getAllSponsors:", error);
     return [];
   }
}

// TODO: Viết hàm submitRegistration, submitVote (cần custom mutation trong WP)

