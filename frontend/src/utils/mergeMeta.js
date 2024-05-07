import { defu } from 'defu'

/*
 * Leftmost arguments have more priority when assigning defaults.
 * https://unjs.io/defu
 */

export function mergeMeta(pageMeta, defaultMeta) {
  return defu(pageMeta, defaultMeta)
}
