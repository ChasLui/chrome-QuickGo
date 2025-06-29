import { Storage } from "@plasmohq/storage"

import {
  ga,
  GaEvents,
  getMergedRules,
  StorageKeys,
  type RuleProps
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
        url: "https://github.com/Dolov/chrome-QuickGo/issues"
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
  const handleNavigation = async (url, tabId) => {
    const urlObj = new URL(url)
    const { origin, hostname, pathname, searchParams } = urlObj
    if (!hostname || origin === "chrome://newtab") return

    const data =
      (await storage.get<Record<string, RuleProps>>(StorageKeys.RULES)) || {}
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

    if (!item || item.disabled || item.runAtContent) return

    if (typeof item.redirect === "function") return

    const redirectKeys = Array.isArray(item.redirect)
      ? item.redirect
      : [item.redirect]

    let redirectUrl = redirectKeys
      .map((key) => searchParams.get(key))
      .find(Boolean)

    if (!redirectUrl) return

    if (item.formatter) {
      redirectUrl = item.formatter(redirectUrl)
    }

    const decodeUrl = decodeURIComponent(redirectUrl)
    if (!decodeUrl.includes("://")) return

    ga(GaEvents.REDIRECT)

    const { id, count } = item
    const newData = {
      ...data,
      [id]: {
        ...data[id],
        count: (count || 0) + 1,
        updateAt: Date.now()
      }
    }

    chrome.tabs.update(tabId, { url: decodeUrl })
    storage.set(StorageKeys.RULES, newData)
  }

  // 刷新页面时 onBeforeNavigate > onCommitted, onBeforeNavigate 无需等待 TTFB
  // 在终端中点击链接打开时 onCreated > (onBeforeNavigate === onUpdated), onCreated 无需等待 TTFB
  // 点击 a 标签打开新标签页 onCreated(无 url) > onBeforeNavigate > onUpdated, onCreated、onBeforeNavigate 都无需等待 TTFB

  // chrome.webNavigation.onCommitted.addListener((details) => {
  //   if (details.transitionType === "reload") {
  //     console.log("legacy:onCommitted: ", Date.now(), details.url)
  //     handleNavigation(details.url, details.tabId)
  //   }
  // })

  const ignoreUrls = [
    "about:blank",
    "chrome://flags/",
    "chrome://newtab/",
    "chrome://history/",
    "chrome://settings/",
    "chrome://bookmarks/",
    "chrome://downloads/",
    "chrome://extensions/",
    "chrome://new-tab-page/"
  ]

  // 302 后会触发 onUpdated 不会触发 onBeforeNavigate
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    const { status, url } = changeInfo
    if (status === "loading" && url && !ignoreUrls.includes(url)) {
      handleNavigation(changeInfo.url, tabId)
    }
  })

  chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    const { url, tabId } = details
    if (!url) return
    if (ignoreUrls.includes(url)) return
    handleNavigation(url, tabId)
  })

  chrome.tabs.onCreated.addListener((tab) => {
    const { id, pendingUrl } = tab
    if (!pendingUrl) return
    if (ignoreUrls.includes(pendingUrl)) return
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
