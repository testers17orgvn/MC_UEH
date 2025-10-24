import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import CandidateCard from "@/components/CandidateCard"
import { getCandidates, getEvents, getSponsors } from "@/lib/wordpress"

export default async function HomePage() {
  const candidates = await getCandidates()
  const events = await getEvents()
  const sponsors = await getSponsors()

  const topCandidates = candidates.slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">MC UEH 2025</h1>
              <p className="text-lg text-white/90 mb-6">
                Tìm kiếm MC xuất sắc nhất của Trường Đại học Kinh tế TP.HCM. Hãy cùng chúng tôi khám phá những tài năng
                trẻ tài ba.
              </p>
              <div className="flex gap-4">
                <Link href="/thi-sinh">
                  <Button className="bg-white text-primary hover:bg-white/90">Xem thí sinh</Button>
                </Link>
                <Link href="/dang-ky">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                    Đăng ký tham gia
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-96 hidden md:block">
              <Image src="/mc-stage-event.jpg" alt="MC UEH 2025" fill className="object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Top Candidates Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Thí sinh nổi bật</h2>
            <p className="text-muted-foreground text-lg">Những ứng viên hàng đầu của cuộc thi</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {topCandidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/thi-sinh">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8">Xem tất cả thí sinh</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Lịch trình sự kiện</h2>
            <p className="text-muted-foreground text-lg">Các vòng thi chính thức</p>
          </div>

          <div className="space-y-6">
            {events.map((event, index) => (
              <div key={event.id} className="flex gap-6 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  {index < events.length - 1 && <div className="w-1 h-16 bg-primary/30 mt-2" />}
                </div>
                <div className="flex-1 pb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{event.title}</h3>
                  <p className="text-muted-foreground mb-2">
                    📅 {new Date(event.date).toLocaleDateString("vi-VN")} lúc {event.time}
                  </p>
                  <p className="text-muted-foreground mb-2">📍 {event.location}</p>
                  <p className="text-foreground">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nhà tài trợ</h2>
            <p className="text-muted-foreground text-lg">Cảm ơn sự hỗ trợ của các đối tác</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <Image
                  src={sponsor.logo || "/placeholder.svg"}
                  alt={sponsor.name}
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Bạn muốn tham gia?</h2>
          <p className="text-lg text-white/90 mb-8">Đăng ký ngay để trở thành MC UEH 2025</p>
          <Link href="/dang-ky">
            <Button className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg">Đăng ký tham gia</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
