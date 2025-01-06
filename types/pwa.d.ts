declare interface Window {
  __pwacompat?: {
    registerSW: (options: { immediate: boolean }) => void
  }
}
