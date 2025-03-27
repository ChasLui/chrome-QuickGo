import { Storage } from "@plasmohq/storage"

import {
  ga,
  GaEvents,
  getMergedData,
  StorageKeys,
  type DataSourceItem
} from "~utils/pure"

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
    const { origin, hostname, pathname, searchParams } = urlObj
    if (!hostname) return
    if (origin === "chrome://newtab") return

    const data = await storage.get<DataSourceItem[]>(StorageKeys.DATA_SOURCE)
    const dataSource = getMergedData(data)
    const currentUrl = pathname ? `${hostname}${pathname}` : hostname

    const item = dataSource.find((i) => {
      return (
        i.matchUrl === currentUrl ||
        `${i.matchUrl}/` === currentUrl ||
        `www.${i.matchUrl}` === currentUrl ||
        `www.${i.matchUrl}/` === currentUrl
      )
    })

    if (!item || item.disable || !url.includes(item.redirectKey)) return

    const { redirectKey } = item
    const redirectUrl = searchParams.get(redirectKey)
    if (!redirectUrl) return
    const decodeUrl = decodeURIComponent(redirectUrl)
    if (decodeUrl.includes("://")) {
      ga(GaEvents.REDIRECT)
      // 将生效的规则放到第一位，计数+1
      const newDataSource = [
        { ...item, count: item.count ? item.count + 1 : 1 },
        ...dataSource.filter((i) => i.id !== item.id)
      ]
      chrome.tabs.update(tabId, { url: decodeUrl })
      storage.set(StorageKeys.DATA_SOURCE, newDataSource)
    }
  }

  // chrome.webNavigation.onCommitted.addListener((details) => {
  //   if (details.transitionType === "reload") {
  //     handleNavigation(details.url, details.tabId)
  //   }
  // })

  // chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  //   if (changeInfo.status === "loading" && changeInfo.url) {
  //     handleNavigation(changeInfo.url, tabId)
  //   }
  // })

  chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    const { url, tabId } = details
    console.log("onBeforeNavigate: ", url)
    handleNavigation(url, tabId)
  })

  chrome.tabs.onCreated.addListener((tab) => {
    const { id, pendingUrl } = tab
    console.log("onCreated: ", pendingUrl)
    handleNavigation(pendingUrl, id)
  })
}

// 初始化
function init() {
  createContextMenus(menuList)
  setupContextMenuListeners(menuList)
  setupNavigationListeners()
}

init()
