"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Lightbulb, Rocket } from "lucide-react"

export default function About() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            About Me
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Who I Am</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeIn}
          >
            <h3 className="text-2xl font-bold mb-4">A Passionate DevOps</h3>
            <p className="text-muted-foreground mb-6">
             I'm a DevOps engineer passionate about building scalable, reliable, and automated infrastructure. With hands-on experience in CI/CD, cloud platforms, containerization, and monitoring.
            </p>
            <p className="text-muted-foreground mb-6">
              My journey in technology began during college, where I developed a strong interest in cloud computing and infrastructure automation. Over time, I transitioned into DevOps, where I discovered a passion for streamlining deployments, optimizing system performance, and enabling rapid software delivery. Since then, I’ve been continuously enhancing my skills in AWS, CI/CD, Docker, and monitoring to stay aligned with industry best practices.
            </p>
            <p className="text-muted-foreground">
              When I’m not working on deployments or automating workflows, you’ll find me exploring new DevOps tools, contributing to projects, or engaging with the tech community to share insights and learn from others.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              variants={fadeIn}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Code className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Infrastructure Automation</h4>
                      <p className="text-muted-foreground">
                        Experienced in automating infrastructure using Terraform and AWS CloudFormation to build scalable and secure cloud environments.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              variants={fadeIn}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Lightbulb className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Deployment & Monitoring</h4>
                      <p className="text-muted-foreground">
                        Skilled in deploying and monitoring microservices using CI/CD pipelines, Docker, ECS, and observability tools like CloudWatch and Grafana.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              variants={fadeIn}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Rocket className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">Continuous Improvement</h4>
                      <p className="text-muted-foreground">
                        Continuously learning and applying best practices in cloud security, cost optimization, and DevOps workflows to enhance system reliability.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
