import { useProducts } from '@/features/product-listing/hooks/use-products'
import { useInfiniteScroll } from '@/features/product-listing/hooks/use-infinite-scroll'
import ProductFilters from '@/features/product-listing/components/product-filters'
import ProductCard from '@/features/product-listing/components/product-card'

function ProductListing() {
  const {
    products,
    categories,
    loading,
    loadingMore,
    error,
    hasMore,
    category,
    setCategory,
    setQuery,
    loadMore,
  } = useProducts()

  const sentinelRef = useInfiniteScroll(loadMore, { disabled: !hasMore || loading })

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold text-slate-900">Products</h1>
      <ProductFilters
        categories={categories}
        category={category}
        onCategoryChange={setCategory}
        onSearch={setQuery}
      />
      {error ? (
        <p className="py-8 text-center text-sm text-red-500">{error}</p>
      ) : loading ? (
        <p className="py-8 text-center text-sm text-slate-400">Loading products…</p>
      ) : products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {hasMore && (
            <div ref={sentinelRef} className="py-4 text-center text-sm text-slate-400">
              {loadingMore ? 'Loading more…' : ''}
            </div>
          )}
        </>
      ) : (
        <p className="py-8 text-center text-sm text-slate-400">No products found.</p>
      )}
    </div>
  )
}

export default ProductListing
