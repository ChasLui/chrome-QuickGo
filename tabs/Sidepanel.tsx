import classnames from "classnames"
import empty from "data-base64:~assets/empty.svg"
import React from "react"

import { useStorage } from "@plasmohq/storage/hook"

import Modal from "~components/Modal"
import { StorageKeys, type DataSourceItem } from "~utils"

import "~tailwind.less"

export interface SidepanelProps {}

// https://link.zhihu.com/?target=https%3A//www.python.org/

const defaultData = []

const Sidepanel: React.FC<SidepanelProps> = (props) => {
  const {} = props

  const [createVisible, setCreateVisible] = React.useState(false)
  const [dataSource, setDataSource] = useStorage<DataSourceItem[]>(
    StorageKeys.DATA_SOURCE,
    defaultData
  )

  const handleCreate = () => {
    setCreateVisible(true)
  }

  const handleClickUrl = (item) => {
    chrome.tabs.create({
      url: item.url
    })
  }

  const handleDelete = (item) => {
    const newDataSource = dataSource.filter((i) => i.hostname !== item.hostname)
    setDataSource(newDataSource)
  }

  const handleDisable = (item) => {
    item.disable = !item.disable
    setDataSource([...dataSource])
  }

  const handleCreateSave = (item) => {
    setDataSource([...dataSource, item])
    setCreateVisible(false)
  }

  const noData = !dataSource.length

  return (
    <div className="p-4">
      {noData && <img src={empty} alt="" />}
      <div>
        {dataSource.map((item) => {
          const { hostname } = item
          return (
            <Card
              key={hostname}
              item={item}
              handleDelete={handleDelete}
              handleDisable={handleDisable}
              handleClickUrl={handleClickUrl}
            />
          )
        })}
      </div>
      <div>
        <button
          onClick={handleCreate}
          className="btn btn-sm btn-neutral btn-block">
          创建
        </button>
      </div>
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
            禁用
          </button>
        )}
        {disable && (
          <button onClick={() => handleDisable(item)} className="btn btn-xs">
            启用
          </button>
        )}
        <button
          onClick={() => handleDelete(item)}
          className="btn btn-xs btn-secondary ml-2">
          删除
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
      if (searchParams.get("url")) {
        setRedirectKey("url")
      }
      if (searchParams.get("target")) {
        setRedirectKey("target")
      }
    })
  }, [visible])

  const handleOk = () => {
    if (!hostname || !redirectKey) return
    if (onOk) onOk({ hostname, redirectKey })
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
