"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, X } from "lucide-react"
import { ModeToggle } from "./mode-toggle"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is logged in
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true")
  }, [pathname])

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              MovieReviews
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:justify-between md:flex-1 mx-4">
            <nav className="flex items-center space-x-4 ml-6">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Home
              </Link>
              <Link
                href="/top-rated"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/top-rated" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Top Rated
              </Link>
              <Link
                href="/upcoming"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/upcoming" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Upcoming
              </Link>
              <Link
                href="/genres"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/genres" || pathname.startsWith("/genres/") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Genres
              </Link>
            </nav>

            <div className="relative w-full max-w-sm mx-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search movies..." className="w-full pl-8" />
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />

            {isLoggedIn ? (
              <Link href="/account">
                <Button variant="ghost">My Account</Button>
              </Link>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/create-account">
                  <Button>Create Account</Button>
                </Link>
              </>
            )}
          </div>

          <div className="flex md:hidden">
            <ModeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="ml-2">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/top-rated"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
              onClick={() => setIsMenuOpen(false)}
            >
              Top Rated
            </Link>
            <Link
              href="/upcoming"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
              onClick={() => setIsMenuOpen(false)}
            >
              Upcoming
            </Link>
            <Link
              href="/genres"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
              onClick={() => setIsMenuOpen(false)}
            >
              Genres
            </Link>

            <div className="relative px-3 py-2">
              <Search className="absolute left-5 top-5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search movies..." className="w-full pl-8" />
            </div>

            {isLoggedIn ? (
              <Link
                href="/account"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                My Account
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/create-account"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

