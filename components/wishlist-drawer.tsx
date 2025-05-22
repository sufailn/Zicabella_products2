"use client"

import { Heart, X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useWishlist } from "@/hooks/use-wishlist"
import { useCart } from "@/hooks/use-cart"
import Image from "next/image"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

export function WishlistDrawer() {
  const { wishlist, removeFromWishlist, totalItems } = useWishlist()
  const { addToCart, isInCart } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Heart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <Heart className="mr-2 h-5 w-5" />
            Your Wishlist ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {wishlist.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <Heart className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium">Your wishlist is empty</h3>
            <p className="text-gray-500 text-center mt-1">
              Save items you love for later by clicking the heart icon on products.
            </p>
            <Button className="mt-6" onClick={() => setOpen(false)}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto py-4">
              <div className="space-y-4">
                {wishlist.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-4">
                    <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={item.image || "/placeholder.svg?height=80&width=64"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium">{item.name}</h4>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="text-xs text-gray-500">
                        {item.category} • {item.subCategory}
                      </p>

                      <div className="mt-auto flex items-center justify-between">
                        <p className="font-medium">₹{item.price}</p>
                        <Button
                          size="sm"
                          variant={isInCart(item.id) ? "outline" : "default"}
                          onClick={() => {
                            addToCart(item)
                            if (!isInCart(item.id)) {
                              removeFromWishlist(item.id)
                            }
                          }}
                          className="text-xs h-8"
                        >
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          {isInCart(item.id) ? "In Cart" : "Add to Cart"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <Button variant="outline" className="w-full" onClick={() => setOpen(false)}>
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
