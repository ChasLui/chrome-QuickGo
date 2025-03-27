import { parse as tldtsParse } from "tldts"

export function getDomain(url: string) {
  if (!url) return
  const parmas = tldtsParse(url)
  return parmas.domain
}
