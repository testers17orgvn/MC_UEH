"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    studentId: "",
    major: "",
    year: "3",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSubmitted(true)
    setLoading(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        studentId: "",
        major: "",
        year: "3",
      })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Đăng ký tham gia</h1>
          <p className="text-lg text-muted-foreground">Hãy điền thông tin của bạn để trở thành MC UEH 2025</p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-semibold">✓ Đăng ký thành công!</p>
            <p className="text-green-700 text-sm">Chúng tôi sẽ liên hệ với bạn sớm nhất.</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Họ và tên *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Nhập họ và tên của bạn"
              className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Số điện thoại *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="0123456789"
              className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground"
            />
          </div>

          {/* Student ID */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Mã sinh viên *</label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
              placeholder="Ví dụ: 20210001"
              className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground"
            />
          </div>

          {/* Major */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Ngành học *</label>
            <input
              type="text"
              name="major"
              value={formData.major}
              onChange={handleChange}
              required
              placeholder="Ví dụ: Quản trị Kinh doanh"
              className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground"
            />
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Năm học *</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground"
            >
              <option value="1">Năm 1</option>
              <option value="2">Năm 2</option>
              <option value="3">Năm 3</option>
              <option value="4">Năm 4</option>
            </select>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              required
              className="mt-1 w-4 h-4 border border-input rounded focus:ring-2 focus:ring-primary"
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground">
              Tôi đồng ý với các điều khoản và điều kiện của cuộc thi
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg font-semibold"
          >
            {loading ? "Đang xử lý..." : "Đăng ký ngay"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">Các trường có dấu * là bắt buộc</p>
        </form>

        {/* Info Box */}
        <div className="mt-12 p-6 bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="font-bold text-foreground mb-3">Lưu ý quan trọng</h3>
          <ul className="space-y-2 text-sm text-foreground">
            <li>• Bạn phải là sinh viên của Trường ĐH Kinh tế TP.HCM</li>
            <li>• Hạn đăng ký: 31/03/2025</li>
            <li>• Vòng sơ khảo: 15/04/2025</li>
            <li>• Chúng tôi sẽ liên hệ qua email hoặc điện thoại</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
