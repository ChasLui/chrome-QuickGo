import type { PlasmoCSConfig } from "plasmo"

import { Storage } from "@plasmohq/storage"

import { getMergedRules, StorageKeys, type RuleProps } from "~utils/pure"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: false,
  run_at: "document_end"
}

const storage = new Storage()

const handleNavigation = async () => {
  const { origin, hostname, pathname } = window.location
  if (!hostname || origin === "chrome://newtab") return

  const data = await storage.get<Record<string, RuleProps>>(StorageKeys.RULES)
  const dataSource: RuleProps[] = getMergedRules(data)
  const currentUrl = pathname ? `${hostname}${pathname}` : hostname

  const item = dataSource.find((i) => {
    const matchUrlVariants = [
      i.matchUrl,
      `${i.matchUrl}/`,
      `www.${i.matchUrl}`,
      `www.${i.matchUrl}/`
    ]
    return matchUrlVariants.includes(currentUrl)
  })

  if (!item || item.disabled) return

  if (typeof item.redirect === "function") {
    const { id, count } = item
    const newData = {
      ...data,
      [id]: {
        ...data[id],
        count: (count || 0) + 1,
        updateAt: Date.now()
      }
    }
    await storage.set(StorageKeys.RULES, newData)
    item.redirect()
    return
  }
}

handleNavigation()

export {}
