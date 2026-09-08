import { useMemo, useState } from 'react'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { fetchCategories, fetchProducts } from '@/features/product-listing/services/products'

const PAGE_SIZE = 12

export function useProducts() {
  const [category, setCategory] = useState('')
  const [query, setQuery] = useState('')

  const categoriesQuery = useQuery({
    queryKey: ['products', 'categories'],
    queryFn: fetchCategories,
  })

  const productsQuery = useInfiniteQuery({
    queryKey: ['products', 'list', { category, query }],
    queryFn: ({ pageParam }) =>
      fetchProducts({ category, query, skip: pageParam, limit: PAGE_SIZE }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const loaded = pages.reduce((sum, page) => sum + page.products.length, 0)
      return loaded < lastPage.total ? loaded : undefined
    },
  })

  const products = useMemo(
    () => productsQuery.data?.pages.flatMap((page) => page.products) ?? [],
    [productsQuery.data],
  )

  return {
    products,
    categories: categoriesQuery.data ?? [],
    loading: productsQuery.isFetching && !productsQuery.isFetchingNextPage,
    loadingMore: productsQuery.isFetchingNextPage,
    error: productsQuery.error?.message ?? null,
    hasMore: Boolean(productsQuery.hasNextPage),
    category,
    setCategory,
    query,
    setQuery,
    loadMore: productsQuery.fetchNextPage,
  }
}
