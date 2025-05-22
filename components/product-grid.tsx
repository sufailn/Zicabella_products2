"use client"

import { useMemo } from "react"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/types"
import { products as allProducts } from "@/data/products"
import { useSearchParams } from "next/navigation"

interface ProductGridProps {
  products?: Product[]
}

export default function ProductGrid({ products = allProducts }: ProductGridProps) {
  const searchParams = useSearchParams()

  // Replace the useEffect with useMemo
  const displayProducts = useMemo(() => {
    // Create a stable copy of the products array
    let filtered = [...products]

    // Apply search filter if present
    const search = searchParams.get("search")
    if (search) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase()) ||
          product.subCategory.toLowerCase().includes(search.toLowerCase()),
      )
    }

    // Apply sort if present
    const sort = searchParams.get("sort")
    if (sort) {
      switch (sort) {
        case "price-low-high":
          filtered = [...filtered].sort((a, b) => a.price - b.price)
          break
        case "price-high-low":
          filtered = [...filtered].sort((a, b) => b.price - a.price)
          break
        case "newest":
          // Assuming newer products have higher IDs
          filtered = [...filtered].sort((a, b) => b.id - a.id)
          break
      }
    }

    return filtered
  }, [searchParams, products])

  if (displayProducts.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-xl font-medium">No products found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your filters or search terms</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {displayProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
