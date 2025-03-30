export enum StorageKeys {
  DATA_SOURCE = "DATA_SOURCE",
  SETTINGS = "SETTINGS"
}

export const defaultData: DataSourceItem[] = [
  {
    // https://link.zhihu.com/?target=https%3A//manus.im/
    id: "zhihu",
    matchUrl: "link.zhihu.com",
    redirect: "target",
    disable: false,
    isDefault: true
  },
  {
    // https://link.juejin.cn/?target=https%3A%2F%2Fcodesandbox.io%2Fp%2Fsandbox%2Fxwxsv6
    id: "juejin",
    matchUrl: "link.juejin.cn",
    redirect: "target",
    disable: false,
    isDefault: true
  },
  {
    // https://www.jianshu.com/go-wild?ac=2&url=https%3A%2F%2Fwww.runoob.com%2Fjs%2Fjs-intro.html
    id: "jianshu",
    matchUrl: "jianshu.com/go-wild",
    redirect: "url",
    disable: false,
    isDefault: true
  },
  {
    // https://gitee.com/link?target=https%3A%2F%2Fnano.hyperf.wiki
    id: "gitee",
    matchUrl: "gitee.com/link",
    redirect: "target",
    disable: false,
    isDefault: true
  },
  {
    // https://link.csdn.net/?from_id=145825938&target=https%3A%2F%2Fgithub.com%2Fyour-repo%2Fcompression-template
    id: "csdn",
    matchUrl: "link.csdn.net",
    redirect: "target",
    disable: false,
    isDefault: true
  },
  {
    // https://sspai.com/link?target=https%3A%2F%2Fwww.digitalocean.com%2Fcommunity%2Ftools%2Fnginx%3Fglobal.app.lang%3DzhCN
    id: "sspai",
    matchUrl: "sspai.com/link",
    redirect: "target",
    disable: false,
    isDefault: true
  },
  {
    // https://afdian.com/link?target=https%3A%2F%2Flarkcommunity.feishu.cn%2Fbase%2FM2gsbZmBtaHyagsOtbrca2c2nvh
    id: "afdian",
    matchUrl: "afdian.com/link",
    redirect: "target",
    disable: false,
    isDefault: true
  },
  {
    // https://www.baike.com/redirect_link?url=https%3A%2F%2Fwww.zdnet.com%2Farticle%2Fgithub-builds-a-search-engine-for-code-from-scratch-in-rust%2F&collect_params=%7B%22doc_title%22%3A%22github%22%2C%22doc_id%22%3A%227239981009876418592%22%2C%22version_id%22%3A%227473689138244403212%22%2C%22reference_type%22%3A%22web%22%2C%22link%22%3A%22https%3A%2F%2Fwww.zdnet.com%2Farticle%2Fgithub-builds-a-search-engine-for-code-from-scratch-in-rust%2F%22%2C%22author%22%3A%22%22%2C%22title%22%3A%22GitHubbuiltanewsearchengineforcode%27fromscratch%27inRust%22%2C%22reference_tag%22%3A%22%22%2C%22source_name%22%3A%22zdnet%22%2C%22publish_date%22%3A%22%22%2C%22translator%22%3A%22%22%2C%22volume%22%3A%22%22%2C%22period%22%3A%22%22%2C%22page%22%3A%22%22%2C%22doi%22%3A%22%22%2C%22version%22%3A%22%22%2C%22publish_area%22%3A%22%22%2C%22publisher%22%3A%22%22%2C%22book_number%22%3A%22%22%7D
    id: "baike",
    matchUrl: "baike.com/redirect_link",
    redirect: "url",
    disable: false,
    isDefault: true
  },
  {
    // https://www.chinaz.com/go.shtml?url=https://mp.weixin.qq.com/s/vhv4Eb5XoA2d4LKRqVRQag
    id: "chinaz",
    matchUrl: "chinaz.com/go.shtml",
    redirect: "url",
    disable: false,
    isDefault: true
  },
  {
    id: "coolapk",
    matchUrl: "coolapk.com/link",
    redirect: "url",
    disable: false,
    isDefault: true
  },
  {
    // https://www.curseforge.com/linkout?remoteUrl=https%253a%252f%252fwww.complementary.dev%252fshaders%252f%2523download-section
    id: "curseforge",
    matchUrl: "curseforge.com/linkout",
    redirect: "remoteUrl",
    disable: false,
    isDefault: true
  },
  {
    // https://developer.aliyun.com/redirect?target=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
    id: "aliyun",
    matchUrl: "developer.aliyun.com/redirect",
    redirect: "target",
    disable: false,
    isDefault: true
  },
  {
    // https://www.douban.com/link2/?url=http%3A%2F%2Fwww.truecrypt.org%2F&link2key=c2b1b99b0b
    id: "douban",
    matchUrl: "douban.com/link2",
    redirect: "url",
    disable: false,
    isDefault: true
  },
  {
    // https://game.bilibili.com/linkfilter/?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
    id: "bilibili",
    matchUrl: "game.bilibili.com/linkfilter",
    redirect: "url",
    disable: false,
    isDefault: true
  },
  {
    // https://ref.gamer.com.tw/redir.php?url=http%3A%2F%2Fsunderfolk.com%2F
    id: "gamercomtw",
    matchUrl: "ref.gamer.com.tw/redir.php",
    redirect: "url",
    disable: false,
    isDefault: true
  },
  {
    // https://www.gcores.com/link?target=https%3A%2F%2Fals.rjsy313.com%2F
    id: "gcores",
    matchUrl: "gcores.com/link",
    redirect: "target",
    disable: false,
    isDefault: true
  },
  {
    // https://hellogithub.com/periodical/statistics/click?target=https%3A%2F%2Fals.rjsy313.com%2F
    id: "hellogithub",
    matchUrl: "hellogithub.com/periodical/statistics/click",
    redirect: "target",
    disable: false,
    isDefault: true
  },
  {
    // https://xie.infoq.cn/link?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzg5MjU0NTI5OQ%3D%3D%26mid%3D2247604333%26idx%3D1%26sn%3D4021da1c6fb035906fd747487bbb8a23%26scene%3D21%23wechat_redirect
    id: "xieinfoq",
    matchUrl: "xie.infoq.cn/link",
    redirect: "target",
    disable: false,
    isDefault: true
  },
  {
    // https://www.infoq.cn/link?target=https%3A%2F%2Fsloanreview.mit.edu%2Farticle%2Fmanaging-the-bots-that-are-managing-the-business%2F
    id: "infoq",
    matchUrl: "infoq.cn/link",
    redirect: "target",
    disable: false,
    isDefault: true
  },
  {
    // https://www.kookapp.cn/go-wild.html?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
    id: "kookapp",
    matchUrl: "kookapp.cn/go-wild.html",
    redirect: "url",
    disable: false,
    isDefault: true
  },
  {
    // https://ask.latexstudio.net/go/index?url=https%3A%2F%2Fgithub.com%2Fzepinglee%2Fciteproc-lua
    id: "latexstudio",
    matchUrl: "ask.latexstudio.net/go/index",
    redirect: "url",
    disable: false,
    isDefault: true
  },
  {
    // https://leetcode.cn/link/?target=https%3A%2F%2Fjobs.mihoyo.com%2Fm%2F%3FsharePageId%3D77920%26recommendationCode%3DGZRRW%26isRecommendation%3Dtrue%23%2Fcampus%2Fposition
    id: "leetcode",
    matchUrl: "leetcode.cn/link",
    redirect: "target",
    disable: false,
    isDefault: true
  },
  {
    id: "linkedin",
    matchUrl: "linkedin.com/safety/go",
    redirect: "url",
    disable: false,
    isDefault: true
  },
  {
    // https://link.logonews.cn/?url=http%3A%2F%2Fsunderfolk.com%2F
    id: "logonews",
    matchUrl: "link.logonews.cn",
    redirect: "url",
    disable: false,
    isDefault: true
  },
  {
    // https://www.nodeseek.com/jump?to=https%3A%2F%2Fblogverse.cn
    id: "nodeseek",
    matchUrl: "nodeseek.com/jump",
    redirect: "to",
    disable: false,
    isDefault: true
  },
  {
    // https://hd.nowcoder.com/link.html?target=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
    id: "nowcoder",
    matchUrl: "hd.nowcoder.com/link.html",
    redirect: "target",
    disable: false,
    isDefault: true
  },
  {
    // https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
    id: "oschina",
    matchUrl: "oschina.net/action/GoToLink",
    redirect: "url",
    disable: false,
    isDefault: true
  },
  {
    // https://www.qcc.com/web/transfer-link?link=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
    id: "qcc",
    matchUrl: "qcc.com/web/transfer-link",
    redirect: "link",
    disable: false,
    isDefault: true
  },
  {
    // https://docs.qq.com/scenario/link.html?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
    id: "docsqq",
    hostIcon: true,
    matchUrl: "docs.qq.com/scenario/link.html",
    redirect: "url",
    disable: false,
    isDefault: true
  },
  {
    // https://www.360doc.cn/outlink.html?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
    id: "360doc",
    matchUrl: "360doc.cn/outlink.html",
    redirect: "url",
    disable: false,
    isDefault: true
  },
  {
    // https://www.instagram.com/linkshim/?u=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
    id: "instagram",
    matchUrl: "instagram.com/linkshim",
    redirect: "u",
    disable: false,
    isDefault: true
  },
  {
    // https://mail.qq.com/cgi-bin/readtemplate?gourl=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
    id: "mailqq",
    hostIcon: true,
    matchUrl: "mail.qq.com/cgi-bin/readtemplate",
    redirect: "gourl",
    disable: false,
    isDefault: true
  },
  {
    // https://wx.mail.qq.com/xmspamcheck/xmsafejump?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
    id: "wxmailqq",
    hostIcon: true,
    matchUrl: "wx.mail.qq.com/xmspamcheck/xmsafejump",
    redirect: "url",
    disable: false,
    isDefault: true
  },
  {
    // https://shimo.im/outlink/black?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
    id: "shimo",
    matchUrl: "shimo.im/outlink/black",
    redirect: "url",
    disable: false,
    isDefault: true
  },
  {
    // https://shimo.im/outlink/gray?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
    id: "shimo2",
    matchUrl: "shimo.im/outlink/gray",
    redirect: "url",
    disable: false,
    isDefault: true
  },
  {
    // https://steamcommunity.com/linkfilter?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
    id: "steamcommunity",
    matchUrl: "steamcommunity.com/linkfilter",
    redirect: "url",
    disable: false,
    isDefault: true
  },
  {
    id: "telegram",
    matchUrl: "t.me/iv",
    redirect: "url",
    disable: false,
    isDefault: true
  },
  {
    // https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fgit-scm.com%2Fbook%2Fzh%2Fv2%2Fch00%2F_commit_status&objectId=1434763&objectType=1&isNewArticle=undefined
    id: "tencent",
    matchUrl: "cloud.tencent.com/developer/tools/blog-entry",
    redirect: "target",
    disable: false,
    isDefault: true
  },
  {
    // https://www.tianyancha.com/security?target=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
    id: "tianyancha",
    matchUrl: "tianyancha.com/security",
    redirect: "target",
    disable: false,
    isDefault: true
  },
  {
    // https://tieba.baidu.com/mo/q/checkurl?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
    id: "baidutieba",
    hostIcon: true,
    matchUrl: "tieba.baidu.com/mo/q/checkurl",
    redirect: "url",
    disable: false,
    isDefault: true
  },
  {
    // https://link.uisdc.com/?redirect=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
    id: "uisdc",
    matchUrl: "link.uisdc.com",
    redirect: "redirect",
    disable: false,
    isDefault: true
  },
  {
    // https://developers.weixin.qq.com/community/middlepage/href?href=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
    id: "developersweixin",
    matchUrl: "developers.weixin.qq.com/community/middlepage/href",
    redirect: "href",
    disable: false,
    isDefault: true
  },
  {
    // https://www.yuque.com/r/goto?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
    id: "yuque",
    matchUrl: "yuque.com/r/goto",
    redirect: "url",
    disable: false,
    isDefault: true
  },
  {
    // https://www.youtube.com/redirect?q=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
    id: "youtube",
    matchUrl: "youtube.com/redirect",
    redirect: "q",
    disable: false,
    isDefault: true
  },
  {
    // http://redir.yy.duowan.com/warning.php?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
    id: "yyduowan",
    matchUrl: "redir.yy.duowan.com/warning.php",
    redirect: "url",
    disable: false,
    isDefault: true
  },
  {
    // https://weibo.cn/sinaurl?toasturl=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
    // https://weibo.cn/sinaurl?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
    id: "weibo",
    matchUrl: "weibo.cn/sinaurl",
    redirect: ["toasturl", "url"],
    disable: false,
    isDefault: true
  },
  {
    // https://blzxteam.com/gowild.htm?url=https_3A_2F_2Fjq_2eqq_2ecom_2F_3F_5fwv_3D1027_26k_3D1ywspCt0&u=31468&fr=https_3A_2F_2Fblzxteam_2ecom_2Fthread_2d479_2ehtm
    id: "blzxteam",
    matchUrl: "blzxteam.com/gowild.htm",
    redirect() {
      const url = document
        .querySelector("div._2VEbEOHfDtVWiQAJxSIrVi_0")
        .getAttribute("title")
      window.location.href = url
    },
    runAtContent: true,
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
  redirect: string | string[] | (() => void)

  // 规则生效的次数
  count?: number
  // 使用 hostname 的图标
  hostIcon?: boolean
  // 是否是默认数据，用于区分用户自定义数据，不可删除，不可编辑
  isDefault?: boolean
  // 在 contentjs 中生效
  runAtContent?: boolean
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

export const getMergedData = (storageData = []) => {
  // 使用 Map 来加速查找 defaultData
  const defaultDataMap = new Map(defaultData.map((item) => [item.id, item]))

  // 过滤出 storageData 中没有的项
  const newDefaultData = defaultData.filter((item) => {
    return !storageData.some((cItem) => cItem.id === item.id)
  })

  // 根据 storageData 更新每项数据，保持顺序不变
  const newStorageData = storageData.map((item) => {
    const defaultItem = defaultDataMap.get(item.id)
    if (defaultItem) {
      return {
        ...defaultItem,
        count: item.count ?? 0,
        disable: item.disable ?? false
      }
    }
    return item
  })

  // 合并 storageData 和 newDefaultData，确保顺序
  return [...newStorageData, ...newDefaultData]
}
