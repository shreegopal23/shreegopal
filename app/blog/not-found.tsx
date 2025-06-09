import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function BlogNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="text-muted-foreground text-lg mb-8 text-center max-w-md">
          The blog post you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link href="/blog">Return to Blog</Link>
        </Button>
      </main>
      <Footer />
    </div>
  )
}
