import { useEffect, useRef } from 'react'

export function useInfiniteScroll(onIntersect, { disabled = false } = {}) {
  const targetRef = useRef(null)

  useEffect(() => {
    if (disabled) return

    const target = targetRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect()
        }
      },
      { rootMargin: '200px' },
    )

    observer.observe(target)

    return () => observer.disconnect()
  }, [onIntersect, disabled])

  return targetRef
}
