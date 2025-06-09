import Blog from "@/components/blog"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shreegopal Dadhich | Blog",
  description: "DevOps insights, tutorials, and best practices by Shreegopal Dadhich",
}

// Fix the blog navigation issue by removing the pt-20 class
export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Blog />
      </main>
      <Footer />
    </div>
  )
}
