"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Heart, ShoppingCart, Plus, Minus, EyeIcon as Eye3d, ChevronLeft, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"
import { ProductView3D } from "@/components/product-view-3d"
import ProductGrid from "@/components/product-grid"
import { products } from "@/data/products"
import { cn } from "@/lib/utils"

export default function ProductPage() {
  const params = useParams()
  const productId = Number(params.id)

  const product = products.find((p) => p.id === productId)

  if (!product) {
    notFound()
  }

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

  // Get related products from the same category
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to products
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        <div className="relative">
          {view3D ? (
            <div className="aspect-square w-full">
              <ProductView3D />
            </div>
          ) : (
            <div className="relative aspect-square overflow-hidden rounded-lg border border-border">
              <Image
                src={product.image || "/placeholder.svg?height=600&width=600"}
                alt={product.name}
                fill
                className="object-cover"
              />

              {product.isBestSeller && (
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded z-10">
                  Bestseller
                </div>
              )}
            </div>
          )}

          <div className="mt-4 flex justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className={cn(view3D && "border-primary text-primary")}
                onClick={() => setView3D(!view3D)}
              >
                <Eye3d className="h-4 w-4 mr-2" />
                {view3D ? "View Image" : "View 3D"}
              </Button>
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <span className="ml-2">24 reviews</span>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="text-sm text-muted-foreground mb-4">
            {product.category} • {product.subCategory}
          </div>

          <div className="text-2xl font-bold mb-6">₹{product.price}</div>

          <div className="mb-8">
            <h2 className="text-lg font-medium mb-2">Description</h2>
            <p className="text-muted-foreground">
              A trendy {product.name.toLowerCase()} with a modern graphic print, perfect for casual streetwear looks.
              Made with premium materials for comfort and durability. This versatile piece can be styled in multiple
              ways for different occasions.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Size</h2>
            <div className="flex gap-2">
              {["S", "M", "L", "XL"].map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  onClick={() => setSelectedSize(size)}
                  className="w-12 h-12"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium mb-2">Quantity</h2>
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

          <div className="flex gap-4">
            <Button
              className="flex-1"
              size="lg"
              onClick={() => addToCart({ ...product, quantity })}
              disabled={!selectedSize}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>

            <Button variant="outline" size="icon" className="h-12 w-12" onClick={handleWishlistToggle}>
              <Heart className={cn("h-5 w-5", inWishlist && "fill-red-500 text-red-500")} />
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="details" className="mb-16">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
          <TabsTrigger
            value="details"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
          >
            Product Details
          </TabsTrigger>
          <TabsTrigger
            value="sizing"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
          >
            Size & Fit
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary py-3"
          >
            Reviews (24)
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Features</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Premium quality fabric</li>
                <li>Oversized fit for comfort</li>
                <li>Unique graphic print</li>
                <li>Ribbed collar</li>
                <li>Machine washable</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Material & Care</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>100% Cotton</p>
                <p>Machine wash cold with similar colors</p>
                <p>Do not bleach</p>
                <p>Tumble dry low</p>
                <p>Iron on low heat if needed</p>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="sizing" className="pt-6">
          <div className="max-w-2xl">
            <h3 className="text-lg font-medium mb-4">Size Guide</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="p-3 text-left font-medium">Size</th>
                    <th className="p-3 text-left font-medium">Chest (in)</th>
                    <th className="p-3 text-left font-medium">Length (in)</th>
                    <th className="p-3 text-left font-medium">Sleeve (in)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-3">S</td>
                    <td className="p-3">38-40</td>
                    <td className="p-3">27</td>
                    <td className="p-3">8</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">M</td>
                    <td className="p-3">40-42</td>
                    <td className="p-3">28</td>
                    <td className="p-3">8.5</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">L</td>
                    <td className="p-3">42-44</td>
                    <td className="p-3">29</td>
                    <td className="p-3">9</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">XL</td>
                    <td className="p-3">44-46</td>
                    <td className="p-3">30</td>
                    <td className="p-3">9.5</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Measurements may vary slightly. This is an oversized fit, consider sizing down for a more fitted look.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="pt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Customer Reviews</h3>
              <Button>Write a Review</Button>
            </div>

            <div className="space-y-6">
              {[1, 2, 3].map((review) => (
                <div key={review} className="border-b pb-6">
                  <div className="flex justify-between mb-2">
                    <div className="font-medium">John D.</div>
                    <div className="text-sm text-muted-foreground">2 weeks ago</div>
                  </div>
                  <div className="flex mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    Great quality and fit! The material is soft and comfortable. I've received many compliments when
                    wearing this. Would definitely recommend.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <ProductGrid products={relatedProducts} />
      </section>
    </div>
  )
}
