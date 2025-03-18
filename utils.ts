import jianshu from "data-base64:~assets/jianshu-fav.ico"
import juejin from "data-base64:~assets/juejin-fav.png"
import zhihu from "data-base64:~assets/zhihu-fav.ico"

export enum StorageKeys {
  DATA_SOURCE = "DATA_SOURCE",
  SETTINGS = "SETTINGS"
}

export const faviconMap = {
  zhihu,
  juejin,
  jianshu
}

export const defaultData = [
  {
    id: "zhihu",
    matchUrl: "link.zhihu.com/",
    redirectKey: "target",
    disable: false,
    isDefault: true
  },
  {
    id: "juejin",
    matchUrl: "link.juejin.cn/",
    redirectKey: "target",
    disable: false,
    isDefault: true
  },
  {
    id: "jianshu",
    matchUrl: "www.jianshu.com/go-wild",
    redirectKey: "url",
    disable: false,
    isDefault: true
  }
]

export enum GaEvents {
  CREATE = "create",
  CREATE_SAVE = "create_save",
  ITEM_EDIT = "item_edit",
  ITEM_DISABLE = "item_disable",
  ITEM_DELETE = "item_delete",
  REDIRECT = "redirect",
  ACTIONS_ISSUE = "actions_issues",
  ACTIONS_SETTING = "actions_setting",
  SETTING_THEME = "setting_theme"
}

export interface DataSourceItem {
  id: string
  disable: boolean
  matchUrl: string
  redirectKey: string
  isDefault?: boolean
}

export function formatDateTime() {
  const now = new Date()

  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")

  const hours = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")
  const seconds = String(now.getSeconds()).padStart(2, "0")

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

async function getOrCreateClientId() {
  const result = await chrome.storage.local.get("clientId")
  let clientId = result.clientId
  if (!clientId) {
    // Generate a unique client ID, the actual value is not relevant
    clientId = self.crypto.randomUUID()
    await chrome.storage.local.set({ clientId })
  }
  return clientId
}

export const ga = async (name, params?: Record<string, any>) => {
  const GA_ENDPOINT = "https://www.google-analytics.com/mp/collect"
  const MEASUREMENT_ID = process.env.PLASMO_PUBLIC_MEASUREMENT_ID
  const API_SECRET = process.env.PLASMO_PUBLIC_API_SECRET

  fetch(
    `${GA_ENDPOINT}?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`,
    {
      method: "POST",
      body: JSON.stringify({
        client_id: await getOrCreateClientId(),
        events: [
          {
            name,
            params: {
              time: formatDateTime(),
              ...params
            }
          }
        ]
      })
    }
  )
}

export function getTopLevelDomain(url: string) {
  try {
    const newUrl = url.startsWith("http") ? url : `http://${url}`
    const hostname = new URL(newUrl).hostname
    const parts = hostname.split(".")
    return parts.length > 1 ? parts.slice(-2).join(".") : hostname
  } catch (error) {
    console.error("Invalid URL:", error)
    return null
  }
}
