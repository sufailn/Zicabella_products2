"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/types"

interface FeaturedCollectionProps {
  products: Product[]
}

export function FeaturedCollection({ products }: FeaturedCollectionProps) {
  const [activeTab, setActiveTab] = useState("All")

  const categories = ["All", "Clothing", "Outerwear", "Bottoms", "Knitwear", "Accessories"]

  const filteredProducts =
    activeTab === "All"
      ? products
      : products.filter((product) => {
          if (activeTab === "Clothing") return product.category === "Topwear"
          if (activeTab === "Outerwear") return product.subCategory.includes("Full Sleeves")
          if (activeTab === "Bottoms") return product.category === "Bottomwear"
          if (activeTab === "Knitwear") return product.category === "Co-ord Sets"
          return false
        })

  return (
    <section className="relative">
  <div
    className="flex flex-col justify-center items-center text-center mb-8 rounded-lg w-full"
    style={{
      backgroundImage: "url('/icon/banner.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "200px",
      height: "35vw",
      maxHeight: "380px",
    }}
  >
    {/* <h1 className="text-2xl md:text-4xl text-white font-bold mb-3">Featured Collection</h1>
    <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
      Explore our latest arrivals with immersive 3D views and detailed fabric inspection.
    </p> */}
  </div>

      <div className="flex justify-center mb-8">
        <div className="flex gap-2 overflow-x-auto p-1">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeTab === category ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setActiveTab(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
