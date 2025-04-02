import classnames from "classnames"
import React from "react"

export interface ModalProps {
  visible: boolean
  onClose: () => void
  children: React.ReactNode
  title?: React.ReactNode
  onOk?: () => void
  okButtonProps?: Record<string, any>
}

const Modal: React.FC<ModalProps> = (props) => {
  const { children, visible, onClose, title, onOk, okButtonProps } = props
  const { disabled } = okButtonProps || {}

  const id = React.useMemo(() => {
    return `modal-${Date.now()}`
  }, [])

  React.useEffect(() => {
    const dialog: HTMLDialogElement = document.querySelector(`#${id}`)
    dialog.addEventListener("cancel", () => {
      onClose()
    })
  }, [])

  React.useEffect(() => {
    const dialog: HTMLDialogElement = document.querySelector(`#${id}`)
    if (visible) {
      dialog.showModal()
      return
    }
    dialog.close()
  }, [visible])

  const handleOk = () => {
    if (onOk) onOk()
  }

  return (
    <dialog id={id} className="modal">
      <div className="modal-box flex flex-col">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="py-4 flex-1 overflow-auto no-scrollbar">{children}</div>
        <div className="modal-action">
          <button onClick={onClose} className="btn btn-sm">
            {chrome.i18n.getMessage("cancel")}
          </button>
          <button
            onClick={handleOk}
            className={classnames("btn btn-sm btn-primary", {
              "btn-disabled": disabled
            })}>
            {chrome.i18n.getMessage("confirm")}
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default Modal
