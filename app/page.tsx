import { FeaturedCollection } from "@/components/featured-collection"
import ProductGrid from "@/components/product-grid"
import { products } from "@/data/products"

export default function Home() {
  const featuredProducts = products.filter((product) => product.isBestSeller).slice(0, 4)

  return (
    <div className="space-y-12">
      <FeaturedCollection products={featuredProducts} />

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">New Arrivals</h2>
          <a href="/category/new-arrivals" className="text-sm font-medium text-primary hover:underline">
            View All
          </a>
        </div>
        <ProductGrid products={products.slice(0, 6)} />
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Bestsellers</h2>
          <a href="/bestsellers" className="text-sm font-medium text-primary hover:underline">
            View All
          </a>
        </div>
        <ProductGrid products={products.filter((p) => p.isBestSeller).slice(0, 6)} />
      </section>
    </div>
  )
}
