import { notFound } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

// This would normally come from your data source
const getBlogPost = (slug: string) => {
  const blogPosts = [
    {
      id: "1",
      title: "Infrastructure as Code: Terraform Best Practices",
      slug: "infrastructure-as-code-terraform-best-practices",
      publishedAt: "2024-01-15",
      content: `
        <p>Infrastructure as Code (IaC) has revolutionized how we manage and provision cloud resources. Terraform, as one of the leading IaC tools, enables teams to define infrastructure in a declarative way, version it alongside application code, and automate deployments across multiple cloud providers.</p>
        
        <h2>Why Terraform?</h2>
        <p>Terraform offers several advantages over other IaC solutions:</p>
        <ul>
          <li>Provider-agnostic approach supporting multiple cloud platforms</li>
          <li>Declarative syntax that describes the desired end state</li>
          <li>State management for tracking real-world resources</li>
          <li>Plan and apply workflow for safe infrastructure changes</li>
          <li>Module system for reusable infrastructure components</li>
        </ul>
        
        <h2>Best Practices for Terraform</h2>
        
        <h3>1. State Management</h3>
        <p>Always use remote state storage with locking to enable team collaboration and prevent state corruption. AWS S3 with DynamoDB, Azure Storage, or Google Cloud Storage are excellent options for remote state backends.</p>
        
        <pre><code>
        terraform {
          backend "s3" {
            bucket         = "terraform-state-bucket"
            key            = "project/environment/terraform.tfstate"
            region         = "us-west-2"
            dynamodb_table = "terraform-locks"
            encrypt        = true
          }
        }
        </code></pre>
        
        <h3>2. Module Organization</h3>
        <p>Structure your Terraform code into reusable modules that encapsulate specific infrastructure components. This promotes code reuse and maintainability.</p>
        
        <h3>3. Environment Separation</h3>
        <p>Use workspaces or directory structures to separate environments (dev, staging, production). This ensures that changes to one environment don't affect others.</p>
        
        <h3>4. Variable Management</h3>
        <p>Define input variables with descriptions and type constraints. Use variable files (.tfvars) for environment-specific values.</p>
        
        <h3>5. Output Documentation</h3>
        <p>Document outputs thoroughly to make your modules more usable by others.</p>
        
        <h2>Advanced Terraform Patterns</h2>
        
        <h3>Terragrunt for DRY Configurations</h3>
        <p>Terragrunt helps keep your Terraform configurations DRY (Don't Repeat Yourself) by providing remote state management, module dependencies, and code generation capabilities.</p>
        
        <h3>CI/CD Integration</h3>
        <p>Integrate Terraform into your CI/CD pipeline to automate infrastructure deployments. Use tools like GitHub Actions, GitLab CI, or Jenkins to run Terraform plans and applies.</p>
        
        <h2>Conclusion</h2>
        <p>By following these best practices, you can build scalable, maintainable, and secure infrastructure with Terraform. Remember that Infrastructure as Code is not just about automation but also about applying software engineering principles to infrastructure management.</p>
      `,
      excerpt:
        "Master Infrastructure as Code with Terraform. Learn about state management, module design, and advanced patterns for scalable cloud infrastructure deployment.",
      image: "/placeholder.svg?height=600&width=1200",
      author: "Shreegopal Dadhich",
      categories: ["Terraform", "IaC", "AWS"],
      readTime: 12,
    },
  ]

  const post = blogPosts.find((post) => post.slug === slug)
  if (!post) return null
  return post
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPost(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${post.title} | MemoryLeaked Blog`,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back to blog link */}
            <div className="mb-8">
              <Button variant="ghost" asChild className="pl-0 hover:bg-transparent">
                <Link href="/blog" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="h-4 w-4" />
                  Back to all articles
                </Link>
              </Button>
            </div>

            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8">
              <img
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Author Bio */}
            <div className="mt-16 p-6 border rounded-lg bg-muted/30">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src="/placeholder.svg?height=100&width=100"
                    alt={post.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Shreegopal Dadhich</h3>
                  <p className="text-muted-foreground">
                    DevOps Engineer and Cloud Infrastructure Specialist with expertise in automation, containerization,
                    and CI/CD pipelines.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Posts would go here */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
