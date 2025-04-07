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
  redirect: string | string[] | ((callback) => void)
  title?: string
  // 使用 hostname 的图标
  hostIcon?: boolean
  // 在 contentjs 中生效
  runAtContent?: boolean
  // 更新时间
  updateAt?: number
  // 主页
  homePage?: string
}

const defaultRuleMap: Record<string, BaseRuleProps> = {
  // https://link.zhihu.com/?target=https%3A//manus.im/
  zhihu: {
    title: "知乎 - 有问题，就会有答案",
    homePage: "https://www.zhihu.com/",
    matchUrl: "link.zhihu.com",
    redirect: "target"
  },
  // https://link.juejin.cn/?target=https%3A%2F%2Fcodesandbox.io%2Fp%2Fsandbox%2Fxwxsv6
  juejin: {
    title: "稀土掘金",
    homePage: "https://juejin.cn/",
    matchUrl: "link.juejin.cn",
    redirect: "target"
  },
  // https://links.jianshu.com/go?to=https%3A%2F%2Fdbarobin.com%2F2017%2F01%2F24%2Fgithub-acceleration-best-practices%2F
  jianshu: {
    title: "简书 - 创作你的创作",
    homePage: "https://www.jianshu.com/",
    matchUrl: "links.jianshu.com/go",
    redirect: "to"
  },
  // https://www.jianshu.com/go-wild?ac=2&url=https%3A%2F%2Fwww.runoob.com%2Fjs%2Fjs-intro.html
  jianshu2: {
    title: "简书 - 创作你的创作",
    homePage: "https://www.jianshu.com/",
    matchUrl: "jianshu.com/go-wild",
    redirect: "url"
  },
  // https://gitee.com/link?target=https%3A%2F%2Fnano.hyperf.wiki
  gitee: {
    title: "Gitee - 基于 Git 的代码托管和研发协作平台",
    homePage: "https://gitee.com/",
    matchUrl: "gitee.com/link",
    redirect: "target"
  },
  // https://link.csdn.net/?from_id=145825938&target=https%3A%2F%2Fgithub.com%2Fyour-repo%2Fcompression-template
  csdn: {
    title: "CSDN - 专业开发者社区",
    homePage: "https://www.csdn.net/",
    matchUrl: "link.csdn.net",
    redirect: "target"
  },
  // https://sspai.com/link?target=https%3A%2F%2Fwww.digitalocean.com%2Fcommunity%2Ftools%2Fnginx%3Fglobal.app.lang%3DzhCN
  sspai: {
    title: "少数派 - 高效工作，品质生活",
    homePage: "https://sspai.com/",
    matchUrl: "sspai.com/link",
    redirect: "target"
  },
  // https://afdian.com/link?target=https%3A%2F%2Flarkcommunity.feishu.cn%2Fbase%2FM2gsbZmBtaHyagsOtbrca2c2nvh
  afdian: {
    title: "爱发电 · 连接创作者与粉丝的会员制平台",
    homePage: "https://afdian.com/",
    matchUrl: "afdian.com/link",
    redirect: "target"
  },
  // https://www.baike.com/redirect_link?url=https%3A%2F%2Fwww.zdnet.com%2Farticle%2Fgithub-builds-a-search-engine-for-code-from-scratch-in-rust%2F&collect_params=%7B%22doc_title%22%3A%22github%22%2C%22doc_id%22%3A%227239981009876418592%22%2C%22version_id%22%3A%227473689138244403212%22%2C%22reference_type%22%3A%22web%22%2C%22link%22%3A%22https%3A%2F%2Fwww.zdnet.com%2Farticle%2Fgithub-builds-a-search-engine-for-code-from-scratch-in-rust%2F%22%2C%22author%22%3A%22%22%2C%22title%22%3A%22GitHubbuiltanewsearchengineforcode%27fromscratch%27inRust%22%2C%22reference_tag%22%3A%22%22%2C%22source_name%22%3A%22zdnet%22%2C%22publish_date%22%3A%22%22%2C%22translator%22%3A%22%22%2C%22volume%22%3A%22%22%2C%22period%22%3A%22%22%2C%22page%22%3A%22%22%2C%22doi%22%3A%22%22%2C%22version%22%3A%22%22%2C%22publish_area%22%3A%22%22%2C%22publisher%22%3A%22%22%2C%22book_number%22%3A%22%22%7D
  baike: {
    title: "快懂百科",
    homePage: "https://www.baike.com/",
    matchUrl: "baike.com/redirect_link",
    redirect: "url"
  },
  // https://www.chinaz.com/go.shtml?url=https://mp.weixin.qq.com/s/vhv4Eb5XoA2d4LKRqVRQag
  chinaz: {
    title: "站长之家 - 站长资讯-我们致力于为中文网站提供动力！",
    homePage: "https://www.chinaz.com/",
    matchUrl: "chinaz.com/go.shtml",
    redirect: "url"
  },
  coolapk: {
    title: "酷安 - 分享美好科技生活",
    homePage: "https://www.coolapk.com/",
    matchUrl: "coolapk.com/link",
    redirect: "target"
  },
  // https://www.curseforge.com/linkout?remoteUrl=https%253a%252f%252fwww.complementary.dev%252fshaders%252f%2523download-section
  curseforge: {
    title: "CurseForge - Mods & Addons Leading Community",
    homePage: "https://www.curseforge.com/",
    matchUrl: "curseforge.com/linkout",
    redirect: "remoteUrl"
  },
  // https://developer.aliyun.com/redirect?target=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  developeraliyun: {
    title: "阿里云开发者社区-云计算社区-阿里云",
    homePage: "https://developer.aliyun.com/",
    matchUrl: "developer.aliyun.com/redirect",
    redirect: "target"
  },
  // https://www.douban.com/link2/?url=http%3A%2F%2Fwww.truecrypt.org%2F&link2key=c2b1b99b0b
  douban: {
    title: "豆瓣",
    homePage: "https://www.douban.com/",
    matchUrl: "douban.com/link2",
    redirect: "url"
  },
  // https://game.bilibili.com/linkfilter/?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  bilibili: {
    title: "bilibili游戏丨你的幻想世界",
    homePage: "https://game.bilibili.com/",
    matchUrl: "game.bilibili.com/linkfilter",
    redirect: "url"
  },
  // https://ref.gamer.com.tw/redir.php?url=http%3A%2F%2Fsunderfolk.com%2F
  gamer: {
    title: "巴哈姆特電玩資訊站",
    homePage: "https://www.gamer.com.tw/",
    matchUrl: "ref.gamer.com.tw/redir.php",
    redirect: "url"
  },
  // https://www.gcores.com/link?target=https%3A%2F%2Fals.rjsy313.com%2F
  gcores: {
    title: "机核 GCORES",
    homePage: "https://www.gcores.com/",
    matchUrl: "gcores.com/link",
    redirect: "target"
  },
  // https://hellogithub.com/periodical/statistics/click?target=https%3A%2F%2Fals.rjsy313.com%2F
  hellogithub: {
    title: "有趣的开源社区 - HelloGitHub",
    homePage: "https://hellogithub.com/",
    matchUrl: "hellogithub.com/periodical/statistics/click",
    redirect: "target"
  },
  // https://xie.infoq.cn/link?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzg5MjU0NTI5OQ%3D%3D%26mid%3D2247604333%26idx%3D1%26sn%3D4021da1c6fb035906fd747487bbb8a23%26scene%3D21%23wechat_redirect
  xieinfoq: {
    title: "InfoQ 写作社区-专业技术博客社区",
    homePage: "https://xie.infoq.cn/",
    matchUrl: "xie.infoq.cn/link",
    redirect: "target"
  },
  // https://www.infoq.cn/link?target=https%3A%2F%2Fsloanreview.mit.edu%2Farticle%2Fmanaging-the-bots-that-are-managing-the-business%2F
  infoq: {
    title: "InfoQ - 促进软件开发及相关领域知识与创新的传播-极客邦",
    homePage: "https://www.infoq.cn/",
    matchUrl: "infoq.cn/link",
    redirect: "target"
  },
  // https://www.kookapp.cn/go-wild.html?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  kookapp: {
    title: "KOOK,一个好用的语音沟通工具 - 官方网站",
    homePage: "https://www.kookapp.cn/",
    matchUrl: "kookapp.cn/go-wild.html",
    redirect: "url"
  },
  // https://ask.latexstudio.net/go/index?url=https%3A%2F%2Fgithub.com%2Fzepinglee%2Fciteproc-lua
  latexstudio: {
    title: "LaTeX问答",
    homePage: "https://ask.latexstudio.net/",
    matchUrl: "ask.latexstudio.net/go/index",
    redirect: "url"
  },
  // https://leetcode.cn/link/?target=https%3A%2F%2Fjobs.mihoyo.com%2Fm%2F%3FsharePageId%3D77920%26recommendationCode%3DGZRRW%26isRecommendation%3Dtrue%23%2Fcampus%2Fposition
  leetcode: {
    title: "力扣 (LeetCode) 全球极客挚爱的技术成长平台",
    homePage: "https://leetcode.cn/",
    matchUrl: "leetcode.cn/link",
    redirect: "target"
  },
  linkedin: {
    title: "领英 - 人人都在领英",
    homePage: "https://www.linkedin.com/",
    matchUrl: "linkedin.com/safety/go",
    redirect: "url"
  },
  // https://link.logonews.cn/?url=http%3A%2F%2Fsunderfolk.com%2F
  logonews: {
    title: "标志情报局 - 全球LOGO新闻和品牌设计趋势平台",
    homePage: "https://logonews.cn/",
    matchUrl: "link.logonews.cn",
    redirect: "url"
  },
  // https://www.nodeseek.com/jump?to=https%3A%2F%2Fblogverse.cn
  nodeseek: {
    title: "开发者社区 · 运维实践 · 开源技术交流",
    homePage: "https://www.nodeseek.com/",
    matchUrl: "nodeseek.com/jump",
    redirect: "to"
  },
  // https://hd.nowcoder.com/link.html?target=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  nowcoder: {
    title:
      "牛客网 - 找工作神器|笔试题库|面试经验|实习招聘内推，求职就业一站解决_牛客网",
    homePage: "https://www.nowcoder.com/",
    matchUrl: "hd.nowcoder.com/link.html",
    redirect: "target"
  },
  // https://www.oschina.net/action/GoToLink?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  oschina: {
    title: "OSCHINA - 中文开源技术交流社区",
    homePage: "https://www.oschina.net/",
    matchUrl: "oschina.net/action/GoToLink",
    redirect: "url"
  },
  // https://www.qcc.com/web/transfer-link?link=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  qcc: {
    title: "企查查 - 查企业_查老板_查风险_企业信息查询系统",
    homePage: "https://www.qcc.com/",
    matchUrl: "qcc.com/web/transfer-link",
    redirect: "link"
  },
  // https://docs.qq.com/scenario/link.html?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  docsqq: {
    title: "腾讯文档-官方网站-支持多人在线编辑Word、Excel和PPT文档",
    homePage: "https://docs.qq.com/",
    matchUrl: "docs.qq.com/scenario/link.html",
    redirect: "url",
    hostIcon: true
  },
  // https://www.360doc.cn/outlink.html?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  "360doc": {
    title: "360doc个人图书馆",
    homePage: "https://www.360doc.cn/",
    matchUrl: "360doc.cn/outlink.html",
    redirect: "url"
  },
  // https://www.instagram.com/linkshim/?u=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  instagram: {
    title: "Instagram",
    homePage: "https://www.instagram.com/",
    matchUrl: "instagram.com/linkshim",
    redirect: "u"
  },
  // https://mail.qq.com/cgi-bin/readtemplate?gourl=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  mailqq: {
    title: "腾讯企业邮箱",
    homePage: "https://mail.qq.com/",
    matchUrl: "mail.qq.com/cgi-bin/readtemplate",
    redirect: "gourl",
    hostIcon: true
  },
  // https://wx.mail.qq.com/xmspamcheck/xmsafejump?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  wxmailqq: {
    title: "腾讯企业邮箱",
    homePage: "https://mail.qq.com/",
    matchUrl: "wx.mail.qq.com/xmspamcheck/xmsafejump",
    redirect: "url",
    hostIcon: true
  },
  // https://shimo.im/outlink/black?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  shimo: {
    title:
      "石墨文档官网-在线协同办公系统平台,支持云端多人在线协作文档,表格,幻灯片",
    homePage: "https://shimo.im/",
    matchUrl: "shimo.im/outlink/black",
    redirect: "url"
  },
  // https://shimo.im/outlink/gray?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  shimo2: {
    title:
      "石墨文档官网-在线协同办公系统平台,支持云端多人在线协作文档,表格,幻灯片",
    homePage: "https://shimo.im/",
    matchUrl: "shimo.im/outlink/gray",
    redirect: "url"
  },
  // https://steamcommunity.com/linkfilter?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  steamcommunity: {
    title: "Steam 社区",
    homePage: "https://steamcommunity.com/",
    matchUrl: "steamcommunity.com/linkfilter",
    redirect: "url"
  },
  telegram: {
    title: "Telegram Messenger",
    homePage: "https://telegram.org/",
    matchUrl: "t.me/iv",
    redirect: "url"
  },
  // https://cloud.tencent.com/developer/tools/blog-entry?target=https%3A%2F%2Fgit-scm.com%2Fbook%2Fzh%2Fv2%2Fch00%2F_commit_status&objectId=1434763&objectType=1&isNewArticle=undefined
  cloudtencent: {
    title: "腾讯云开发者社区-腾讯云",
    homePage: "https://cloud.tencent.com/",
    matchUrl: "cloud.tencent.com/developer/tools/blog-entry",
    redirect: "target"
  },
  // https://www.tianyancha.com/security?target=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  tianyancha: {
    title:
      "天眼查-商业查询平台_企业信息查询_公司查询_工商查询_企业信用信息系统",
    homePage: "https://www.tianyancha.com/",
    matchUrl: "tianyancha.com/security",
    redirect: "target"
  },
  // https://tieba.baidu.com/mo/q/checkurl?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  tiebabaidu: {
    hostIcon: true,
    title: "百度贴吧——全球领先的中文社区",
    homePage: "https://tieba.baidu.com/",
    matchUrl: "tieba.baidu.com/mo/q/checkurl",
    redirect: "url"
  },
  // https://link.uisdc.com/?redirect=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  uisdc: {
    title:
      "优设网官网 - UISDC - 国内专业设计师平台 - 看设计文章，学AIGC教程，找灵感素材，尽在优设网！",
    homePage: "https://www.uisdc.com/",
    matchUrl: "link.uisdc.com",
    redirect: "redirect"
  },
  // https://developers.weixin.qq.com/community/middlepage/href?href=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  developersweixin: {
    title: "微信开发者社区",
    hostIcon: true,
    homePage: "https://developers.weixin.qq.com/",
    matchUrl: "developers.weixin.qq.com/community/middlepage/href",
    redirect: "href"
  },
  // https://www.yuque.com/r/goto?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  yuque: {
    title: "语雀，为每一个人提供优秀的文档和知识库工具",
    homePage: "https://www.yuque.com/",
    matchUrl: "yuque.com/r/goto",
    redirect: "url"
  },
  // https://www.youtube.com/redirect?q=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  youtube: {
    title: "YouTube",
    homePage: "https://www.youtube.com/",
    matchUrl: "youtube.com/redirect",
    redirect: "q"
  },
  // http://redir.yy.duowan.com/warning.php?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  duowan: {
    title: "多玩游戏网",
    homePage: "https://www.duowan.com/",
    matchUrl: "redir.yy.duowan.com/warning.php",
    redirect: "url"
  },
  // https://weibo.cn/sinaurl?toasturl=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  // https://weibo.cn/sinaurl?url=https%3A%2F%2Fwww.aliwork.com%2Fo%2Fcursor
  weibo: {
    title: "微博",
    homePage: "https://weibo.cn/",
    matchUrl: "weibo.cn/sinaurl",
    redirect: ["toasturl", "url"]
  },
  // https://blzxteam.com/gowild.htm?url=https_3A_2F_2Fjq_2eqq_2ecom_2F_3F_5fwv_3D1027_26k_3D1ywspCt0&u=31468&fr=https_3A_2F_2Fblzxteam_2ecom_2Fthread_2d479_2ehtm
  blzxteam: {
    title: "碧蓝之星_深海迷航社区",
    homePage: "https://blzxteam.com/",
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
    title: "云盘资源网最新地址发布页",
    homePage: "https://www.yunpanziyuan.xyz/",
    matchUrl: "yunpanziyuan.xyz/gowild.htm",
    runAtContent: true,
    redirect(updateLog) {
      updateLog()
      const url = document.querySelector("div.url_div").getAttribute("title")
      window.location.href = url
    }
  },
  // https://bbs.acgrip.com/thread-5675-1-1.html
  acgrip: {
    title: "Anime字幕论坛 - Powered by Discuz!",
    homePage: "https://bbs.acgrip.com/",
    matchUrl: "bbs.acgrip.com/(*)",
    runAtContent: true,
    redirect(updateLog) {
      document.querySelectorAll("a").forEach((elem) => {
        if (
          elem.href &&
          elem.href.startsWith("http") &&
          !elem.href.includes(window.location.host)
        ) {
          elem.addEventListener("click", (event) => {
            event.preventDefault()
            updateLog()
            // @ts-ignore
            window.hideMenu("fwin_dialog", "dialog")
            window.open(elem.href, "_blank")
          })
        }
      })
    }
  },
  // https://www.bookmarkearth.cn/view/863157e793d711edb9f55254005bdbf9
  bookmarkearth: {
    title: "书签地球-中国首家浏览器书签共享搜索引擎平台",
    homePage: "https://www.bookmarkearth.cn/",
    matchUrl: "bookmarkearth.cn/view/(*)",
    runAtContent: true,
    redirect(updateLog) {
      updateLog()
      window.location.replace(document.querySelector("p.link").innerHTML)
    }
  },
  // https://blog.51cto.com/transfer?https://cloud.tencent.com/product/lke?from_column=20421&from=20421
  "51cto": {
    title: "技术成就梦想51CTO-中国知名的数字化人才学习平台和技术社区",
    homePage: "https://51cto.com/",
    matchUrl: "blog.51cto.com/transfer",
    runAtContent: true,
    redirect(updateLog) {
      updateLog()
      window.location.href = window.location.href.replace(
        "https://blog.51cto.com/transfer?",
        ""
      )
    }
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
  const defaultRules = getDefaultRules()

  const mergedRules = defaultRules.map((defaultRule) => {
    const id = defaultRule.id
    if (storageData[id]) {
      return {
        id,
        isDefault: true,
        ...defaultRule,
        ...storageData[id]
      }
    }
    return defaultRule
  })

  for (const id in storageData) {
    if (!defaultRules.some((rule) => rule.id === id)) {
      mergedRules.push({ id, ...storageData[id] })
    }
  }

  return mergedRules.sort((a, b) => (b.updateAt || 0) - (a.updateAt || 0))
}

export const getDocumentTitle = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs.length || !tabs[0].id) {
        reject(new Error("No active tab found"))
        return
      }

      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: () => document.title
        },
        (results) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message))
            return
          }

          if (results && results[0]?.result) {
            resolve(results[0].result)
          } else {
            reject(new Error("Failed to get document title"))
          }
        }
      )
    })
  })
}
