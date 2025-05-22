"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"
import { QuickViewDialog } from "@/components/quick-view-dialog"
import type { Product } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isInCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [isHovered, setIsHovered] = useState(false)
  const [inWishlist, setInWishlist] = useState(isInWishlist(product.id))
  const [quickViewOpen, setQuickViewOpen] = useState(false)

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
    setInWishlist(!inWishlist)
  }

  const formattedSubCategory = product.subCategory.toLowerCase().replace(/\s+/g, "-")
  const productUrl = `/product/${product.id}`

  return (
    <>
      <div
        className="group relative rounded-lg overflow-hidden border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <Link href={productUrl}>
            <Image
              src={product.image || "/placeholder.svg?height=400&width=300"}
              alt={product.name}
              fill
              className={cn("object-cover transition-transform duration-500", isHovered ? "scale-110" : "scale-100")}
            />
          </Link>

          {/* Quick View button */}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity",
              isHovered ? "opacity-100" : "opacity-0",
            )}
          >
            <Button
              variant="secondary"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setQuickViewOpen(true)}
            >
              <Eye className="h-4 w-4" />
              Quick View
            </Button>
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 p-2 rounded-full bg-background/80 backdrop-blur-sm shadow-sm z-10"
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-colors",
                inWishlist ? "fill-red-500 text-red-500" : "text-muted-foreground",
              )}
            />
          </button>

          {/* Best seller badge */}
          {product.isBestSeller && (
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded z-10">
              Bestseller
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="text-xs text-muted-foreground mb-1">
            {product.category} • {product.subCategory}
          </div>
          <h3 className="font-medium text-foreground mb-1">{product.name}</h3>
          <div className="flex items-center justify-between">
            <p className="font-semibold">₹{product.price}</p>
            <Button
              onClick={() => addToCart(product)}
              size="sm"
              variant="ghost"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <QuickViewDialog product={product} open={quickViewOpen} onOpenChange={setQuickViewOpen} />
    </>
  )
}
