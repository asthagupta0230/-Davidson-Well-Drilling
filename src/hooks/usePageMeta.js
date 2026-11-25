import { useEffect } from 'react'
import { pageMetadata } from '../data/pageMetadata.js'
import { scrollToTarget } from '../motion/lenis.js'

export default function usePageMeta(pathname, hash) {
  useEffect(() => {
    const [title, description] = pageMetadata[pathname] || ['Davidson Well Drilling, Inc.', 'Davidson Well Drilling, Inc.']
    document.title = title
    const descriptionTag = document.querySelector('meta[name="description"]')
    if (descriptionTag) descriptionTag.content = description
    if (hash) {
      requestAnimationFrame(() => {
        const target = document.getElementById(hash.slice(1))
        if (target) scrollToTarget(target, { offset: -96 })
      })
    } else {
      scrollToTarget(0, { immediate: true })
    }
  }, [pathname, hash])
}
