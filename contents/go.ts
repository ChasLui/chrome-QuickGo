// import type { PlasmoCSConfig } from "plasmo"

// import { Storage } from "@plasmohq/storage"

// import { getMergedData, StorageKeys, type RuleProps } from "~utils/pure"

// export const config: PlasmoCSConfig = {
//   matches: ["<all_urls>"],
//   all_frames: false,
//   run_at: "document_end"
// }

// const storage = new Storage()

// const handleNavigation = async () => {
//   const { origin, hostname, pathname } = window.location
//   if (!hostname || origin === "chrome://newtab") return

//   const data = await storage.get<RuleProps[]>(StorageKeys.DATA_SOURCE)
//   const dataSource: RuleProps[] = getMergedData(data)
//   const currentUrl = pathname ? `${hostname}${pathname}` : hostname

//   const item = dataSource.find((i) => {
//     const matchUrlVariants = [
//       i.matchUrl,
//       `${i.matchUrl}/`,
//       `www.${i.matchUrl}`,
//       `www.${i.matchUrl}/`
//     ]
//     return matchUrlVariants.includes(currentUrl)
//   })

//   if (!item || item.disabled) return

//   if (typeof item.redirect === "function") {
//     const newDataSource = [
//       { ...item, count: (item.count || 0) + 1 },
//       ...dataSource.filter((i) => i.id !== item.id)
//     ]
//     await storage.set(StorageKeys.DATA_SOURCE, newDataSource)
//     item.redirect()
//     return
//   }
// }

// handleNavigation()

// export {}
