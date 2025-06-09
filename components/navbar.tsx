"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  // Memoize navigation links
  const navLinks = useMemo(
    () => [
      { name: "Home", href: "home", isPage: false },
      { name: "About", href: "about", isPage: false },
      { name: "Tech Stack", href: "tech-stack", isPage: false },
      { name: "Projects", href: "projects", isPage: false, comingSoon: true },
      { name: "Blog", href: "/blog", isPage: true, comingSoon: true },
      { name: "Contact", href: "contact", isPage: false },
    ],
    [],
  )

  // Memoize scroll handler
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10)
  }, [])

  // Memoize scroll to section function
  const scrollToSection = useCallback(
    (sectionId: string) => {
      setIsOpen(false)
      if (!isHomePage) {
        window.location.href = `/#${sectionId}`
        return
      }

      const element = document.getElementById(sectionId)
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    },
    [isHomePage],
  )

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            Shreegopal<span className="text-destructive">Dadhich</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) =>
              link.isPage ? (
                <div key={link.name} className="relative">
                  <Link
                    href={link.comingSoon ? "#" : link.href}
                    className={cn(
                      "text-muted-foreground hover:text-foreground transition-colors",
                      pathname === link.href && "text-foreground font-medium",
                      link.comingSoon && "cursor-not-allowed opacity-60",
                    )}
                    onClick={link.comingSoon ? (e) => e.preventDefault() : undefined}
                  >
                    {link.name}
                  </Link>
                  {link.comingSoon && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                      Soon
                    </span>
                  )}
                </div>
              ) : (
                <div key={link.name} className="relative">
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className={cn(
                      "text-muted-foreground hover:text-foreground transition-colors",
                      link.comingSoon && "cursor-not-allowed opacity-60",
                    )}
                    disabled={link.comingSoon}
                  >
                    {link.name}
                  </button>
                  {link.comingSoon && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                      Soon
                    </span>
                  )}
                </div>
              ),
            )}
            <Link href="/shreegopal-resume-new-v3.pdf" target="_blank" download>
              <Button>Resume</Button>
            </Link>
          </nav>

          {/* Mobile Navigation Toggle */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) =>
                link.isPage ? (
                  <div key={link.name} className="relative">
                    <Link
                      href={link.comingSoon ? "#" : link.href}
                      className={cn(
                        "text-muted-foreground hover:text-foreground transition-colors py-2 flex items-center gap-2",
                        pathname === link.href && "text-foreground font-medium",
                        link.comingSoon && "cursor-not-allowed opacity-60",
                      )}
                      onClick={link.comingSoon ? (e) => e.preventDefault() : () => setIsOpen(false)}
                    >
                      {link.name}
                      {link.comingSoon && (
                        <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                          Soon
                        </span>
                      )}
                    </Link>
                  </div>
                ) : (
                  <div key={link.name} className="relative">
                    <button
                      onClick={() => !link.comingSoon && scrollToSection(link.href)}
                      className={cn(
                        "text-muted-foreground hover:text-foreground transition-colors py-2 text-left flex items-center gap-2",
                        link.comingSoon && "cursor-not-allowed opacity-60",
                      )}
                      disabled={link.comingSoon}
                    >
                      {link.name}
                      {link.comingSoon && (
                        <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                          Soon
                        </span>
                      )}
                    </button>
                  </div>
                ),
              )}
              <Button className="w-full">Resume</Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
