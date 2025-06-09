"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Calendar, Rocket } from "lucide-react"

interface ComingSoonTimerProps {
  title: string
  description: string
  daysFromNow: number
  icon?: React.ReactNode
}

export default function ComingSoonTimer({ title, description, daysFromNow, icon }: ComingSoonTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set target date to 15 days from now
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + daysFromNow)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [daysFromNow])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-primary/10">
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
            Coming Soon
          </Badge>
          <div className="flex items-center justify-center gap-3 mb-4">
            {icon || <Rocket className="h-8 w-8 text-primary" />}
            <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/70 mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{description}</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-to-br from-card to-card/50 border-primary/20 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                  <h3 className="text-2xl font-bold">Launch Countdown</h3>
                </div>
                <p className="text-muted-foreground">Get ready for something amazing!</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl p-6 border border-primary/20">
                      <motion.div
                        key={item.value}
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-3xl md:text-4xl font-bold text-primary mb-2"
                      >
                        {item.value.toString().padStart(2, "0")}
                      </motion.div>
                      <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                        {item.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">
                    Expected Launch:{" "}
                    {new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    🚀 In Development
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    ⚡ High Priority
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    🎯 Version 2.0
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          variants={fadeIn}
          className="mt-12 max-w-2xl mx-auto"
        >
          <div className="text-center mb-4">
            <span className="text-sm text-muted-foreground">Development Progress</span>
          </div>
          <div className="bg-muted rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
              className="bg-gradient-to-r from-primary to-primary/70 h-3 rounded-full relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </motion.div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Started</span>
            <span className="text-primary font-medium">75% Complete</span>
            <span>Launch Ready</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
