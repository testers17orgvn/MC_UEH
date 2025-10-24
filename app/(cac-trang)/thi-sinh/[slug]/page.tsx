import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getCandidateBySlug, getCandidates } from "@/lib/wordpress"
import { notFound } from "next/navigation"

interface CandidateDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const candidates = await getCandidates()
  return candidates.map((candidate) => ({
    slug: candidate.slug,
  }))
}

export default async function CandidateDetailPage({ params }: CandidateDetailPageProps) {
  const { slug } = await params
  const candidate = await getCandidateBySlug(slug)

  if (!candidate) {
    notFound()
  }

  const allCandidates = await getCandidates()
  const currentIndex = allCandidates.findIndex((c) => c.slug === slug)
  const previousCandidate = currentIndex > 0 ? allCandidates[currentIndex - 1] : null
  const nextCandidate = currentIndex < allCandidates.length - 1 ? allCandidates[currentIndex + 1] : null

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/thi-sinh" className="text-primary hover:underline mb-8 inline-block">
          ← Quay lại danh sách
        </Link>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Image */}
            <div className="relative h-96 md:h-full min-h-96">
              <Image
                src={candidate.image || "/placeholder.svg"}
                alt={candidate.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">{candidate.name}</h1>
                <p className="text-2xl text-primary font-semibold mb-6">{candidate.position}</p>

                <div className="mb-8 p-4 bg-primary/10 rounded-lg">
                  <p className="text-lg text-primary font-bold">{candidate.votes} bình chọn</p>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-bold text-foreground mb-4">Tiểu sử</h2>
                  <p className="text-foreground leading-relaxed text-lg">{candidate.bio}</p>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-bold text-foreground mb-4">Thông tin</h2>
                  <div className="space-y-3">
                    <p className="text-foreground">
                      <span className="font-semibold">Danh mục:</span> {candidate.category}
                    </p>
                    <p className="text-foreground">
                      <span className="font-semibold">ID:</span> {candidate.id}
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg">
                Bình chọn cho {candidate.name}
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4 mt-12">
          {previousCandidate ? (
            <Link href={`/thi-sinh/${previousCandidate.slug}`}>
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/10 bg-transparent"
              >
                ← {previousCandidate.name}
              </Button>
            </Link>
          ) : (
            <div />
          )}
          {nextCandidate ? (
            <Link href={`/thi-sinh/${nextCandidate.slug}`}>
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/10 bg-transparent"
              >
                {nextCandidate.name} →
              </Button>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  )
}
