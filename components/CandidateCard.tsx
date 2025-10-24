import Image from "next/image"
import Link from "next/link"
import type { Candidate } from "@/lib/types"

interface CandidateCardProps {
  candidate: Candidate
}

export default function CandidateCard({ candidate }: CandidateCardProps) {
  return (
    <Link href={`/thi-sinh/${candidate.slug}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative w-full h-64 bg-muted">
          <Image src={candidate.image || "/placeholder.svg"} alt={candidate.name} fill className="object-cover" />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg text-foreground mb-1">{candidate.name}</h3>
          <p className="text-sm text-primary font-semibold mb-2">{candidate.position}</p>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{candidate.bio}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
              {candidate.votes} bình chọn
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
