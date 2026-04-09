/**
 * @description 设置命令参数
 * @param params
 * @usage [xxx](`command:a.b?${setCommandParams([1, 2, 3])}`)
 * @returns string
 */
export function setCommandParams(params: readonly unknown[]): string {
  return encodeURIComponent(JSON.stringify(params))
}
