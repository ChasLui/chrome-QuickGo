import classnames from "classnames"
import empty from "data-base64:~assets/empty.svg"
import React from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { useThemeChange } from "~components/hooks"
import { MaterialSymbolsSettings, StreamlineEmojisBug } from "~components/Icons"
import Modal from "~components/Modal"
import { ga, StorageKeys, type DataSourceItem } from "~utils"

import "~tailwind.less"

export interface SidepanelProps {}

// https://link.zhihu.com/?target=https%3A//www.python.org/

const defaultData = [
  {
    id: 1,
    matchUrl: "link.zhihu.com",
    redirectKey: "target",
    disable: false
  },
  {
    id: 2,
    matchUrl: "link.juejin.cn",
    redirectKey: "target",
    disable: false
  },
  {
    id: 3,
    matchUrl: "www.jianshu.com/go-wild",
    redirectKey: "url",
    disable: false
  }
]

const Sidepanel: React.FC<SidepanelProps> = (props) => {
  const {} = props

  useThemeChange()
  const editRef = React.useRef<DataSourceItem>()
  const [createVisible, setCreateVisible] = React.useState(false)
  const [dataSource, setDataSource] = useStorage<DataSourceItem[]>(
    StorageKeys.DATA_SOURCE,
    defaultData
  )

  const handleCreate = () => {
    ga("create")
    editRef.current = null
    setCreateVisible(true)
  }

  const handleEdit = (item: DataSourceItem) => {
    ga("item_edit")
    editRef.current = item
    setCreateVisible(true)
  }

  const handleClickUrl = (item: DataSourceItem) => {
    chrome.tabs.create({
      url: `https://${item.matchUrl}`
    })
  }

  const handleDelete = (item: DataSourceItem) => {
    ga("item_delete")
    const newDataSource = dataSource.filter((i) => i.id !== item.id)
    setDataSource(newDataSource)
  }

  const handleDisable = (item: DataSourceItem) => {
    ga("item_disable")
    item.disable = !item.disable
    setDataSource([...dataSource])
  }

  const handleCreateSave = (item: DataSourceItem) => {
    ga("create_save")
    if (editRef.current) {
      const index = dataSource.findIndex((i) => i.id === editRef.current.id)
      const newDataSource = [...dataSource]
      newDataSource[index] = item
      setDataSource(newDataSource)
    } else {
      setDataSource([...dataSource, item])
    }
    setCreateVisible(false)
  }

  const noData = !dataSource.length

  return (
    <div className="h-full flex flex-col">
      <button onClick={() => setDataSource(defaultData)}>shezhi</button>
      {noData && <img src={empty} alt="" />}
      <div className="flex-1 overflow-auto">
        <div>
          {dataSource.map((item) => {
            const { id } = item
            return (
              <Card
                key={id}
                item={item}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleDisable={handleDisable}
                handleClickUrl={handleClickUrl}
              />
            )
          })}
        </div>
        <button
          onClick={handleCreate}
          className="btn btn-sm btn-neutral btn-block">
          {chrome.i18n.getMessage("create")}
        </button>
      </div>
      <Actions className="flex justify-end pt-4" />
      <Create
        onOk={handleCreateSave}
        visible={createVisible}
        editData={editRef.current}
        onClose={() => setCreateVisible(false)}
      />
    </div>
  )
}

export default Sidepanel

const Card = (props) => {
  const { item, handleClickUrl, handleDisable, handleDelete, handleEdit } =
    props
  const { matchUrl, disable } = item as DataSourceItem
  const src = `https://favicon.freeless.cn/icon/${encodeURIComponent(matchUrl)}`
  return (
    <div
      role="alert"
      onClick={() => handleEdit(item)}
      className={classnames(
        "alert flex mb-3 justify-between overflow-hidden cursor-pointer",
        {
          "bg-base-300": disable,
          "hover:shadow-xl": !disable
        }
      )}>
      <div className="flex items-center flex-1 overflow-auto">
        <img className="w-6 h-6" src={src} alt="" />
        <a
          target="_blank"
          className="link font-bold ml-3 text-sm ellipsis"
          onClick={() => handleClickUrl(item)}>
          {matchUrl}
        </a>
      </div>
      <div className="flex flex-nowrap" onClick={(e) => e.stopPropagation()}>
        {!disable && (
          <button
            onClick={() => handleDisable(item)}
            className="btn btn-xs btn-accent">
            {chrome.i18n.getMessage("disable")}
          </button>
        )}
        {disable && (
          <button onClick={() => handleDisable(item)} className="btn btn-xs">
            {chrome.i18n.getMessage("enable")}
          </button>
        )}
        <button
          onClick={() => handleDelete(item)}
          className="btn btn-xs btn-secondary ml-2">
          {chrome.i18n.getMessage("delete")}
        </button>
      </div>
    </div>
  )
}

const Create = (props) => {
  const { visible, onClose, onOk, editData } = props
  const [matchUrl, setMatchUrl] = React.useState("")
  const [redirectKey, setRedirectKey] = React.useState("")

  /** 编辑 */
  React.useEffect(() => {
    if (!editData) return
    const { matchUrl, redirectKey } = editData
    setMatchUrl(matchUrl)
    setRedirectKey(redirectKey)
  }, [editData])

  /** 新建 */
  React.useEffect(() => {
    if (!visible) return
    if (editData) return
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0]
      const activeTabUrl = activeTab.url
      if (["chrome://extensions/", "chrome://newtab/"].includes(activeTabUrl)) {
        return
      }
      if (!activeTabUrl) return
      const { hostname, pathname, searchParams } = new URL(activeTabUrl)
      const url = pathname ? `${hostname}${pathname}` : hostname
      setMatchUrl(url)
      if (searchParams.get("target")) {
        setRedirectKey("target")
        return
      }
      if (searchParams.get("url")) {
        setRedirectKey("url")
      }
    })
  }, [visible])

  const handleOk = () => {
    if (!matchUrl || !redirectKey) return
    const id = editData?.id || Date.now()
    if (onOk) onOk({ matchUrl, redirectKey, id })
    setMatchUrl("")
    setRedirectKey("")
  }

  return (
    <Modal visible={visible} onClose={onClose} onOk={handleOk}>
      <div className="flex flex-col justify-center items-center">
        <input
          type="text"
          placeholder="Type url here"
          className="input input-bordered input-primary w-[97%] max-w-xs mb-4"
          value={matchUrl}
          onChange={(e) => setMatchUrl(e.target.value)}
        />
        <input
          autoFocus
          type="text"
          placeholder="Type redirect key here"
          className="input input-bordered input-primary w-[97%] max-w-xs"
          value={redirectKey}
          onChange={(e) => setRedirectKey(e.target.value)}
        />
      </div>
    </Modal>
  )
}

const Actions = (props) => {
  const { className } = props

  const handleIssue = () => {
    ga("actions_issues")
    chrome.tabs.create({
      url: "https://github.com/Dolov/chrome-QuickGo/issues"
    })
  }

  const handleSetting = () => {
    ga("actions_setting")
    chrome.tabs.create({
      url: "tabs/Settings.html"
    })
  }

  return (
    <div className={className} onClick={(e) => e.stopPropagation()}>
      <div
        className="tooltip"
        data-tip={chrome.i18n.getMessage("actions_issues")}>
        <button onClick={handleIssue} className="btn btn-sm btn-circle mx-2">
          <StreamlineEmojisBug className="text-xl" />
        </button>
      </div>
      <div
        className="tooltip"
        data-tip={chrome.i18n.getMessage("actions_setting")}>
        <button
          onClick={handleSetting}
          className="btn btn-sm btn-circle mx-2 group">
          <MaterialSymbolsSettings className="text-xl group-hover:text-primary" />
        </button>
      </div>
    </div>
  )
}
