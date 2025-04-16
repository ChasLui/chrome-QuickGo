import type { PlasmoCSConfig } from "plasmo"

import { Storage } from "@plasmohq/storage"

import { StorageKeys, type RuleProps } from "~utils/pure"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: false,
  run_at: "document_start"
}

const storage = new Storage()

window.addEventListener("message", (event) => {
  if (event.source !== window) return // 避免处理其他来源的消息
  const { type, data } = event.data
  if (!type) return
  if (type === "QuickGo::GET_RULES_FROM_INJECTED_SCRIPT") {
    storage.get<Record<string, RuleProps>>(StorageKeys.RULES).then((data) => {
      const newData = data || {}
      window.postMessage(
        { type: "QuickGo::GET_RULES_FROM_CONTENT_SCRIPT", data: newData },
        "*"
      )
    })
  }

  if (type === "QuickGo::SET_RULES_FROM_INJECTED_SCRIPT") {
    storage.set(StorageKeys.RULES, data)
  }
})
