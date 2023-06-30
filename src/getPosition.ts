/**
 * 根据给到的内容和字符串的位置，计算出行和列
 */
export function getPosition(content: string, position: number) {
  let count = 0
  for (let i = 0; i < content.split('\n').length; i++) {
    const len = content[i].length
    if ((count <= position) && (count + len >= position)) {
      return {
        line: i,
        charater: position - count + 1,
      }
    }
    count += len + 1
  }
}
