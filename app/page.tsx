import type { Metadata } from "next"
import { Suspense, lazy } from "react"
import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import LoadingScreen from "@/components/loading-screen"
import ComingSoonTimer from "@/components/coming-soon-timer"
import { Code, PenTool } from "lucide-react"

// Lazy load non-critical components
const About = lazy(() => import("@/components/about"))
const TechStack = lazy(() => import("@/components/tech-stack"))
const Projects = lazy(() => import("@/components/projects"))
const Contact = lazy(() => import("@/components/contact"))
const Footer = lazy(() => import("@/components/footer"))

export const metadata: Metadata = {
  title: "Shreegopal Dadhich | DevOps Engineer Portfolio",
  description:
    "Professional portfolio of Shreegopal Dadhich - DevOps Engineer specializing in AWS, Docker, Kubernetes, and CI/CD",
  keywords: "DevOps, AWS, Docker, Kubernetes, CI/CD, Cloud Engineer, Infrastructure, Shreegopal Dadhich",
  authors: [{ name: "Shreegopal Dadhich" }],
  openGraph: {
    title: "Shreegopal Dadhich | DevOps Engineer",
    description: "Professional DevOps Engineer with expertise in cloud infrastructure and automation",
    type: "website",
  },
}

// Minimal loading fallback
function SectionSkeleton() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3 mx-auto"></div>
          <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          {/* Hero loads immediately - no lazy loading */}
          <Hero />

          {/* Lazy load other sections */}
          <Suspense fallback={<SectionSkeleton />}>
            <About />
          </Suspense>

          <Suspense fallback={<SectionSkeleton />}>
            <TechStack />
          </Suspense>

          {/* Projects Coming Soon Timer */}
          <ComingSoonTimer
            title="Projects Showcase"
            description="Detailed case studies of DevOps implementations, infrastructure automation projects, and cloud migration success stories. Get ready to explore real-world solutions and technical deep-dives."
            daysFromNow={15}
            icon={<Code className="h-8 w-8 text-primary" />}
          />

          {/* Blog Coming Soon Timer */}
          <ComingSoonTimer
            title="DevOps Blog"
            description="In-depth technical articles, tutorials, and insights on cloud infrastructure, automation, CI/CD best practices, and the latest DevOps trends. Your go-to resource for practical DevOps knowledge."
            daysFromNow={12}
            icon={<PenTool className="h-8 w-8 text-primary" />}
          />

          <Suspense fallback={<SectionSkeleton />}>
            <Contact />
          </Suspense>
        </main>

        <Suspense fallback={<div className="h-20 bg-muted"></div>}>
          <Footer />
        </Suspense>
      </div>
    </>
  )
}
