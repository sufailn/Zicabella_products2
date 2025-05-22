"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface SearchSortProps {
  onFilterClick?: () => void
}

export function SearchSort({ onFilterClick }: SearchSortProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")

  // Update search params when search or sort changes
  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)
    return params.toString()
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm) {
      router.push(`${pathname}?${createQueryString("search", searchTerm)}`)
    } else {
      // Remove search param if search is empty
      const params = new URLSearchParams(searchParams.toString())
      params.delete("search")
      router.push(`${pathname}?${params.toString()}`)
    }
  }

  const handleSort = (value: string) => {
    router.push(`${pathname}?${createQueryString("sort", value)}`)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
      <form onSubmit={handleSearch} className="relative w-full sm:w-auto flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="search"
          placeholder="Search products..."
          className="pl-10 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      <div className="flex gap-2 w-full sm:w-auto">
        <div className="w-full sm:w-48">
          <Select defaultValue={searchParams.get("sort") || ""} onValueChange={handleSort}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low-high">Price: Low to High</SelectItem>
              <SelectItem value="price-high-low">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" size="icon" className="md:hidden" onClick={onFilterClick}>
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
