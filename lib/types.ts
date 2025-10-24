export interface Candidate {
  id: string
  name: string
  slug: string
  image: string
  bio: string
  position: string
  votes: number
  category: string
}

export interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
}

export interface Sponsor {
  id: string
  name: string
  logo: string
  website: string
  level: "gold" | "silver" | "bronze"
}

export interface Registration {
  id: string
  fullName: string
  email: string
  phone: string
  studentId: string
  major: string
  year: number
  createdAt: string
}
