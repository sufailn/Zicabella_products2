"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"
import { Heart, ShoppingCart, Plus, Minus, EyeIcon as Eye3d } from "lucide-react"
import type { Product } from "@/lib/types"
import { cn } from "@/lib/utils"

interface QuickViewDialogProps {
  product: Product
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function QuickViewDialog({ product, open, onOpenChange }: QuickViewDialogProps) {
  const { addToCart, isInCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [view3D, setView3D] = useState(false)

  const inWishlist = isInWishlist(product.id)

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  const productUrl = `/product/${product.id}`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-square md:aspect-auto md:h-full">
            {view3D ? (
              <div className="h-full w-full bg-black flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-4">
                    <Eye3d className="h-12 w-12 mx-auto text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">3D View Loading...</p>
                </div>
              </div>
            ) : (
              <Image
                src={product.image || "/placeholder.svg?height=500&width=500"}
                alt={product.name}
                fill
                className="object-cover"
              />
            )}

            <Button
              variant="outline"
              size="sm"
              className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm"
              onClick={() => setView3D(!view3D)}
            >
              <Eye3d className="h-4 w-4 mr-2" />
              {view3D ? "View Image" : "View 3D"}
            </Button>
          </div>

          <div className="p-6 flex flex-col">
            <DialogTitle className="text-2xl font-bold mb-1">{product.name}</DialogTitle>
            <div className="text-sm text-muted-foreground mb-4">
              {product.category} • {product.subCategory}
            </div>

            <div className="text-xl font-bold mb-6">₹{product.price}</div>

            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">
                A trendy {product.name.toLowerCase()} with a modern design, perfect for casual streetwear looks. Made
                with premium materials for comfort and durability.
              </p>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Size</h4>
              <div className="flex gap-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className="w-10 h-10"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Quantity</h4>
              <div className="flex items-center">
                <Button variant="outline" size="icon" onClick={decrementQuantity}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={incrementQuantity}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-4 mt-auto">
              <Button
                className="flex-1"
                onClick={() => {
                  addToCart({ ...product, quantity })
                  onOpenChange(false)
                }}
                disabled={!selectedSize}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={handleWishlistToggle}
                className={cn(inWishlist && "text-red-500")}
              >
                <Heart className={cn("h-5 w-5", inWishlist && "fill-red-500")} />
              </Button>
            </div>

            <div className="mt-4 text-center">
              <Link
                href={productUrl}
                className="text-sm text-primary hover:underline"
                onClick={() => onOpenChange(false)}
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
