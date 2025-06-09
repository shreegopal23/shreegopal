"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, Search, User, ArrowRight, Cloud, Shield, Zap } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  slug: string
  publishedAt: string
  excerpt: string
  image: string
  author: string
  categories: string[]
  readTime: number
  featured?: boolean
}

// Add padding-top to the blog component to ensure proper spacing
export default function Blog() {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  // DevOps-focused blog posts
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Infrastructure as Code: Terraform Best Practices",
      slug: "infrastructure-as-code-terraform-best-practices",
      publishedAt: "2024-01-15",
      excerpt:
        "Master Infrastructure as Code with Terraform. Learn about state management, module design, and advanced patterns for scalable cloud infrastructure deployment.",
      image: "/placeholder.svg?height=300&width=500",
      author: "Shreegopal Dadhich",
      categories: ["Terraform", "IaC", "AWS"],
      readTime: 12,
      featured: true,
    },
    {
      id: "2",
      title: "Building Robust CI/CD Pipelines with GitLab",
      slug: "building-robust-cicd-pipelines-gitlab",
      publishedAt: "2024-01-10",
      excerpt:
        "Design and implement enterprise-grade CI/CD pipelines. Explore advanced GitLab features, security scanning, and deployment strategies for modern applications.",
      image: "/placeholder.svg?height=300&width=500",
      author: "Shreegopal Dadhich",
      categories: ["CI/CD", "GitLab", "Automation"],
      readTime: 15,
      featured: true,
    },
    {
      id: "3",
      title: "Kubernetes Security: Hardening Your Clusters",
      slug: "kubernetes-security-hardening-clusters",
      publishedAt: "2024-01-05",
      excerpt:
        "Comprehensive guide to Kubernetes security. Learn about RBAC, network policies, pod security standards, and compliance frameworks for production environments.",
      image: "/placeholder.svg?height=300&width=500",
      author: "Shreegopal Dadhich",
      categories: ["Kubernetes", "Security", "DevSecOps"],
      readTime: 18,
    },
    {
      id: "4",
      title: "Monitoring and Observability with Prometheus & Grafana",
      slug: "monitoring-observability-prometheus-grafana",
      publishedAt: "2023-12-28",
      excerpt:
        "Build comprehensive monitoring solutions. Explore metrics collection, alerting strategies, and dashboard design for maintaining system reliability.",
      image: "/placeholder.svg?height=300&width=500",
      author: "Shreegopal Dadhich",
      categories: ["Monitoring", "Prometheus", "Grafana"],
      readTime: 14,
    },
    {
      id: "5",
      title: "AWS Cost Optimization Strategies",
      slug: "aws-cost-optimization-strategies",
      publishedAt: "2023-12-20",
      excerpt:
        "Reduce cloud costs without compromising performance. Learn about resource rightsizing, reserved instances, and automated cost management techniques.",
      image: "/placeholder.svg?height=300&width=500",
      author: "Shreegopal Dadhich",
      categories: ["AWS", "Cost Optimization", "FinOps"],
      readTime: 11,
    },
    {
      id: "6",
      title: "Container Orchestration: Docker Swarm vs Kubernetes",
      slug: "container-orchestration-docker-swarm-kubernetes",
      publishedAt: "2023-12-15",
      excerpt:
        "Compare container orchestration platforms. Understand when to use Docker Swarm vs Kubernetes based on your infrastructure requirements and team expertise.",
      image: "/placeholder.svg?height=300&width=500",
      author: "Shreegopal Dadhich",
      categories: ["Docker", "Kubernetes", "Containers"],
      readTime: 13,
    },
    {
      id: "7",
      title: "Site Reliability Engineering: SLOs and Error Budgets",
      slug: "site-reliability-engineering-slos-error-budgets",
      publishedAt: "2023-12-10",
      excerpt:
        "Implement SRE practices for reliable systems. Learn about Service Level Objectives, error budgets, and balancing reliability with feature velocity.",
      image: "/placeholder.svg?height=300&width=500",
      author: "Shreegopal Dadhich",
      categories: ["SRE", "Reliability", "Performance"],
      readTime: 16,
    },
    {
      id: "8",
      title: "GitOps: Modern Deployment Strategies",
      slug: "gitops-modern-deployment-strategies",
      publishedAt: "2023-12-05",
      excerpt:
        "Embrace GitOps for declarative deployments. Explore ArgoCD, Flux, and best practices for managing applications and infrastructure through Git workflows.",
      image: "/placeholder.svg?height=300&width=500",
      author: "Shreegopal Dadhich",
      categories: ["GitOps", "ArgoCD", "Deployment"],
      readTime: 12,
    },
    {
      id: "9",
      title: "Multi-Cloud Strategy: Avoiding Vendor Lock-in",
      slug: "multi-cloud-strategy-avoiding-vendor-lockin",
      publishedAt: "2023-11-28",
      excerpt:
        "Design cloud-agnostic architectures. Learn about multi-cloud patterns, service abstraction, and strategies for maintaining flexibility across cloud providers.",
      image: "/placeholder.svg?height=300&width=500",
      author: "Shreegopal Dadhich",
      categories: ["Multi-Cloud", "Architecture", "Strategy"],
      readTime: 14,
    },
    {
      id: "10",
      title: "Automated Security Scanning in DevSecOps",
      slug: "automated-security-scanning-devsecops",
      publishedAt: "2023-11-20",
      excerpt:
        "Integrate security into your DevOps pipeline. Explore SAST, DAST, container scanning, and compliance automation for secure software delivery.",
      image: "/placeholder.svg?height=300&width=500",
      author: "Shreegopal Dadhich",
      categories: ["DevSecOps", "Security", "Automation"],
      readTime: 15,
    },
    {
      id: "11",
      title: "Disaster Recovery Planning for Cloud Infrastructure",
      slug: "disaster-recovery-planning-cloud-infrastructure",
      publishedAt: "2023-11-15",
      excerpt:
        "Build resilient systems with comprehensive DR strategies. Learn about backup automation, cross-region replication, and recovery testing procedures.",
      image: "/placeholder.svg?height=300&width=500",
      author: "Shreegopal Dadhich",
      categories: ["Disaster Recovery", "AWS", "Resilience"],
      readTime: 17,
    },
    {
      id: "12",
      title: "Infrastructure Monitoring: Beyond Basic Metrics",
      slug: "infrastructure-monitoring-beyond-basic-metrics",
      publishedAt: "2023-11-10",
      excerpt:
        "Advanced monitoring techniques for modern infrastructure. Explore distributed tracing, log aggregation, and predictive analytics for proactive operations.",
      image: "/placeholder.svg?height=300&width=500",
      author: "Shreegopal Dadhich",
      categories: ["Monitoring", "Observability", "Analytics"],
      readTime: 13,
    },
  ]

  useEffect(() => {
    let filtered = blogPosts

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.categories.some((cat) => cat.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter((post) => post.categories.includes(selectedCategory))
    }

    setFilteredPosts(filtered)
  }, [searchTerm, selectedCategory])

  const allCategories = Array.from(new Set(blogPosts.flatMap((post) => post.categories)))
  const featuredPosts = blogPosts.filter((post) => post.featured)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "aws":
      case "multi-cloud":
        return <Cloud className="h-4 w-4" />
      case "security":
      case "devsecops":
        return <Shield className="h-4 w-4" />
      case "ci/cd":
      case "automation":
        return <Zap className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <section className="py-20 pt-32 bg-gradient-to-br from-muted/30 via-background to-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20">
            DevOps Insights
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Infrastructure & Operations
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/70 mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Deep dives into DevOps practices, cloud infrastructure, automation, and site reliability engineering.
          </p>
        </motion.div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            variants={fadeIn}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              Featured Articles
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <Card
                  key={post.id}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-primary/20 bg-gradient-to-br from-card to-card/50"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge className="bg-primary/90 text-primary-foreground">Featured</Badge>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          {getCategoryIcon(post.categories[0])}
                          {post.categories[0]}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold mb-2 text-foreground">{post.title}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(post.publishedAt)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {post.readTime} min read
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="group/btn">
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Search and Filter */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          variants={fadeIn}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search DevOps articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-primary/20 focus:border-primary/40"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className={selectedCategory === null ? "bg-primary" : "border-primary/20 hover:border-primary/40"}
              >
                All Topics
              </Button>
              {allCategories.slice(0, 6).map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-1 ${
                    selectedCategory === category
                      ? "bg-primary"
                      : "border-primary/20 hover:border-primary/40 hover:bg-primary/10"
                  }`}
                >
                  {getCategoryIcon(category)}
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* All Posts Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          variants={fadeIn}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold mb-8">All Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts
              .filter((post) => !post.featured)
              .map((post, index) => (
                <motion.div
                  key={post.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  variants={fadeIn}
                >
                  <Card className="h-full group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-primary/10 hover:border-primary/30">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary" className="flex items-center gap-1 bg-background/90">
                            {getCategoryIcon(post.categories[0])}
                            {post.categories[0]}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(post.publishedAt)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {post.readTime} min read
                          </div>
                        </div>

                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{post.author}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="group/btn text-primary hover:text-primary">
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {filteredPosts.length === 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={fadeIn}
            className="text-center py-12"
          >
            <div className="max-w-md mx-auto">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg mb-4">No articles found matching your criteria.</p>
              <Button
                variant="outline"
                className="border-primary/20 hover:border-primary/40"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory(null)
                }}
              >
                Clear Filters
              </Button>
            </div>
          </motion.div>
        )}

        {/* Newsletter Subscription */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          variants={fadeIn}
          className="text-center mt-16"
        >
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Cloud className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-bold">Stay Updated on DevOps Trends</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Get the latest insights on cloud infrastructure, automation, and DevOps best practices delivered to your
                inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  placeholder="Enter your email"
                  type="email"
                  className="border-primary/20 focus:border-primary/40"
                />
                <Button className="bg-primary hover:bg-primary/90">Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      {/* Author Bio */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        variants={fadeIn}
        className="py-12 bg-muted/40 mt-20"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center">
            <div className="mb-4 rounded-full overflow-hidden w-24 h-24">
              <img src="/memoji.png" alt="Author" className="object-cover w-full h-full" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Shreegopal Dadhich</h3>
              <p className="text-muted-foreground">
                DevOps Engineer and Cloud Infrastructure Specialist with expertise in automation, containerization, and
                CI/CD pipelines.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
