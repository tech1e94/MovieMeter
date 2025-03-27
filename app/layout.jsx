import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "MovieMeter | Discover and Review Movies",
  description: "Browse and review the latest movies with MovieMeter",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
          <footer className="border-t py-6 mt-8">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} MovieMeter. All rights reserved.
            </div>
            <div className="mt-4 flex flex-col items-center">
              <h2 className="text-lg font-bold text-gray-300">Our Team</h2>
              <div className="mt-2 flex flex-col items-center gap-2">
                <p className="text-gray-400 hover:text-white transition">Mohammed Tahir Shaikh - <span className="text-blue-400">23BAI1277</span></p>
                <p className="text-gray-400 hover:text-white transition">Ilankathir B K- <span className="text-blue-400">23BRS1390</span></p>
                <p className="text-gray-400 hover:text-white transition">Armaan Rashid Pathan - <span className="text-blue-400">23BAI1084</span></p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'