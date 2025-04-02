import type { PlasmoCSConfig } from "plasmo"

import { getMergedRules, type RuleProps } from "~utils/pure"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: false,
  run_at: "document_end",
  world: "MAIN"
}

const getRules = async (): Promise<{
  rules: RuleProps[]
  ruleMap: Record<string, RuleProps>
}> => {
  return new Promise((resolve) => {
    const handleMessage = (event) => {
      if (event.data.type === "QuickGo::GET_RULES_FROM_CONTENT_SCRIPT") {
        window.removeEventListener("message", handleMessage)
        const ruleMap = event.data.data
        const rules = getMergedRules(ruleMap)
        resolve({
          rules,
          ruleMap
        })
      }
    }

    window.addEventListener("message", handleMessage)
    window.postMessage({ type: "QuickGo::GET_RULES_FROM_INJECTED_SCRIPT" }, "*")
  })
}

const handleNavigation = async () => {
  const { origin, hostname, pathname } = window.location
  if (!hostname || origin === "chrome://newtab") return

  const { rules, ruleMap } = await getRules()

  const currentUrl = pathname ? `${hostname}${pathname}` : hostname

  const rule = rules.find((i) => {
    if (!i.matchUrl) return false

    let pattern = i.matchUrl
      .replace(/\./g, "\\.") // 转义 `.`
      .replace(/\(\*\)/g, ".*") // `(*)` 替换为 `.*`，匹配任意内容

    // 允许 `www.` 可选，并允许末尾可选的 `/`
    pattern = `^(www\\.)?${pattern}/?$`

    const regex = new RegExp(pattern)

    return regex.test(currentUrl)
  })

  if (!rule) return

  const { id, disabled, runAtContent } = rule
  if (disabled || !runAtContent) return

  if (typeof rule.redirect === "function") {
    const updater = () => {
      const { count, ...restProps } = ruleMap[id] || {}
      const newRuleMap = {
        ...ruleMap,
        [id]: {
          ...restProps,
          count: count || 0,
          updateAt: Date.now()
        }
      }

      return () => {
        newRuleMap[id].count = newRuleMap[id].count + 1
        newRuleMap[id].updateAt = Date.now()
        window.postMessage(
          { type: "QuickGo::SET_RULES_FROM_INJECTED_SCRIPT", data: newRuleMap },
          "*"
        )
      }
    }

    const update = updater()
    rule.redirect(update)
    return
  }
}

handleNavigation()
