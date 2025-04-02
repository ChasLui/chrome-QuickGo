import classnames from "classnames"
import empty from "data-base64:~assets/empty.svg"
import React from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { useThemeChange } from "~components/hooks"
import { MaterialSymbolsSettings, StreamlineEmojisBug } from "~components/Icons"
import Img from "~components/Img"
import Modal from "~components/Modal"
import { domainFaviconMap } from "~utils/favicons"
import { getDomain } from "~utils/index"
import {
  ga,
  GaEvents,
  getDocumentTitle,
  getMergedRules,
  StorageKeys,
  type RuleProps
} from "~utils/pure"

import "~tailwind.less"

export interface SidepanelProps {}

const Sidepanel: React.FC<SidepanelProps> = (props) => {
  const {} = props

  useThemeChange()
  const editRef = React.useRef<RuleProps>()
  const [createVisible, setCreateVisible] = React.useState(false)
  const [rules, setRules] = useStorage<Record<string, RuleProps>>(
    StorageKeys.RULES,
    {}
  )
  console.log("rules: ", rules)

  // React.useEffect(() => {
  //   setRules({})
  // }, [])

  const dataSource = React.useMemo(() => {
    return getMergedRules(rules)
  }, [rules])

  React.useEffect(() => {
    if (createVisible) return
    editRef.current = null
  }, [createVisible])

  const handleCreate = () => {
    ga(GaEvents.CREATE)
    editRef.current = null
    setCreateVisible(true)
  }

  const handleEdit = (item: RuleProps) => {
    if (item.isDefault) return
    ga(GaEvents.ITEM_EDIT)
    editRef.current = item
    setCreateVisible(true)
  }

  const handleClickUrl = (e, item: RuleProps) => {
    if (!item.homePage) return
    e.stopPropagation()
    chrome.tabs.create({
      url: item.homePage
    })
  }

  const handleDelete = (item: RuleProps) => {
    if (item.isDefault) return
    ga(GaEvents.ITEM_DELETE)
    const newRules = { ...rules }
    delete newRules[item.id]
    setRules(newRules)
  }

  const handleDisable = (item: RuleProps) => {
    ga(GaEvents.ITEM_DISABLE)
    setRules({
      ...rules,
      [item.id]: {
        ...rules[item.id],
        disabled: !item.disabled
      }
    })
  }

  const handleCreateSave = (item: RuleProps) => {
    ga(GaEvents.CREATE_SAVE)
    const { id, ...restProps } = item
    let updateAt = restProps.updateAt
    if (!editRef.current) {
      updateAt = Date.now()
    }
    setRules({
      ...rules,
      [id]: {
        ...(restProps as RuleProps),
        updateAt
      }
    })
    setCreateVisible(false)
  }

  const noData = !dataSource.length

  return (
    <div className="h-full flex flex-col">
      {noData && <img src={empty} alt="" />}
      <div className="flex-1 overflow-auto">
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
      <Actions handleCreate={handleCreate} />
      <Create
        onOk={handleCreateSave}
        visible={createVisible}
        editData={editRef.current}
        dataSource={dataSource}
        onClose={() => setCreateVisible(false)}
      />
    </div>
  )
}

export default Sidepanel

const Card = (props) => {
  const { item, handleClickUrl, handleDisable, handleDelete, handleEdit } =
    props

  const { matchUrl, disabled, isDefault, count, hostIcon, title, homePage } =
    item as RuleProps
  const domain = getDomain(matchUrl, hostIcon)
  const favicon = domainFaviconMap[domain]
  const iconUrl =
    favicon || `https://www.faviconextractor.com/favicon/${domain}`

  return (
    <div
      role="alert"
      onClick={() => handleEdit(item)}
      className={classnames(
        "alert flex mb-2 justify-between overflow-hidden py-3 group",
        {
          "bg-base-300": disabled,
          "hover:shadow-xl": !disabled
        }
      )}>
      <div className="flex items-center flex-1 overflow-auto">
        <div className="w-6 h-6 min-w-6 min-h-6">
          <Img
            className={classnames("w-full h-full rounded-md object--contain", {
              "filter grayscale": disabled
            })}
            src={iconUrl}
          />
        </div>
        <a
          title={homePage || matchUrl}
          target="_blank"
          className={classnames("link font-bold ml-3 text-sm ellipsis", {
            "line-through": disabled
          })}
          onClick={(e) => handleClickUrl(e, item)}>
          {title || matchUrl}
        </a>
      </div>
      <div
        className="flex flex-nowrap items-center"
        onClick={(e) => e.stopPropagation()}>
        <Count count={count} className="group-hover:hidden" />
        <input
          type="checkbox"
          className="toggle toggle-accent hidden group-hover:block"
          checked={!disabled}
          onChange={() => handleDisable(item)}
        />
        {!isDefault && (
          <button
            onClick={() => handleDelete(item)}
            className="btn btn-xs btn-error ml-2 hidden group-hover:block">
            {chrome.i18n.getMessage("delete")}
          </button>
        )}
      </div>
    </div>
  )
}

const Count = (props) => {
  const { count, className } = props

  if (!count) return null

  return (
    <div
      className={classnames(
        "badge badge-sm badge-ghost mr-2 bg-base-300 font-bold italic",
        className
      )}>
      {count.toLocaleString()}
    </div>
  )
}

const Create = (props) => {
  const { visible, onClose, onOk, editData, dataSource } = props
  const [form, setForm] = React.useState<Partial<RuleProps>>({
    title: "",
    homePage: "",
    redirect: "",
    matchUrl: ""
  })
  const [existed, setExisted] = React.useState(false)
  const redirectRef = React.useRef<HTMLInputElement>(null)
  const create = !editData

  React.useEffect(() => {
    if (!create) return
    const existed = dataSource.find((i) => i.matchUrl === form.matchUrl)
    setExisted(!!existed)
  }, [create, form.matchUrl])

  /** 编辑 */
  React.useEffect(() => {
    if (!editData) return
    setForm(editData)
  }, [editData])

  /** 新建 */
  React.useEffect(() => {
    if (!visible) return
    if (editData) return
    redirectRef.current?.focus?.()
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const activeTab = tabs[0]
      const activeTabUrl = activeTab.url
      if (["chrome://extensions/", "chrome://newtab/"].includes(activeTabUrl)) {
        return
      }
      if (!activeTabUrl) return
      const { hostname, pathname, searchParams } = new URL(activeTabUrl)
      const url = pathname ? `${hostname}${pathname}` : hostname

      const newForm: Partial<RuleProps> = {
        ...form,
        matchUrl: url
      }
      if (searchParams.get("target")) {
        newForm.redirect = searchParams.get("target")
      }
      if (searchParams.get("url")) {
        newForm.redirect = searchParams.get("url")
      }
      const title = await getDocumentTitle()
      if (title) {
        newForm.title = title
      }

      const domain = getDomain(url)
      if (domain) {
        newForm.homePage = `https://${domain}`
      }

      setForm(newForm)
    })
  }, [visible])

  const { matchUrl, redirect } = form

  const handleOk = () => {
    if (!matchUrl || !redirect) return
    const id = editData?.id || `${Date.now()}`
    if (onOk) onOk({ id, ...form })
    setForm({ matchUrl: "", redirect: "", title: "", homePage: "" })
  }

  const disabled = !matchUrl || !redirect || existed

  console.log(form, "form")

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      onOk={handleOk}
      okButtonProps={{ disabled }}>
      <div className="flex flex-col justify-center items-center">
        <div className="mb-4 px-1 w-full flex flex-col justify-center items-center">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">title</span>
            </div>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="input input-bordered w-full max-w-xs"
              placeholder="Type here"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">homePage</span>
            </div>
            <input
              type="text"
              value={form.homePage}
              onChange={(e) => setForm({ ...form, homePage: e.target.value })}
              className="input input-bordered w-full max-w-xs"
              placeholder="Type here"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">matchUrl</span>
            </div>
            <input
              type="text"
              value={matchUrl}
              onChange={(e) => setForm({ ...form, matchUrl: e.target.value })}
              className={classnames("input input-bordered w-full max-w-xs", {
                "input-error": existed
              })}
              placeholder={chrome.i18n.getMessage("placeholder_url")}
            />
            {existed && (
              <div className="label">
                <span className="label-text-alt text-error">
                  {chrome.i18n.getMessage("existed")}
                </span>
              </div>
            )}
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">redirect</span>
            </div>
            <input
              ref={redirectRef}
              type="text"
              value={redirect as string}
              onChange={(e) => setForm({ ...form, redirect: e.target.value })}
              className="input input-bordered w-full max-w-xs"
              placeholder={chrome.i18n.getMessage("placeholder_parameter")}
            />
          </label>
        </div>
      </div>
    </Modal>
  )
}

const Actions = (props) => {
  const { handleCreate } = props

  const handleIssue = () => {
    ga(GaEvents.ACTIONS_ISSUE)

    chrome.tabs.create({
      url: "https://github.com/Dolov/chrome-QuickGo/issues"
    })
  }

  const handleSetting = () => {
    ga(GaEvents.ACTIONS_SETTING)
    chrome.tabs.create({
      url: "tabs/Settings.html"
    })
  }

  return (
    <div className="flex items-center pt-4">
      <button
        onClick={handleCreate}
        className="btn btn-sm btn-neutral btn-block flex-1">
        {chrome.i18n.getMessage("create")}
      </button>
      <div className="flex">
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
    </div>
  )
}
