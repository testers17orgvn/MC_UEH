import type { Candidate, Event, Sponsor } from "./types"

// Mock candidates data
export const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Nguyễn Thị Hương",
    slug: "nguyen-thi-huong",
    image: "/beautiful-woman-contestant.jpg",
    bio: "Sinh viên năm 3 ngành Quản trị Kinh doanh, yêu thích các hoạt động xã hội.",
    position: "Hoa hậu",
    votes: 1250,
    category: "main",
  },
  {
    id: "2",
    name: "Trần Thị Linh",
    slug: "tran-thi-linh",
    image: "/elegant-woman-contestant.jpg",
    bio: "Sinh viên ngành Kinh tế, đam mê thể thao và du lịch.",
    position: "Á hậu 1",
    votes: 980,
    category: "main",
  },
  {
    id: "3",
    name: "Phạm Thị Minh",
    slug: "pham-thi-minh",
    image: "/confident-woman-contestant.jpg",
    bio: "Sinh viên ngành Công nghệ Thông tin, yêu thích lập trình và thiết kế.",
    position: "Á hậu 2",
    votes: 850,
    category: "main",
  },
  {
    id: "4",
    name: "Lê Thị Hồng",
    slug: "le-thi-hong",
    image: "/smiling-woman-contestant.jpg",
    bio: "Sinh viên ngành Tiếp thị, tham gia nhiều cuộc thi nhan sắc.",
    position: "Top 10",
    votes: 720,
    category: "main",
  },
  {
    id: "5",
    name: "Vũ Thị Hà",
    slug: "vu-thi-ha",
    image: "/professional-woman-contestant.jpg",
    bio: "Sinh viên ngành Luật, có kinh nghiệm trong các hoạt động ngoại khóa.",
    position: "Top 10",
    votes: 650,
    category: "main",
  },
  {
    id: "6",
    name: "Đặng Thị Hương",
    slug: "dang-thi-huong",
    image: "/talented-woman-contestant.jpg",
    bio: "Sinh viên ngành Quản lý Nhân sự, yêu thích ca hát và nhảy.",
    position: "Top 10",
    votes: 580,
    category: "main",
  },
]

// Mock events data
export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Vòng Sơ khảo",
    date: "2025-03-15",
    time: "18:00",
    location: "Hội trường A, Trường ĐH Kinh tế TP.HCM",
    description: "Vòng sơ khảo chính thức của cuộc thi MC UEH 2025",
  },
  {
    id: "2",
    title: "Vòng Bán kết",
    date: "2025-04-10",
    time: "19:00",
    location: "Hội trường B, Trường ĐH Kinh tế TP.HCM",
    description: "Vòng bán kết với 15 thí sinh xuất sắc nhất",
  },
  {
    id: "3",
    title: "Chung kết",
    date: "2025-05-20",
    time: "19:30",
    location: "Nhà hát Thành phố, TP.HCM",
    description: "Chung kết toàn quốc - Tìm kiếm MC UEH 2025",
  },
]

// Mock sponsors data
export const mockSponsors: Sponsor[] = [
  {
    id: "1",
    name: "Công ty A",
    logo: "/generic-company-logo.png",
    website: "https://example.com",
    level: "gold",
  },
  {
    id: "2",
    name: "Công ty B",
    logo: "/generic-company-logo.png",
    website: "https://example.com",
    level: "gold",
  },
  {
    id: "3",
    name: "Công ty C",
    logo: "/generic-company-logo.png",
    website: "https://example.com",
    level: "silver",
  },
  {
    id: "4",
    name: "Công ty D",
    logo: "/generic-company-logo.png",
    website: "https://example.com",
    level: "silver",
  },
]

// API functions
export async function getCandidates(): Promise<Candidate[]> {
  return mockCandidates
}

export async function getCandidateBySlug(slug: string): Promise<Candidate | null> {
  return mockCandidates.find((c) => c.slug === slug) || null
}

export async function getEvents(): Promise<Event[]> {
  return mockEvents
}

export async function getSponsors(): Promise<Sponsor[]> {
  return mockSponsors
}
