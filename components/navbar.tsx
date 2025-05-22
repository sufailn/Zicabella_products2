"use client"

import Link from "next/link"
import { CartDrawer } from "@/components/cart-drawer"
import { WishlistDrawer } from "@/components/wishlist-drawer"
import { Search, Sun, Moon, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useTheme } from "next-themes"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CategoryMenu } from "@/components/category-menu"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-md">
              <div className="mt-6">
          <CategoryMenu />
              </div>
            </SheetContent>
          </Sheet>

            <Link
              href="/"
              className=""
            >
              <img
                src="/icon/icon.png"
                alt="Zica Bella Logo"
                className="h-auto w-auto md:h-10"
                
              />
            </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/category/topwear" className="text-sm font-medium hover:text-primary">
            Topwear
          </Link>
          <Link href="/category/bottomwear" className="text-sm font-medium hover:text-primary">
            Bottomwear
          </Link>
          <Link href="/category/co-ord-sets" className="text-sm font-medium hover:text-primary">
            Co-ord Sets
          </Link>
          <Link href="/bestsellers" className="text-sm font-medium hover:text-primary">
            Bestsellers
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {/* <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button> */}
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <WishlistDrawer />
          <CartDrawer />
        </div>
      </div>
    </header>
  )
}
