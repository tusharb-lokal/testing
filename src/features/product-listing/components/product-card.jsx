function ProductCard({ product }) {
  const { title, description, price, rating, thumbnail, brand, discountPercentage } = product
  const hasDiscount = discountPercentage > 0
  const discountedPrice = hasDiscount ? price - (price * discountPercentage) / 100 : price

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <img src={thumbnail} alt={title} className="h-40 w-full object-cover" />
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-indigo-600">{brand}</span>
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
        <p className="line-clamp-2 text-xs text-slate-500">{description}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-slate-900">${discountedPrice.toFixed(2)}</span>
            {hasDiscount && (
              <span className="text-xs text-slate-400 line-through">${price.toFixed(2)}</span>
            )}
          </div>
          <span className="flex items-center gap-1 text-xs text-slate-500">★ {rating}</span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
