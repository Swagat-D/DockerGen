"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { 
  FileCode2, 
  Github, 
  Menu, 
  Sun, 
  Moon, 
  UserIcon, 
  LogOutIcon,
  ExternalLink,
  Sparkles
} from 'lucide-react'

interface NavbarProps {
  isSignedIn?: boolean
  user?: { name: string; avatar: string } | null
  onSignIn?: () => void
  onSignOut?: () => void
}

export default function Navbar({ isSignedIn = false, user = null, onSignIn, onSignOut }: NavbarProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const NavItems = ({ isMobile = false, onItemClick }: { isMobile?: boolean; onItemClick?: () => void }) => (
    <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'items-center space-x-6'}`}>
      <Link href="/" onClick={onItemClick}>
        <Button 
          variant="ghost" 
          className={`${isMobile ? 'justify-start w-full h-12' : 'h-10'} text-gray-300 hover:text-pink-300 hover:bg-pink-500/10 transition-all duration-300 rounded-xl`}
        >
          <span className={`${isMobile ? 'text-base' : 'text-sm'} font-medium`}>Home</span>
        </Button>
      </Link>
      
      <Link href="/features" onClick={onItemClick}>
        <Button 
          variant="ghost" 
          className={`${isMobile ? 'justify-start w-full h-12' : 'h-10'} text-gray-300 hover:text-pink-300 hover:bg-pink-500/10 transition-all duration-300 rounded-xl`}
        >
          <span className={`${isMobile ? 'text-base' : 'text-sm'} font-medium`}>Features</span>
        </Button>
      </Link>
      
      <Link href="/pricing" onClick={onItemClick}>
        <Button 
          variant="ghost" 
          className={`${isMobile ? 'justify-start w-full h-12' : 'h-10'} text-gray-300 hover:text-pink-300 hover:bg-pink-500/10 transition-all duration-300 rounded-xl`}
        >
          <span className={`${isMobile ? 'text-base' : 'text-sm'} font-medium`}>Pricing</span>
        </Button>
      </Link>
      
      <Link href="https://basirblog.hashnode.dev/dockerfile-generation-made-easy-build-download-and-commit-with-dockergen" target="_blank" onClick={onItemClick}>
        <Button 
          variant="ghost" 
          className={`${isMobile ? 'justify-start w-full h-12' : 'h-10'} text-gray-300 hover:text-pink-300 hover:bg-pink-500/10 transition-all duration-300 rounded-xl group`}
        >
          <span className={`${isMobile ? 'text-base' : 'text-sm'} font-medium`}>Docs</span>
          <ExternalLink className={`${isMobile ? 'ml-2 h-4 w-4' : 'ml-1 h-3 w-3'} opacity-0 group-hover:opacity-100 transition-all duration-300`} />
        </Button>
      </Link>
    </div>
  )

  if (!mounted) {
    return null
  }

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-pink-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <FileCode2 className="h-8 w-8 text-pink-400 transition-all duration-300 group-hover:text-pink-300" />
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </div>
            <div className="ml-3">
              <span className="font-bold text-xl bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                DockerGen
              </span>
              <div className="flex items-center mt-[-2px]">
                <span className="text-xs text-gray-400 font-medium">by DeployLite</span>
                <Sparkles className="ml-1 h-3 w-3 text-pink-400/60" />
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavItems />
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Auth Button/Avatar */}
            {isSignedIn && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer h-10 w-10 ring-2 ring-pink-500/30 hover:ring-pink-500/50 transition-all duration-300">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white font-semibold">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-black/95 backdrop-blur-xl border-pink-500/20">
                  <DropdownMenuLabel className="text-gray-200">
                    <div className="flex flex-col space-y-1">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-xs text-gray-400 font-normal">Signed in with GitHub</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-pink-500/20" />
                  <DropdownMenuItem 
                    onClick={onSignOut}
                    className="hover:bg-red-500/10 hover:text-red-300 transition-all duration-300"
                  >
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={onSignIn}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-0 rounded-xl font-medium shadow-lg shadow-pink-500/25 transition-all duration-300 h-10"
              >
                <Github className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden h-10 w-10 rounded-xl hover:bg-pink-500/10 hover:text-pink-300 transition-all duration-300"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-80 bg-gradient-to-b from-black via-gray-900/95 to-black backdrop-blur-xl border-pink-500/20">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <div className="flex items-center">
                      <FileCode2 className="h-8 w-8 text-pink-400 mr-3" />
                      <div>
                        <span className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                          DockerGen
                        </span>
                        <div className="flex items-center mt-[-2px]">
                          <span className="text-xs text-gray-400 font-medium">by DeployLite</span>
                          <Sparkles className="ml-1 h-3 w-3 text-pink-400/60" />
                        </div>
                      </div>
                    </div>
                  </SheetTitle>
                  <SheetDescription className="text-gray-400 text-left">
                    Generate optimized Dockerfiles with ease
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-8 space-y-6">
                  <NavItems isMobile={true} onItemClick={() => {}} />
                  
                  {/* Mobile Auth Section */}
                  {isSignedIn && user ? (
                    <div className="pt-6 border-t border-pink-500/20">
                      <div className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20">
                        <Avatar className="h-12 w-12 ring-2 ring-pink-500/30">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-base font-medium text-gray-200">{user.name}</p>
                          <p className="text-sm text-gray-400">Signed in with GitHub</p>
                        </div>
                      </div>
                      <Button 
                        onClick={onSignOut}
                        variant="ghost"
                        className="w-full mt-4 justify-start h-12 text-red-300 hover:text-red-200 hover:bg-red-500/10 transition-all duration-300 rounded-xl"
                      >
                        <LogOutIcon className="mr-2 h-4 w-4" />
                        Sign out
                      </Button>
                    </div>
                  ) : (
                    <div className="pt-6 border-t border-pink-500/20">
                      <Button 
                        onClick={onSignIn}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-0 rounded-xl font-medium shadow-lg shadow-pink-500/25 transition-all duration-300 h-12"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Sign In with GitHub
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}