"use client"

import { useState, useEffect } from "react"
import CandidateCard from "@/components/CandidateCard"
import { getCandidates } from "@/lib/wordpress"
import type { Candidate } from "@/lib/types"

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [sortBy, setSortBy] = useState<"votes" | "name">("votes")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await getCandidates()
      setCandidates(data)
      setLoading(false)
    }
    fetchCandidates()
  }, [])

  const sortedCandidates = [...candidates].sort((a, b) => {
    if (sortBy === "votes") {
      return b.votes - a.votes
    }
    return a.name.localeCompare(b.name)
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Danh sách thí sinh</h1>
          <p className="text-lg text-muted-foreground">Khám phá những ứng viên tài ba tham gia cuộc thi MC UEH 2025</p>
        </div>

        {/* Sort Controls */}
        <div className="mb-8 flex gap-4">
          <label className="text-foreground font-medium">Sắp xếp theo:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "votes" | "name")}
            className="px-4 py-2 border border-input rounded-lg bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="votes">Số bình chọn (cao nhất)</option>
            <option value="name">Tên (A-Z)</option>
          </select>
        </div>

        {/* Candidates Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Đang tải...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedCandidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        )}

        {sortedCandidates.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Không có thí sinh nào</p>
          </div>
        )}
      </div>
    </div>
  )
}
