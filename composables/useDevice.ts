import { useBreakpoints } from '@vueuse/core'

export const useDevice = () => {
  const breakpoints = useBreakpoints({
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  })

  const isSm = breakpoints.smaller('md')
  const isMd = breakpoints.between('md', 'lg')
  const isLg = breakpoints.between('lg', 'xl')
  const isXl = breakpoints.greater('xl')

  return {
    isSm,
    isMd,
    isLg,
    isXl,
  }
}
