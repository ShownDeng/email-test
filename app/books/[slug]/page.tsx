// app/books/[slug]/page.tsx
import { books } from "@/lib/book-data"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

interface BookReviewPageProps {
  params: {
    slug: string
  }
}

export default function BookReviewPage({ params }: BookReviewPageProps) {
  const { slug } = params
  const book = books.find((b) => b.slug === slug)

  if (!book) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mb-4">书籍未找到</h1>
        <p className="text-lg text-gray-400 mb-8">抱歉，我们找不到您请求的书籍信息。</p>
        <Link href="/" className="text-blue-400 hover:underline flex items-center">
          <ChevronLeft className="w-5 h-5 mr-2" />
          返回主页
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <Link href="/" className="text-blue-400 hover:underline flex items-center mb-8">
          <ChevronLeft className="w-5 h-5 mr-2" />
          返回轨道系统
        </Link>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
          <Image
            src={book.image || "/placeholder.svg"}
            alt={book.title}
            width={200}
            height={280}
            className="rounded-lg shadow-lg border border-gray-700 object-cover"
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl font-bold text-white mb-4">{book.title}</h1>
            <p className="text-lg text-gray-400 mb-4">观后感</p>
          </div>
        </div>

        <div className="bg-gray-900/70 backdrop-blur-sm p-8 rounded-xl border border-gray-800 shadow-xl">
          <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{book.review}</p>
        </div>
      </div>
    </div>
  )
}
