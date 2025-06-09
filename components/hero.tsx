"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react"
import { motion } from "framer-motion"

export default function Hero() {
  const [text, setText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  const fullText = "DevOps Engineer"

  // Memoize static content
  const staticContent = useMemo(
    () => ({
      name: "Shreegopal Dadhich",
      description:
        "Multi-cloud DevOps Engineer with AWS certification and hands-on experience in automation, CI/CD, containerization, and infrastructure management.",
    }),
    [],
  )

  // Memoize scroll function
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  }, [])

  useEffect(() => {
    // Immediate visibility
    setIsVisible(true)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let i = 0
    setText("")

    // Reduced delay and faster typing
    const startDelay = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (i < fullText.length) {
          setText(fullText.substring(0, i + 1))
          i++
        } else {
          clearInterval(typingInterval)
        }
      }, 80) // Faster typing

      return () => clearInterval(typingInterval)
    }, 200) // Reduced delay

    // Cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => {
      clearTimeout(startDelay)
      clearInterval(cursorInterval)
    }
  }, [isVisible, fullText])

  // Immediate render without skeleton
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-4xl md:text-6xl font-bold mb-2"
            >
              Hi, I'm <span className="text-primary">{staticContent.name}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-2xl md:text-3xl font-medium text-muted-foreground min-h-[3rem]"
            >
              {text}
              <span
                className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-100 text-foreground`}
              >
                |
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8 max-w-lg"
            >
              {staticContent.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="group" onClick={() => scrollToSection("tech-stack")}>
                View My Skills
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection("contact")}>
                Contact Me
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex gap-4 mt-8"
            >
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10" asChild>
                <a href="https://www.linkedin.com/in/shreegopal-dadhich" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10" asChild>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative"
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* Optimized photo container */}
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-background shadow-2xl">
                <div className="absolute inset-4 rounded-2xl overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                  <img
                    src="/shree.jpg?height=500&width=500"
                    alt="Shreegopal Dadhich - DevOps Engineer"
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent"></div>
                </div>
              </div>

              {/* Simplified floating elements */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-primary/30 to-primary/10 rounded-2xl rotate-12 shadow-lg"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl -rotate-12 shadow-lg"></div>

              {/* Tech badges with faster animations */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="absolute -top-4 left-8 bg-background/90 backdrop-blur-sm border border-primary/20 rounded-full px-3 py-1 shadow-lg"
              >
                <span className="text-sm font-medium text-primary">☁️ AWS</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="absolute top-1/2 -right-6 bg-background/90 backdrop-blur-sm border border-primary/20 rounded-full px-3 py-1 shadow-lg"
              >
                <span className="text-sm font-medium text-primary">🐳 Docker</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
                className="absolute -bottom-2 left-12 bg-background/90 backdrop-blur-sm border border-primary/20 rounded-full px-3 py-1 shadow-lg"
              >
                <span className="text-sm font-medium text-primary">⚙️ K8s</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
      >
        <button onClick={() => scrollToSection("about")} className="animate-bounce">
          <ArrowRight className="h-6 w-6 transform rotate-90 text-muted-foreground hover:text-primary transition-colors" />
        </button>
      </motion.div>
    </section>
  )
}
