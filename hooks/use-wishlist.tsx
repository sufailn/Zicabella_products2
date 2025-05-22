"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/lib/types"

interface WishlistContextType {
  wishlist: Product[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: number) => void
  clearWishlist: () => void
  isInWishlist: (productId: number) => boolean
  totalItems: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([])
  const [loaded, setLoaded] = useState(false)

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("zica-bella-wishlist")
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist))
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error)
      }
    }
    setLoaded(true)
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    // Only save to localStorage if the wishlist has been loaded and changed
    if (loaded && wishlist.length > 0) {
      const wishlistString = JSON.stringify(wishlist)
      localStorage.setItem("zica-bella-wishlist", wishlistString)
    } else if (loaded && wishlist.length === 0 && localStorage.getItem("zica-bella-wishlist")) {
      // Clear localStorage if wishlist is empty
      localStorage.removeItem("zica-bella-wishlist")
    }
  }, [wishlist, loaded])

  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      // Only add if not already in wishlist
      if (!prevWishlist.some((item) => item.id === product.id)) {
        return [...prevWishlist, product]
      }
      return prevWishlist
    })
  }

  const removeFromWishlist = (productId: number) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId))
  }

  const clearWishlist = () => {
    setWishlist([])
  }

  const isInWishlist = (productId: number) => {
    return wishlist.some((item) => item.id === productId)
  }

  const totalItems = wishlist.length

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        totalItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
