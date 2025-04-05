import { signal } from 'alien-signals'
import { addEventListener } from './addEventListener'
import { getVisibleRange } from './getVisibleRange'

export function useVisibleRange() {
  const range = signal(getVisibleRange())
  addEventListener('text-visible-change', () => {
    range(getVisibleRange())
  })
  return range
}
