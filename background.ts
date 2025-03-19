import { Storage } from "@plasmohq/storage"

import {
  ga,
  GaEvents,
  getMergedData,
  StorageKeys,
  type DataSourceItem
} from "~utils"

const storage = new Storage()

// 初始化侧边栏行为
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error))

// 定义右键菜单项
interface MenuItem extends chrome.contextMenus.CreateProperties {
  action?(tab: chrome.tabs.Tab): void
}

const menuList: MenuItem[] = [
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

// 创建右键菜单
function createContextMenus(menuList: MenuItem[]) {
  menuList.forEach(({ action, ...menuProps }) => {
    chrome.contextMenus.create(menuProps)
  })
}

// 监听右键菜单点击事件
function setupContextMenuListeners(menuList: MenuItem[]) {
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    const menu = menuList.find((item) => item.id === info.menuItemId)
    menu?.action?.(tab)
  })
}

// 监听页面导航事件
function setupNavigationListeners() {
  const handleNavigation = async (url: string, tabId: number) => {
    const urlObj = new URL(url)
    const { hostname, pathname, searchParams } = urlObj
    if (!hostname) return

    const data = await storage.get<DataSourceItem[]>(StorageKeys.DATA_SOURCE)
    const dataSource = getMergedData(data)
    const currentUrl = pathname ? `${hostname}${pathname}` : hostname
    const item = dataSource.find((i) => {
      return (
        i.matchUrl === currentUrl ||
        `${i.matchUrl}/` === currentUrl ||
        `www.${i.matchUrl}` === currentUrl
      )
    })

    if (!item || item.disable || !url.includes(item.redirectKey)) return

    const redirectUrl = searchParams.get(item.redirectKey)
    if (redirectUrl) {
      ga(GaEvents.REDIRECT)
      chrome.tabs.update(tabId, { url: redirectUrl })
    }
  }

  chrome.webNavigation.onCommitted.addListener((details) => {
    if (details.transitionType === "reload") {
      handleNavigation(details.url, details.tabId)
    }
  })

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "loading" && changeInfo.url) {
      handleNavigation(changeInfo.url, tabId)
    }
  })
}

// 初始化
function init() {
  createContextMenus(menuList)
  setupContextMenuListeners(menuList)
  setupNavigationListeners()
}

init()
