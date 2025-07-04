"use client"
import { useState, useEffect } from 'react'
import { Check, X, FileCode, Github, Zap, FileCode2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

export default function PricingPlan() {
  const router = useRouter();

  // Force dark mode on component mount
  useEffect(() => {
    document.documentElement.classList.add('dark')
    document.body.style.backgroundColor = '#000000'
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900/50 to-black text-gray-100 dark">
      {/* Import Navbar Component */}
      <Navbar 
        isSignedIn={false}
        user={null}
        onSignIn={() => {}}
        onSignOut={() => {}}
      />

      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-8 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Simple Pricing for Everyone
          </h1>
          <p className="text-xl text-gray-400 mt-4 mb-8 max-w-2xl mx-auto">
            Optimize your Docker workflow with DockerGen - now completely free to use!
          </p>
        </section>

        <section className="max-w-4xl mx-auto">
          <Card className="bg-black/40 backdrop-blur-xl border border-pink-500/20 shadow-2xl shadow-pink-500/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-500/5"></div>
            <CardHeader className="relative text-center">
              <CardTitle className="text-3xl font-bold text-gray-100">Free Plan</CardTitle>
              <CardDescription className="text-2xl font-semibold text-gray-300">$0 / month</CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <ul className="space-y-4 mb-8">
                <FeatureItem icon={<FileCode />} feature="Unlimited Dockerfile Generation" />
                <FeatureItem icon={<Github />} feature="GitHub Integration" />
                <FeatureItem icon={<Zap />} feature="Image Size Optimization" />
                <FeatureItem icon={<Check />} feature="Best Practices Implementation" />
                <FeatureItem icon={<Check />} feature="Instant Preview" />
                <FeatureItem icon={<X />} feature="Priority Support" available={false} />
                <FeatureItem icon={<X />} feature="Custom Integrations" available={false} />
              </ul>
            </CardContent>
            <CardFooter className="relative">
              <Button 
                className="w-full text-lg py-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-0 rounded-xl font-medium shadow-lg shadow-pink-500/25 transition-all duration-300" 
                onClick={() => {
                  router.push("/")
                }}
              >
                Get Started Now
              </Button>
            </CardFooter>
          </Card>
        </section>

        <section className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <FAQItem 
              question="Is it really free?" 
              answer="Yes, DockerGen is completely free to use. We believe in providing value to the developer community and making Docker optimization accessible to everyone."
            />
            <FAQItem 
              question="Are there any usage limits?" 
              answer="There are no strict limits on usage. However, we kindly ask users to be considerate and not abuse the service to ensure its availability for everyone."
            />
            <FAQItem 
              question="Do you offer premium features?" 
              answer="Currently, all our features are available for free. We may introduce premium features in the future, but our core functionality will always remain free."
            />
            <FAQItem 
              question="How do you make money?" 
              answer="We're currently focused on providing value and growing our user base. In the future, we may introduce optional paid features or enterprise solutions."
            />
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 py-12 mt-24 border-t border-pink-500/20">
        <div className="mt-12 text-center text-gray-400">
          <p>&copy; 2024 DockerGen by DeployLite. All rights reserved. Made with ❤️ by Basir Khan.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureItem({ icon, feature, available = true }: any) {
  return (
    <li className={`flex items-center space-x-3 ${available ? 'text-gray-300' : 'text-gray-500'}`}>
      <span className={`flex-shrink-0 w-5 h-5 ${available ? 'text-green-400' : 'text-red-400'}`}>
        {icon}
      </span>
      <span>{feature}</span>
    </li>
  )
}

function FAQItem({ question, answer }: any) {
  return (
    <Card className="text-left bg-black/40 backdrop-blur-sm border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="font-semibold text-gray-200 text-lg">{question}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-gray-400">{answer}</p>
      </CardContent>
    </Card>
  )
}