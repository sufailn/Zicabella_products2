"use client"

import { useParams } from "next/navigation"
import { useMemo, useState } from "react"
import ProductGrid from "@/components/product-grid"
import { SearchSort } from "@/components/search-sort"
import { products } from "@/data/products"
import { CategoryMenu } from "@/components/category-menu"

export default function SubCategoryPage() {
  const params = useParams()
  const category = params.category as string
  const subcategory = params.subcategory as string
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = useMemo(() => {
    if (!category || !subcategory) return []
    return products.filter(
      (product) =>
        product.category.toLowerCase() === category.toLowerCase() &&
        product.subCategory.toLowerCase().replace(/\s+/g, "-") === subcategory.toLowerCase(),
    )
  }, [category, subcategory])

  const formattedSubcategory = subcategory
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{formattedSubcategory}</h1>
      <p className="text-muted-foreground mb-8">{category.charAt(0).toUpperCase() + category.slice(1)} Collection</p>

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
