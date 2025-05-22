"use client"

import { useParams } from "next/navigation"
import { useMemo, useState } from "react"
import ProductGrid from "@/components/product-grid"
import { SearchSort } from "@/components/search-sort"
import { products } from "@/data/products"
import { CategoryMenu } from "@/components/category-menu"

export default function CategoryPage() {
  const params = useParams()
  const category = params.category as string
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = useMemo(() => {
    if (!category) return []
    return products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
  }, [category])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      <p className="text-muted-foreground mb-8">Find your perfect style</p>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4 hidden md:block">
          <div className="bg-card rounded-lg border border-border p-4 sticky top-20">
            <CategoryMenu />
          </div>
        </div>
        <div className="w-full md:w-3/4">
          <SearchSort onFilterClick={() => setShowFilters(!showFilters)} />
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  )
}
