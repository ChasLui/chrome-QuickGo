export enum StorageKeys {
  RULES = "RULES",
  SETTINGS = "SETTINGS"
}

export interface RuleProps extends BaseRuleProps {
  id: string
  // 规则生效的次数
  count?: number
  disabled?: boolean
  // 是否是默认数据，用于区分用户自定义数据，不可删除，不可编辑
  isDefault?: boolean
}

export interface BaseRuleProps {
  matchUrl: string
  redirect: string | string[] | (() => void)
  // 使用 hostname 的图标
  hostIcon?: boolean
  // 在 contentjs 中生效
  runAtContent?: boolean
  // 更新时间
  updateAt?: number
}

const defaultRuleMap: Record<string, BaseRuleProps> = {
  // https://link.zhihu.com/?target=https%3A//manus.im/
  zhihu: {
    matchUrl: "link.zhihu.com",
    redirect: "target"
  },
  // https://link.juejin.cn/?target=https%3A%2F%2Fcodesandbox.io%2Fp%2Fsandbox%2Fxwxsv6
  juejin: {
    matchUrl: "link.juejin.cn",
    redirect: "target"
  },
  // https://www.jianshu.com/go-wild?ac=2&url=https%3A%2F%2Fwww.runoob.com%2Fjs%2Fjs-intro.html
  jianshu: {
    matchUrl: "jianshu.com/go-wild",
    redirect: "url"
  },
  // https://gitee.com/link?target=https%3A%2F%2Fnano.hyperf.wiki
  gitee: {
    matchUrl: "gitee.com/link",
    redirect: "target"
  },
  // https://link.csdn.net/?from_id=145825938&target=https%3A%2F%2Fgithub.com%2Fyour-repo%2Fcompression-template
  csdn: {
    matchUrl: "link.csdn.net",
    redirect: "target"
  },
  // https://sspai.com/link?target=https%3A%2F%2Fwww.digitalocean.com%2Fcommunity%2Ftools%2Fnginx%3Fglobal.app.lang%3DzhCN
  sspai: {
    matchUrl: "sspai.com/link",
    redirect: "target"
  },
  // https://afdian.com/link?target=https%3A%2F%2Flarkcommunity.feishu.cn%2Fbase%2FM2gsbZmBtaHyagsOtbrca2c2nvh
  afdian: {
    matchUrl: "afdian.com/link",
    redirect: "target"
  },
  // https://www.baike.com/redirect_link?url=https%3A%2F%2Fwww.zdnet.com%2Farticle%2Fgithub-builds-a-search-engine-for-code-from-scratch-in-rust%2F&collect_params=%7B%22doc_title%22%3A%22github%22%2C%22doc_id%22%3A%227239981009876418592%22%2C%22version_id%22%3A%227473689138244403212%22%2C%22reference_type%22%3A%22web%22%2C%22link%22%3A%22https%3A%2F%2Fwww.zdnet.com%2Farticle%2Fgithub-builds-a-search-engine-for-code-from-scratch-in-rust%2F%22%2C%22author%22%3A%22%22%2C%22title%22%3A%22GitHubbuiltanewsearchengineforcode%27fromscratch%27inRust%22%2C%22reference_tag%22%3A%22%22%2C%22source_name%22%3A%22zdnet%22%2C%22publish_date%22%3A%22%22%2C%22translator%22%3A%22%22%2C%22volume%22%3A%22%22%2C%22period%22%3A%22%22%2C%22page%22%3A%22%22%2C%22doi%22%3A%22%22%2C%22version%22%3A%22%22%2C%22publish_area%22%3A%22%22%2C%22publisher%22%3A%22%22%2C%22book_number%22%3A%22%22%7D
  baike: {
    matchUrl: "baike.com/redirect_link",
    redirect: "url"
  },
  // https://www.chinaz.com/go.shtml?url=https://mp.weixin.qq.com/s/vhv4Eb5XoA2d4LKRqVRQag
  chinaz: {
    matchUrl: "chinaz.com/go.shtml",
    redirect: "url"
  },
  coolapk: {
    matchUrl: "coolapk.com/link",
    redirect: "target"
  },
  // https://www.curseforge.com/linkout?remoteUrl=https%253a%252f%252fwww.complementary.dev%252fshaders%252f%2523download-section
  curseforge: {
    matchUrl: "curseforge.com/linkout",
    redirect: "remoteUrl"
  },
  // https://developer.aliyun.com/redirect?target=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  developeraliyun: {
    matchUrl: "developer.aliyun.com/redirect",
    redirect: "target"
  },
  // https://www.douban.com/link2/?url=http%3A%2F%2Fwww.truecrypt.org%2F&link2key=c2b1b99b0b
  douban: {
    matchUrl: "douban.com/link2",
    redirect: "url"
  },
  // https://game.bilibili.com/linkfilter/?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  bilibili: {
    matchUrl: "game.bilibili.com/linkfilter",
    redirect: "url"
  },
  // https://ref.gamer.com.tw/redir.php?url=http%3A%2F%2Fsunderfolk.com%2F
  gamer: {
    matchUrl: "ref.gamer.com.tw/redir.php",
    redirect: "url"
  },
  // https://www.gcores.com/link?target=https%3A%2F%2Fals.rjsy313.com%2F
  gcores: {
    matchUrl: "gcores.com/link",
    redirect: "target"
  },
  // https://hellogithub.com/periodical/statistics/click?target=https%3A%2F%2Fals.rjsy313.com%2F
  hellogithub: {
    matchUrl: "hellogithub.com/periodical/statistics/click",
    redirect: "target"
  },
  // https://xie.infoq.cn/link?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzg5MjU0NTI5OQ%3D%3D%26mid%3D2247604333%26idx%3D1%26sn%3D4021da1c6fb035906fd747487bbb8a23%26scene%3D21%23wechat_redirect
  xieinfoq: {
    matchUrl: "xie.infoq.cn/link",
    redirect: "target"
  },
  // https://www.infoq.cn/link?target=https%3A%2F%2Fsloanreview.mit.edu%2Farticle%2Fmanaging-the-bots-that-are-managing-the-business%2F
  infoq: {
    matchUrl: "infoq.cn/link",
    redirect: "target"
  },
  // https://www.kookapp.cn/go-wild.html?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  kookapp: {
    matchUrl: "kookapp.cn/go-wild.html",
    redirect: "url"
  },
  // https://ask.latexstudio.net/go/index?url=https%3A%2F%2Fgithub.com%2Fzepinglee%2Fciteproc-lua
  latexstudio: {
    matchUrl: "ask.latexstudio.net/go/index",
    redirect: "url"
  },
  // https://leetcode.cn/link/?target=https%3A%2F%2Fjobs.mihoyo.com%2Fm%2F%3FsharePageId%3D77920%26recommendationCode%3DGZRRW%26isRecommendation%3Dtrue%23%2Fcampus%2Fposition
  leetcode: {
    matchUrl: "leetcode.cn/link",
    redirect: "target"
  },
  linkedin: {
    matchUrl: "linkedin.com/safety/go",
    redirect: "url"
  },
  // https://link.logonews.cn/?url=http%3A%2F%2Fsunderfolk.com%2F
  logonews: {
    matchUrl: "link.logonews.cn",
    redirect: "url"
  },
  // https://www.nodeseek.com/jump?to=https%3A%2F%2Fblogverse.cn
  nodeseek: {
    matchUrl: "nodeseek.com/jump",
    redirect: "to"
  },
  // https://hd.nowcoder.com/link.html?target=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  nowcoder: {
    matchUrl: "hd.nowcoder.com/link.html",
    redirect: "target"
  },
  // https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  oschina: {
    matchUrl: "oschina.net/action/GoToLink",
    redirect: "url"
  },
  // https://www.qcc.com/web/transfer-link?link=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  qcc: {
    matchUrl: "qcc.com/web/transfer-link",
    redirect: "link"
  },
  // https://docs.qq.com/scenario/link.html?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  docsqq: {
    matchUrl: "docs.qq.com/scenario/link.html",
    redirect: "url",
    hostIcon: true
  },
  // https://www.360doc.cn/outlink.html?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  "360doc": {
    matchUrl: "360doc.cn/outlink.html",
    redirect: "url"
  },
  // https://www.instagram.com/linkshim/?u=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  instagram: {
    matchUrl: "instagram.com/linkshim",
    redirect: "u"
  },
  // https://mail.qq.com/cgi-bin/readtemplate?gourl=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  mailqq: {
    matchUrl: "mail.qq.com/cgi-bin/readtemplate",
    redirect: "gourl",
    hostIcon: true
  },
  // https://wx.mail.qq.com/xmspamcheck/xmsafejump?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  wxmailqq: {
    matchUrl: "wx.mail.qq.com/xmspamcheck/xmsafejump",
    redirect: "url",
    hostIcon: true
  },
  // https://shimo.im/outlink/black?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  shimo: {
    matchUrl: "shimo.im/outlink/black",
    redirect: "url"
  },
  // https://shimo.im/outlink/gray?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  shimo2: {
    matchUrl: "shimo.im/outlink/gray",
    redirect: "url"
  },
  // https://steamcommunity.com/linkfilter?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  steamcommunity: {
    matchUrl: "steamcommunity.com/linkfilter",
    redirect: "url"
  },
  telegram: {
    matchUrl: "t.me/iv",
    redirect: "url"
  },
  // https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fgit-scm.com%2Fbook%2Fzh%2Fv2%2Fch00%2F_commit_status&objectId=1434763&objectType=1&isNewArticle=undefined
  cloudtencent: {
    matchUrl: "cloud.tencent.com/developer/tools/blog-entry",
    redirect: "target"
  },
  // https://www.tianyancha.com/security?target=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  tianyancha: {
    matchUrl: "tianyancha.com/security",
    redirect: "target"
  },
  // https://tieba.baidu.com/mo/q/checkurl?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  tiebabaidu: {
    hostIcon: true,
    matchUrl: "tieba.baidu.com/mo/q/checkurl",
    redirect: "url"
  },
  // https://link.uisdc.com/?redirect=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  uisdc: {
    matchUrl: "link.uisdc.com",
    redirect: "redirect"
  },
  // https://developers.weixin.qq.com/community/middlepage/href?href=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  developersweixin: {
    matchUrl: "developers.weixin.qq.com/community/middlepage/href",
    redirect: "href"
  },
  // https://www.yuque.com/r/goto?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  yuque: {
    matchUrl: "yuque.com/r/goto",
    redirect: "url"
  },
  // https://www.youtube.com/redirect?q=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  youtube: {
    matchUrl: "youtube.com/redirect",
    redirect: "q"
  },
  // http://redir.yy.duowan.com/warning.php?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  duowan: {
    matchUrl: "redir.yy.duowan.com/warning.php",
    redirect: "url"
  },
  // https://weibo.cn/sinaurl?toasturl=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  // https://weibo.cn/sinaurl?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  weibo: {
    matchUrl: "weibo.cn/sinaurl",
    redirect: ["toasturl", "url"]
  },
  // https://blzxteam.com/gowild.htm?url=https_3A_2F_2Fjq_2eqq_2ecom_2F_3F_5fwv_3D1027_26k_3D1ywspCt0&u=31468&fr=https_3A_2F_2Fblzxteam_2ecom_2Fthread_2d479_2ehtm
  blzxteam: {
    matchUrl: "blzxteam.com/gowild.htm",
    redirect() {
      const url = document
        .querySelector("div._2VEbEOHfDtVWiQAJxSIrVi_0")
        .getAttribute("title")
      window.location.href = url
    },
    runAtContent: true
  },
  // https://www.yunpanziyuan.xyz/gowild.htm?url=https_3A_2F_2Fpan_2equark_2ecn_2Fs_2Fdee48eed51d7
  // https://www.yunpanziyuan.xyz/thread-522696.htm
  yunpanziyuan: {
    matchUrl: "yunpanziyuan.xyz/gowild.htm",
    redirect() {
      const url = document.querySelector("div.url_div").getAttribute("title")
      window.location.href = url
    },
    runAtContent: true
  }
}

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

const getDefaultRules = (): RuleProps[] => {
  return Object.keys(defaultRuleMap).map((id) => {
    const rule = defaultRuleMap[id]
    return {
      ...rule,
      id,
      isDefault: true
    }
  })
}

export const getMergedRules = (
  storageData: Record<string, RuleProps> = {}
): RuleProps[] => {
  const storageDataKeys = Object.keys(storageData)

  const newDefaultRules = getDefaultRules().filter((item) => {
    return !storageDataKeys.includes(item.id)
  })

  const newStorageRules = storageDataKeys.map((id) => {
    const rule = storageData[id]
    const defaultRule = defaultRuleMap[id]
    if (rule && defaultRule) {
      return {
        id,
        isDefault: true,
        ...defaultRule,
        ...rule
      }
    }

    return {
      id,
      ...rule
    }
  })

  // 根据 updateAt 排序
  const data = [...newStorageRules, ...newDefaultRules].sort((a, b) => {
    return (b.updateAt || 0) - (a.updateAt || 0)
  })
  return data
}
