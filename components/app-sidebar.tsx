"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight, Home, ShoppingBag, Heart, Tag, Shirt, PinIcon as PantsIcon } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

export function AppSidebar() {
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
      icon: Shirt,
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
      icon: PantsIcon,
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
      icon: Tag,
      subcategories: [
        { name: "Half Pants", slug: "half-pants" },
        { name: "Full Pants", slug: "full-pants" },
      ],
    },
  ]

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="border-b">
        <Link href="/" className="flex items-center px-4 py-3">
          <span className="text-xl font-bold">Zica Bella</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/"}>
                <Link href="/">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/bestsellers"}>
                <Link href="/bestsellers">
                  <ShoppingBag className="h-4 w-4" />
                  <span>Bestsellers</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <Collapsible
                  key={category.slug}
                  open={expandedCategories[category.slug]}
                  onOpenChange={() => toggleCategory(category.slug)}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        isActive={pathname === `/category/${category.slug}`}
                        className="justify-between"
                      >
                        <div className="flex items-center">
                          <category.icon className="h-4 w-4 mr-2" />
                          <span>{category.name}</span>
                        </div>
                        {expandedCategories[category.slug] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {category.subcategories.map((subcategory) => (
                          <SidebarMenuSubItem key={subcategory.slug}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname === `/category/${category.slug}/${subcategory.slug}`}
                            >
                              <Link href={`/category/${category.slug}/${subcategory.slug}`}>{subcategory.name}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Price Range</SidebarGroupLabel>
          <SidebarGroupContent className="px-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">₹0</span>
                <span className="text-sm">₹5000</span>
              </div>
              <input type="range" min="0" max="5000" step="100" defaultValue="5000" className="w-full accent-primary" />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Size</SidebarGroupLabel>
          <SidebarGroupContent className="px-4">
            <div className="grid grid-cols-4 gap-2">
              {["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"].map((size) => (
                <button
                  key={size}
                  className={cn(
                    "h-8 w-full rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                    "text-sm font-medium",
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex flex-col space-y-2">
          <Link
            href="/wishlist"
            className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Heart className="h-4 w-4" />
            <span>My Wishlist</span>
          </Link>
          <Link
            href="/orders"
            className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>My Orders</span>
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
