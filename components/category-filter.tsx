"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CategoryFilterProps {
  currentCategory?: string
  currentSubCategory?: string
}

export function CategoryFilter({ currentCategory, currentSubCategory }: CategoryFilterProps) {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    topwear: currentCategory === "topwear",
    bottomwear: currentCategory === "bottomwear",
    "co-ord-sets": currentCategory === "co-ord-sets",
  })

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const categories = [
    {
      name: "Topwear",
      slug: "topwear",
      subcategories: [
        { name: "New Arrivals", slug: "new-arrivals" },
        { name: "Oversized Half Sleeves", slug: "oversized-half-sleeves" },
        { name: "Oversized Full Sleeves", slug: "oversized-full-sleeves" },
        { name: "Street Wear", slug: "street-wear" },
        { name: "Polo T-Shirts", slug: "polo-t-shirts" },
        { name: "All Shirts", slug: "all-shirts" },
      ],
    },
    {
      name: "Bottomwear",
      slug: "bottomwear",
      subcategories: [
        { name: "New Arrivals", slug: "new-arrivals" },
        { name: "Joggers", slug: "joggers" },
        { name: "Jeans", slug: "jeans" },
        { name: "Shorts", slug: "shorts" },
        { name: "Jorts", slug: "jorts" },
      ],
    },
    {
      name: "Co-ord Sets",
      slug: "co-ord-sets",
      subcategories: [
        { name: "Half Pants", slug: "half-pants" },
        { name: "Full Pants", slug: "full-pants" },
      ],
    },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-4">
      <h2 className="font-semibold text-lg mb-4">Categories</h2>

      <div className="space-y-1">
        <Link
          href="/bestsellers"
          className={cn(
            "block py-2 px-3 rounded-md hover:bg-gray-100 transition-colors",
            currentCategory === "bestsellers" && "bg-gray-100 font-medium",
          )}
        >
          Bestsellers
        </Link>

        {categories.map((category) => (
          <div key={category.slug} className="space-y-1">
            <div className="flex items-center justify-between">
              <Link
                href={`/category/${category.slug}`}
                className={cn(
                  "block py-2 px-3 rounded-md hover:bg-gray-100 transition-colors flex-grow",
                  currentCategory === category.slug && !currentSubCategory && "bg-gray-100 font-medium",
                )}
              >
                {category.name}
              </Link>
              <button onClick={() => toggleCategory(category.slug)} className="p-2 text-gray-500 hover:text-gray-900">
                {expandedCategories[category.slug] ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            </div>

            {expandedCategories[category.slug] && (
              <div className="ml-4 space-y-1 border-l border-gray-200 pl-2">
                {category.subcategories.map((subcategory) => (
                  <Link
                    key={subcategory.slug}
                    href={`/category/${category.slug}/${subcategory.slug}`}
                    className={cn(
                      "block py-1.5 px-3 rounded-md hover:bg-gray-100 transition-colors text-sm",
                      currentCategory === category.slug &&
                        currentSubCategory === subcategory.slug &&
                        "bg-gray-100 font-medium",
                    )}
                  >
                    {subcategory.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
