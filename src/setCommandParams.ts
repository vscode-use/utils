/**
 *
 * @param params
 * @usage [xxx](`command:a.b?${setCommandParams([1, 2, 3])}`)
 * @returns
 */
export function setCommandParams(params: any[]) {
  return encodeURIComponent(JSON.stringify(params))
}
