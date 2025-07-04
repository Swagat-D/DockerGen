"use client"
import { ArrowRight, Github, FileCode, Zap, Server, Check, Star, FileCode2 } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function Component() {
  // Force dark mode and prevent light mode
  useEffect(() => {
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('light')
    document.body.style.backgroundColor = '#000000'
    document.body.style.color = '#ffffff'
    
    // Prevent any theme switching
    const preventLightMode = () => {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    }
    
    // Set up observer to prevent theme changes
    const observer = new MutationObserver(preventLightMode)
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    })
    
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900/50 to-black text-gray-100" style={{backgroundColor: '#000000', color: '#ffffff'}}>
      <Navbar 
              isSignedIn={false}
              user={null}
              onSignIn={() => {}}
              onSignOut={() => {}}
            />

      <main className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        
        {/* Hero Section */}
        <section className="text-center mb-16 sm:mb-20 lg:mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent leading-tight"
          >
            Dockerize with Confidence
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto px-4"
          >
            Generate optimized Dockerfiles, commit to GitHub, and streamline your containerization workflow in seconds.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4 px-4"
          >
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto text-lg px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-xl shadow-lg shadow-pink-500/25 transition-all duration-300">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-6 py-3 border-pink-500/30 hover:border-pink-500/50 bg-black/40 hover:bg-pink-500/10 text-gray-200 hover:text-pink-300 rounded-xl transition-all duration-300">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* Features Tabs Section */}
        <section className="mb-16 sm:mb-20 lg:mb-24">
          <Tabs defaultValue="dockerfile" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 bg-black/40 border border-pink-500/20 p-1 rounded-xl h-auto">
              <TabsTrigger 
                value="dockerfile" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:text-pink-300 py-3 text-sm sm:text-base transition-all duration-300"
              >
                <span className="hidden sm:inline">Dockerfile Generation</span>
                <span className="sm:hidden">Dockerfile</span>
              </TabsTrigger>
              <TabsTrigger 
                value="github" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:text-pink-300 py-3 text-sm sm:text-base transition-all duration-300"
              >
                <span className="hidden sm:inline">GitHub Integration</span>
                <span className="sm:hidden">GitHub</span>
              </TabsTrigger>
              <TabsTrigger 
                value="optimization" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:text-pink-300 py-3 text-sm sm:text-base transition-all duration-300"
              >
                <span className="hidden sm:inline">Image Optimization</span>
                <span className="sm:hidden">Optimization</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dockerfile" className="mt-6">
              <Card className="bg-black/40 backdrop-blur-xl border border-pink-500/20 shadow-2xl shadow-pink-500/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-500/5"></div>
                <CardHeader className="relative">
                  <CardTitle className="text-white text-xl sm:text-2xl">Intelligent Dockerfile Generation</CardTitle>
                  <CardDescription className="text-gray-300 text-base sm:text-lg">Create optimized Dockerfiles tailored to your project</CardDescription>
                </CardHeader>
                <CardContent className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <ul className="space-y-3 flex-1">
                    <li className="flex items-center text-white"><Check className="mr-3 h-5 w-5 text-green-400 flex-shrink-0" /> Use lightweight base images</li>
                    <li className="flex items-center text-white"><Check className="mr-3 h-5 w-5 text-green-400 flex-shrink-0" /> Efficient layer caching</li>
                    <li className="flex items-center text-white"><Check className="mr-3 h-5 w-5 text-green-400 flex-shrink-0" /> Best practices implementation</li>
                  </ul>
                  <div className="w-full lg:w-auto flex justify-center">
                    <Image src="/imgg.webp" width={300} height={200} alt="Dockerfile Generation" className="rounded-lg shadow-lg max-w-full h-auto" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="github" className="mt-6">
              <Card className="bg-black/40 backdrop-blur-xl border border-pink-500/20 shadow-2xl shadow-pink-500/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-500/5"></div>
                <CardHeader className="relative">
                  <CardTitle className="text-white text-xl sm:text-2xl">Seamless GitHub Integration</CardTitle>
                  <CardDescription className="text-gray-300 text-base sm:text-lg">Commit your Dockerfiles directly to your repositories</CardDescription>
                </CardHeader>
                <CardContent className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <ul className="space-y-3 flex-1">
                    <li className="flex items-center text-white"><Check className="mr-3 h-5 w-5 text-green-400 flex-shrink-0" /> One-click commit</li>
                    <li className="flex items-center text-white"><Check className="mr-3 h-5 w-5 text-green-400 flex-shrink-0" /> Automatic branch creation</li>
                    <li className="flex items-center text-white"><Check className="mr-3 h-5 w-5 text-green-400 flex-shrink-0" /> Pull request generation</li>
                  </ul>
                  <div className="w-full lg:w-auto flex justify-center">
                    <Image src="/github.webp" width={300} height={200} alt="GitHub Integration" className="rounded-lg shadow-lg max-w-full h-auto" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="optimization" className="mt-6">
              <Card className="bg-black/40 backdrop-blur-xl border border-pink-500/20 shadow-2xl shadow-pink-500/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-500/5"></div>
                <CardHeader className="relative">
                  <CardTitle className="text-white text-xl sm:text-2xl">Advanced Image Optimization</CardTitle>
                  <CardDescription className="text-gray-300 text-base sm:text-lg">Minimize image sizes for faster deployments</CardDescription>
                </CardHeader>
                <CardContent className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <ul className="space-y-3 flex-1">
                    <li className="flex items-center text-white"><Check className="mr-3 h-5 w-5 text-green-400 flex-shrink-0" /> Multi-stage builds</li>
                    <li className="flex items-center text-white"><Check className="mr-3 h-5 w-5 text-green-400 flex-shrink-0" /> Dependency pruning</li>
                    <li className="flex items-center text-white"><Check className="mr-3 h-5 w-5 text-green-400 flex-shrink-0" /> Compression techniques</li>
                  </ul>
                  <div className="w-full lg:w-auto flex justify-center">
                    <Image src="/aimp.webp" width={300} height={200} alt="Image Optimization" className="rounded-lg shadow-lg max-w-full h-auto" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Feature Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20 lg:mb-24">
          <FeatureCard
            icon={<FileCode size={24} />}
            title="Smart Dockerfile Generation"
            description="Our AI-powered system creates optimized Dockerfiles tailored to your specific project requirements."
          />
          <FeatureCard
            icon={<Github size={24} />}
            title="GitHub Integration"
            description="Seamlessly commit your generated Dockerfiles to your GitHub repositories with just one click."
          />
          <FeatureCard
            icon={<Server size={24} />}
            title="Image Size Optimization"
            description="Advanced algorithms minimize image layers, resulting in smaller, more efficient Docker images."
          />
          <FeatureCard
            icon={<Zap size={24} />}
            title="Instant Preview"
            description="See your Dockerfile in action with our instant preview feature, allowing you to test before committing."
          />
          <FeatureCard
            icon={<Star size={24} />}
            title="Best Practices"
            description="Automatically implement Docker best practices, ensuring your containers are secure and efficient."
          />
          <FeatureCard
            icon={<ArrowRight size={24} />}
            title="CI/CD Integration"
            description="Easily integrate with popular CI/CD tools to streamline your development pipeline."
          />
        </section>

        {/* Testimonials Section */}
        <section className="mb-16 sm:mb-20 lg:mb-24">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            What Our Users Say
          </h2>
          <div className='flex justify-center items-center mb-8 sm:mb-12'>
           <div className='h-2 w-32 sm:w-48 lg:w-72 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full'></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <TestimonialCard
              quote="DockerGen has revolutionized our containerization process. It's a game-changer for our DevOps team."
              author="Basir Khan"
              position="Lead Developer @DeployLite."
              image="basir.jpg"
            />
            <TestimonialCard
              quote="The time saved using DockerGen is incredible. Our deployment efficiency has improved by 300%."
              author="Nyayabrata Das"
              position="DevRel, @DeployLite"
              image="na.png"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <TestimonialCard
              quote="DockerGen simplified our complex Docker setup. It's now faster and more reliable!"
              author="Aniket Subudhi"
              position="Lead Developer @FinTrack."
              image="aniket.png"
            />
            <TestimonialCard
              quote="With DockerGen, we've eliminated manual errors in our Docker files. The automation is fantastic!."
              author="Ankit Kumar Yadav"
              position="Lead Developer @WorkPulse @TradeSpark."
              image="ankit.png"
            />
          </div>
         
          <div className="flex justify-center">
            <div className="w-full md:w-1/2 lg:w-1/3">
              <TestimonialCard
                quote="DockerGen has drastically reduced our build times. It's hands down the best tool for Docker automation."
                author="Swagat Kumar Dash"
                position="Lead Developer @Universe"
                image="swgat.png"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden rounded-xl sm:rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500"></div>
          <div className="relative p-8 sm:p-12 text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Optimize Your Docker Workflow?</h2>
            <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of developers who are streamlining their Docker development process with DockerGen.
            </p>
            <Link href="/">
              <Button size="lg" variant="secondary" className="text-lg px-6 sm:px-8 py-3 sm:py-4 bg-white text-pink-600 hover:bg-gray-100 rounded-xl font-medium shadow-lg transition-all duration-300">
                Start Your Free Trial <Github className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 mt-16 sm:mt-24 border-t border-pink-500/20">
        <div className="text-center text-gray-400">
          <p>&copy; 2024 DockerGen by DeployLite. All rights reserved. Made with ❤️ by Basir Khan.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <Card className="bg-black/40 backdrop-blur-sm border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 h-full group">
      <CardHeader>
        <div className="text-pink-400 mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <CardTitle className="text-white group-hover:text-pink-300 transition-colors duration-300 text-lg sm:text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-300 text-sm sm:text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

function TestimonialCard({ quote, author, position, image }: any) {
  return (
    <Card className="bg-black/40 backdrop-blur-sm border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 h-full">
      <CardContent className="pt-6">
        <blockquote className="text-base sm:text-lg text-gray-300 mb-4 leading-relaxed">"{quote}"</blockquote>
        <div className="flex items-center">
          <Image src={`/${image}`} width={40} height={40} alt={author} className="rounded-full mr-4 flex-shrink-0" />
          <div className="min-w-0">
            <p className="font-semibold text-white text-sm sm:text-base truncate">{author}</p>
            <p className="text-xs sm:text-sm text-gray-400 truncate">{position}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}