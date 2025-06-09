"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Cloud, Container, GitBranch, Monitor, Database, Code2, Award, Trophy } from "lucide-react"

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const technologies = {
    cloud: {
      icon: <Cloud className="h-6 w-6" />,
      title: "Cloud Platforms",
      description: "Multi-cloud expertise with AWS and Azure",
      skills: [
        { name: "AWS", level: 95, icon: "☁️" },
        { name: "Azure", level: 80, icon: "🔷" },
      ],
    },
    iac: {
      icon: <Code2 className="h-6 w-6" />,
      title: "Infrastructure as Code",
      description: "Infrastructure automation and provisioning",
      skills: [
        { name: "AWS CloudFormation", level: 95, icon: "☁️" },
        { name: "Terraform", level: 90, icon: "🏗️" },
      ],
    },
    containers: {
      icon: <Container className="h-6 w-6" />,
      title: "Containerization & Orchestration",
      description: "Container technologies and microservices",
      skills: [
        { name: "Docker", level: 92, icon: "🐳" },
        { name: "Kubernetes", level: 85, icon: "⚙️" },
      ],
    },
    cicd: {
      icon: <GitBranch className="h-6 w-6" />,
      title: "CI/CD & DevOps Tools",
      description: "Continuous integration and deployment pipelines",
      skills: [
        { name: "GitLab CI/CD", level: 95, icon: "🦊" },
        { name: "GitHub Actions", level: 88, icon: "🐙" },
        { name: "Jenkins", level: 80, icon: "🔨" },
      ],
    },
    monitoring: {
      icon: <Monitor className="h-6 w-6" />,
      title: "Monitoring & Logging",
      description: "System monitoring and observability",
      skills: [
        { name: "DataDog", level: 88, icon: "🐕" },
        { name: "CloudWatch", level: 92, icon: "👁️" },
        { name: "EFK Stack", level: 85, icon: "📊" },
        { name: "Grafana", level: 80, icon: "📈" },
        { name: "Sentry", level: 78, icon: "🚨" },
      ],
    },
    databases: {
      icon: <Database className="h-6 w-6" />,
      title: "Database Management",
      description: "Database technologies and management",
      skills: [
        { name: "PostgreSQL", level: 85, icon: "🐘" },
        { name: "MySQL", level: 82, icon: "🐬" },
        { name: "MongoDB", level: 80, icon: "🍃" },
        { name: "Redis", level: 80, icon: "🔴" },
      ],
    },
    programming: {
      icon: <Code2 className="h-6 w-6" />,
      title: "Programming & Scripting",
      description: "Programming languages and automation scripts",
      skills: [
        { name: "Python", level: 85, icon: "🐍" },
        { name: "C", level: 80, icon: "⚙️" },
        { name: "Bash", level: 88, icon: "💻" },
        { name: "Node.js", level: 75, icon: "💚" },
        { name: "Automation Scripts", level: 90, icon: "🤖" },
      ],
    },
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  }

  return (
    <section id="tech-stack" className="py-20 bg-gradient-to-br from-muted/30 via-background to-muted/20">
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
            Technical Expertise
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">DevOps & Cloud Engineering Skills</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Multi-cloud DevOps Engineer with AWS certification and hands-on experience in automation, CI/CD, and
            infrastructure management.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(technologies).map(([key, category]) => (
            <motion.div
              key={key}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              variants={scaleUp}
            >
              <Card
                className={`h-full cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-primary/10 hover:border-primary/30 ${
                  selectedCategory === key ? "ring-2 ring-primary shadow-lg" : ""
                }`}
                onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-br from-primary/20 to-primary/10 p-3 rounded-full">
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-primary">{category.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{category.description}</p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {selectedCategory === key && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 border-t border-primary/10 pt-4"
                      >
                        {category.skills.map((skill, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="space-y-2"
                          >
                            <div className="flex justify-between items-center text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{skill.icon}</span>
                                <span className="font-medium">{skill.name}</span>
                              </div>
                              <span className="text-primary font-semibold">{skill.level}%</span>
                            </div>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                              className="bg-primary h-2 rounded-full relative"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                            </motion.div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {selectedCategory !== key && (
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {category.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs flex items-center gap-1">
                            <span>{skill.icon}</span>
                            {skill.name}
                          </Badge>
                        ))}
                        {category.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                            +{category.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-muted-foreground">Click to view details</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Experience Summary */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          variants={fadeIn}
          className="mt-16"
        >
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Cloud className="h-6 w-6 text-primary" />
                    <h3 className="text-2xl font-bold">1M+</h3>
                  </div>
                  <p className="text-muted-foreground">Active Users Managed</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Container className="h-6 w-6 text-primary" />
                    <h3 className="text-2xl font-bold">3-Tier</h3>
                  </div>
                  <p className="text-muted-foreground">Secure Infrastructure</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <GitBranch className="h-6 w-6 text-primary" />
                    <h3 className="text-2xl font-bold">100%</h3>
                  </div>
                  <p className="text-muted-foreground">Automated Deployments</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Certifications & Achievements */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          variants={fadeIn}
          className="mt-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Certifications */}
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" />
                <span className="text-primary">Certifications</span>
              </h3>
              <div className="space-y-4">
                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">☁️</div>
                      <div>
                        <h4 className="font-semibold text-lg">AWS Cloud Practitioner</h4>
                        <p className="text-muted-foreground">Achieved on first attempt</p>
                        <Badge variant="outline" className="border-primary/30 text-primary mt-2">
                          Certified
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <Trophy className="h-6 w-6 text-primary" />
                <span className="text-primary">Achievements</span>
              </h3>
              <div className="space-y-4">
                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">⭐</div>
                      <div>
                        <h4 className="font-semibold">Rising Star of the Month</h4>
                        <p className="text-muted-foreground text-sm">Recognized for outstanding performance</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">🛠️</div>
                      <div>
                        <h4 className="font-semibold">Critical Issue Resolution</h4>
                        <p className="text-muted-foreground text-sm">
                          Appreciated by mentor for solving deployment issues
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.0 }}
          variants={fadeIn}
          className="mt-12 text-center text-muted-foreground"
        >
          <p className="max-w-3xl mx-auto text-lg">
            Multi-cloud DevOps Engineer with proven expertise in developing and managing cloud infrastructure, focusing
            on enhancing scalability, maintainability, and performance. Experienced in handling infrastructure for
            nearly 1M active users with high availability and security.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
