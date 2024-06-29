import classnames from "classnames"
import empty from "data-base64:~assets/empty.svg"
import React from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { MaterialSymbolsSettings, StreamlineEmojisBug } from "~components/Icons"
import Modal from "~components/Modal"
import { ga, StorageKeys, type DataSourceItem } from "~utils"

import "~tailwind.less"

export interface SidepanelProps {}

// https://link.zhihu.com/?target=https%3A//www.python.org/

const defaultData = [
  {
    id: 1,
    hostname: "link.zhihu.com",
    redirectKey: "target",
    disable: false
  },
  {
    id: 2,
    hostname: "link.juejin.cn",
    redirectKey: "target",
    disable: false
  },
  {
    id: 3,
    hostname: "www.jianshu.com",
    redirectKey: "url",
    disable: false
  }
]

const Sidepanel: React.FC<SidepanelProps> = (props) => {
  const {} = props

  const [createVisible, setCreateVisible] = React.useState(false)
  const [dataSource, setDataSource] = useStorage<DataSourceItem[]>(
    StorageKeys.DATA_SOURCE,
    defaultData
  )

  const handleCreate = () => {
    ga("create")
    setCreateVisible(true)
  }

  const handleClickUrl = (item) => {
    chrome.tabs.create({
      url: `https://${item.hostname}`
    })
  }

  const handleDelete = (item) => {
    ga("item_delete")
    const newDataSource = dataSource.filter((i) => i.id !== item.id)
    setDataSource(newDataSource)
  }

  const handleDisable = (item) => {
    ga("item_disable")
    item.disable = !item.disable
    setDataSource([...dataSource])
  }

  const handleCreateSave = (item) => {
    ga("create_save")
    setDataSource([...dataSource, item])
    setCreateVisible(false)
  }

  const noData = !dataSource.length

  return (
    <div className="p-4 h-full flex flex-col">
      {noData && <img src={empty} alt="" />}
      <div className="flex-1 overflow-auto">
        <div>
          {dataSource.map((item) => {
            const { id } = item
            return (
              <Card
                key={id}
                item={item}
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
        onClose={() => setCreateVisible(false)}
      />
    </div>
  )
}

export default Sidepanel

const Card = (props) => {
  const { item, handleClickUrl, handleDisable, handleDelete } = props
  const { hostname, redirectKey, disable } = item
  const src = `https://favicon.freeless.cn/icon/${encodeURIComponent(hostname)}`
  return (
    <div
      role="alert"
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
          {hostname}
        </a>
      </div>
      <div className="flex flex-nowrap">
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
  const { visible, onClose, onOk } = props
  const [hostname, setHostname] = React.useState("")
  const [redirectKey, setRedirectKey] = React.useState("")

  React.useEffect(() => {
    if (!visible) return
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0]
      const activeTabUrl = activeTab.url
      if (["chrome://extensions/", "chrome://newtab/"].includes(activeTabUrl)) {
        return
      }
      if (!activeTabUrl) return
      const { hostname, searchParams } = new URL(activeTabUrl)
      setHostname(hostname)
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
    if (!hostname || !redirectKey) return
    if (onOk) onOk({ hostname, redirectKey, id: Date.now() })
    setHostname("")
    setRedirectKey("")
  }

  return (
    <Modal visible={visible} onClose={onClose} onOk={handleOk}>
      <div className="flex flex-col justify-center items-center">
        <input
          type="text"
          placeholder="Type url here"
          className="input input-bordered input-primary w-[97%] max-w-xs mb-4"
          value={hostname}
          onChange={(e) => setHostname(e.target.value)}
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
    <div className={className}>
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
