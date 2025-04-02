import { parse as tldtsParse } from "tldts"

export function getDomain(url: string, hostname = false) {
  if (!url) return
  const parmas = tldtsParse(url)
  if (hostname) {
    return parmas.hostname
  }
  return parmas.domain
}
