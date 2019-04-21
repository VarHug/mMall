export function random(m, n) {
  if (m < n) {
    let num = Math.floor(Math.random() * (n - m + 1) + m) + ''
    let str = `000000${num}`
    return str.slice(str.length - 6)
  }
}
