import { Storage } from "@plasmohq/storage"

import { ga, GaEvents, StorageKeys, type DataSourceItem } from "~utils"

const storage = new Storage()

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error))

/** 定义右键菜单列表 */
const menuList: (chrome.contextMenus.CreateProperties & {
  action?(tab: chrome.tabs.Tab): void
})[] = [
  {
    id: "issues",
    title: "功能申请 && 问题反馈",
    contexts: ["action"],
    action() {
      chrome.tabs.create({
        url: "https://github.com/Dolov/chrome-easy-bookmark/issues"
      })
    }
  },
  {
    id: "settings",
    title: "个性化设置",
    contexts: ["action"],
    action() {
      chrome.tabs.create({ url: "./tabs/Settings.html" })
    }
  }
]

/** 创建右键菜单 */
menuList.forEach((item) => {
  const { action, ...menuProps } = item
  chrome.contextMenus.create(menuProps)
})

/** 监听右键菜单的点击事件，执行对应的行为 */
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const { menuItemId } = info
  const menu = menuList.find((item) => item.id === menuItemId)
  if (!menu) return
  const { action } = menu
  action && action(tab)
})

/** 监听图标点击 */
chrome.action.onClicked.addListener(async (activeTab) => {})
/** 监听新标签 */
chrome.tabs.onCreated.addListener(function (tab) {})

chrome.webNavigation.onCommitted.addListener(function (details) {
  // 页面刷新
  if (details.transitionType !== "reload") return
  quickgo(details.url)
})

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  const { status, url } = changeInfo
  if (status !== "loading" || !url) return
  quickgo(url)
})

const quickgo = (url: string) => {
  const urlObj = new URL(url)
  const { hostname, pathname, searchParams } = urlObj
  if (!hostname) return
  storage.get(StorageKeys.DATA_SOURCE).then((data) => {
    if (!data) return
    const matchUrl = pathname ? `${hostname}${pathname}` : hostname
    const dataSource = data as unknown as DataSourceItem[]
    const item = dataSource.find((i) => i.matchUrl === matchUrl)
    if (!item) return
    const { disable, redirectKey } = item
    if (disable) return
    if (!url.includes(redirectKey)) return
    const redirectUrl = searchParams.get(redirectKey)
    ga(GaEvents.REDIRECT)
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0]
      chrome.tabs.update(activeTab.id, { url: redirectUrl })
    })
  })
}
