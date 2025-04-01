// import { Storage } from "@plasmohq/storage"

// import {
//   ga,
//   GaEvents,
//   getMergedData,
//   StorageKeys,
//   type RuleProps
// } from "~utils/pure"

// const storage = new Storage()

// // 初始化侧边栏行为
// chrome.sidePanel
//   .setPanelBehavior({ openPanelOnActionClick: true })
//   .catch((error) => console.error(error))

// // 定义右键菜单项
// interface MenuItem extends chrome.contextMenus.CreateProperties {
//   action?(tab: chrome.tabs.Tab): void
// }

// const menuList: MenuItem[] = [
//   {
//     id: "issues",
//     title: "功能申请 && 问题反馈",
//     contexts: ["action"],
//     action() {
//       chrome.tabs.create({
//         url: "https://github.com/Dolov/chrome-easy-bookmark/issues"
//       })
//     }
//   },
//   {
//     id: "settings",
//     title: "个性化设置",
//     contexts: ["action"],
//     action() {
//       chrome.tabs.create({ url: "./tabs/Settings.html" })
//     }
//   }
// ]

// // 创建右键菜单
// function createContextMenus(menuList: MenuItem[]) {
//   menuList.forEach(({ action, ...menuProps }) => {
//     chrome.contextMenus.create(menuProps)
//   })
// }

// // 监听右键菜单点击事件
// function setupContextMenuListeners(menuList: MenuItem[]) {
//   chrome.contextMenus.onClicked.addListener((info, tab) => {
//     const menu = menuList.find((item) => item.id === info.menuItemId)
//     menu?.action?.(tab)
//   })
// }

// // 监听页面导航事件
// function setupNavigationListeners() {
//   const handleNavigation = async (url, tabId) => {
//     const urlObj = new URL(url)
//     const { origin, hostname, pathname, searchParams } = urlObj
//     if (!hostname || origin === "chrome://newtab") return

//     const data = await storage.get<RuleProps[]>(StorageKeys.DATA_SOURCE)
//     const dataSource: RuleProps[] = getMergedData(data)
//     console.log("dataSource: ", dataSource)
//     const currentUrl = pathname ? `${hostname}${pathname}` : hostname

//     const item = dataSource.find((i) => {
//       const matchUrlVariants = [
//         i.matchUrl,
//         `${i.matchUrl}/`,
//         `www.${i.matchUrl}`,
//         `www.${i.matchUrl}/`
//       ]
//       return matchUrlVariants.includes(currentUrl)
//     })

//     if (!item || item.disabled || item.runAtContent) return

//     if (typeof item.redirect === "function") return

//     const redirectKeys = Array.isArray(item.redirect)
//       ? item.redirect
//       : [item.redirect]

//     const redirectUrl = redirectKeys
//       .map((key) => searchParams.get(key))
//       .find(Boolean)

//     if (!redirectUrl) return
//     console.log("redirectUrl: ", redirectUrl)

//     const decodeUrl = decodeURIComponent(redirectUrl)
//     if (decodeUrl.includes("://")) {
//       ga(GaEvents.REDIRECT)

//       const newDataSource = [
//         { ...item, count: (item.count || 0) + 1 },
//         ...dataSource.filter((i) => i.id !== item.id)
//       ]

//       chrome.tabs.update(tabId, { url: decodeUrl })
//       storage.set(StorageKeys.DATA_SOURCE, newDataSource)
//     }
//   }

//   // 刷新页面时 onBeforeNavigate > onCommitted，onBeforeNavigate 无需等待 TTFB
//   // 新建标签页时 onCreated > onUpdated > onBeforeNavigate，onCreated 无需等待 TTFB

//   // chrome.webNavigation.onCommitted.addListener((details) => {
//   //   if (details.transitionType === "reload") {
//   //     console.log("onCommitted: ", Date.now())
//   //     handleNavigation(details.url, details.tabId)
//   //   }
//   // })

//   // chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   //   if (changeInfo.status === "loading" && changeInfo.url) {
//   //     console.log("onUpdated: ", Date.now())
//   //     handleNavigation(changeInfo.url, tabId)
//   //   }
//   // })

//   const createTabRef = {
//     id: null
//   }

//   chrome.webNavigation.onBeforeNavigate.addListener((details) => {
//     const { url, tabId } = details
//     if (createTabRef.id === tabId) {
//       createTabRef.id = null
//       return
//     }
//     console.log("onBeforeNavigate: ", tabId, Date.now(), url)
//     handleNavigation(url, tabId)
//   })

//   chrome.tabs.onCreated.addListener((tab) => {
//     const { id, pendingUrl } = tab
//     createTabRef.id = id
//     console.log("onCreated: ", id, Date.now(), pendingUrl)
//     handleNavigation(pendingUrl, id)
//   })
// }

// // 初始化
// function init() {
//   createContextMenus(menuList)
//   setupContextMenuListeners(menuList)
//   setupNavigationListeners()
// }

// init()
