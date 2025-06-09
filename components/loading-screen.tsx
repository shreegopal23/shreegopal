"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Faster, more realistic loading simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 200) // Reduced delay
          return 100
        }
        return prev + Math.random() * 25 // Faster progress
      })
    }, 50) // Faster updates

    // Reduced minimum loading time
    const minLoadTime = setTimeout(() => {
      setProgress(100)
    }, 800) // Reduced from 1500ms to 800ms

    return () => {
      clearInterval(interval)
      clearTimeout(minLoadTime)
    }
  }, [])

  if (!isLoading) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }} // Faster exit
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      >
        <div className="text-center">
          {/* Simplified Logo Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-3 border-3 border-primary/20 border-t-primary rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">SD</span>
              </div>
            </div>
          </motion.div>

          {/* Simplified Brand Name */}
          <motion.h1
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-2xl font-bold mb-1"
          >
            Shreegopal<span className="text-primary">Dadhich</span>
          </motion.h1>

          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="text-muted-foreground mb-6 text-sm"
          >
            DevOps Engineer
          </motion.p>

          {/* Simplified Progress Bar */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "150px", opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mx-auto mb-3"
          >
            <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
                className="bg-primary h-1.5 rounded-full"
              />
            </div>
          </motion.div>

          {/* Simplified Loading Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="text-xs text-muted-foreground"
          >
            {progress < 100 ? `${Math.round(progress)}%` : "Ready!"}
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
