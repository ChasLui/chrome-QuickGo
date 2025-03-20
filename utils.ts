import csdn from "data-base64:~assets/csdn.svg"
import gitee from "data-base64:~assets/gitee.svg"
import jianshu from "data-base64:~assets/jianshu.svg"
import juejin from "data-base64:~assets/juejin.svg"
import sspai from "data-base64:~assets/sspai.svg"
import zhihu from "data-base64:~assets/zhihu.svg"

export enum StorageKeys {
  DATA_SOURCE = "DATA_SOURCE",
  SETTINGS = "SETTINGS"
}

export const faviconMap = {
  csdn,
  sspai,
  zhihu,
  gitee,
  juejin,
  jianshu
}

export const defaultData = [
  {
    // https://link.zhihu.com/?target=https%3A//manus.im/
    id: "zhihu",
    matchUrl: "link.zhihu.com",
    redirectKey: "target",
    disable: false,
    isDefault: true
  },
  {
    // https://link.juejin.cn/?target=https%3A%2F%2Fcodesandbox.io%2Fp%2Fsandbox%2Fxwxsv6
    id: "juejin",
    matchUrl: "link.juejin.cn",
    redirectKey: "target",
    disable: false,
    isDefault: true
  },
  {
    // https://www.jianshu.com/go-wild?ac=2&url=https%3A%2F%2Fwww.runoob.com%2Fjs%2Fjs-intro.html
    id: "jianshu",
    matchUrl: "jianshu.com/go-wild",
    redirectKey: "url",
    disable: false,
    isDefault: true
  },
  {
    // https://gitee.com/link?target=https%3A%2F%2Fnano.hyperf.wiki
    id: "gitee",
    matchUrl: "gitee.com/link",
    redirectKey: "target",
    disable: false,
    isDefault: true
  },
  {
    // https://link.csdn.net/?from_id=145825938&target=https%3A%2F%2Fgithub.com%2Fyour-repo%2Fcompression-template
    id: "csdn",
    matchUrl: "link.csdn.net",
    redirectKey: "target",
    disable: false,
    isDefault: true
  },
  {
    // https://sspai.com/link?target=https%3A%2F%2Fwww.digitalocean.com%2Fcommunity%2Ftools%2Fnginx%3Fglobal.app.lang%3DzhCN
    id: "sspai",
    matchUrl: "sspai.com/link",
    redirectKey: "target",
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

export const getMergedData = (storageData = []) => {
  const custom = storageData.filter((i) => {
    return !defaultData.find((j) => j.id === i.id)
  })

  const defaults = defaultData.map((i) => {
    const { id } = i
    const existed = storageData.find((j) => j.id === id)
    return {
      ...i,
      disable: existed?.disable ?? false
    }
  })
  return [...defaults, ...custom]
}
