"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function CategoryMenu() {
  const pathname = usePathname()
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    topwear: true,
    bottomwear: false,
    "co-ord-sets": false,
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
    <div className="space-y-4">
      <h2 className="font-semibold text-lg mb-4">Categories</h2>

      <div className="space-y-1">
        <Link
          href="/bestsellers"
          className={cn(
            "block py-2 px-3 rounded-md hover:bg-accent transition-colors",
            pathname === "/bestsellers" && "bg-accent font-medium",
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
                  "block py-2 px-3 rounded-md hover:bg-accent transition-colors flex-grow",
                  pathname === `/category/${category.slug}` && "bg-accent font-medium",
                )}
              >
                {category.name}
              </Link>
              <button
                onClick={() => toggleCategory(category.slug)}
                className="p-2 text-muted-foreground hover:text-foreground"
              >
                {expandedCategories[category.slug] ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            </div>

            {expandedCategories[category.slug] && (
              <div className="ml-4 space-y-1 border-l border-border pl-2">
                {category.subcategories.map((subcategory) => (
                  <Link
                    key={subcategory.slug}
                    href={`/category/${category.slug}/${subcategory.slug}`}
                    className={cn(
                      "block py-1.5 px-3 rounded-md hover:bg-accent transition-colors text-sm",
                      pathname === `/category/${category.slug}/${subcategory.slug}` && "bg-accent font-medium",
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
