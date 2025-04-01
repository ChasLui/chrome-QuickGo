import type { PlasmoCSConfig } from "plasmo"

import { Storage } from "@plasmohq/storage"

import { getMergedRules, StorageKeys, type RuleProps } from "~utils/pure"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: false,
  run_at: "document_end",
  world: "MAIN"
}

const storage = new Storage()

const handleNavigation = async () => {
  const { origin, hostname, pathname } = window.location
  if (!hostname || origin === "chrome://newtab") return

  const data =
    (await storage.get<Record<string, RuleProps>>(StorageKeys.RULES)) || {}
  const dataSource: RuleProps[] = getMergedRules(data)
  const currentUrl = pathname ? `${hostname}${pathname}` : hostname

  const item = dataSource.find((i) => {
    if (!i.matchUrl) return false

    let pattern = i.matchUrl
      .replace(/\./g, "\\.") // 转义 `.`
      .replace(/\(\*\)/g, ".*") // `(*)` 替换为 `.*`，匹配任意内容

    // 允许 `www.` 可选，并允许末尾可选的 `/`
    pattern = `^(www\\.)?${pattern}/?$`

    const regex = new RegExp(pattern)

    return regex.test(currentUrl)
  })

  if (!item || item.disabled || !item.runAtContent) return

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
