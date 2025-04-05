import icon from "data-base64:~assets/icon.svg"
import React from "react"

export interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Img: React.FC<ImgProps> = (props) => {
  const { src, className, ...rProps } = props
  const [imageUrl, setImageUrl] = React.useState(src)

  React.useEffect(() => {
    if (src) {
      setImageUrl(src)
      return
    }
    setImageUrl(icon)
  }, [src])

  const onError = () => {
    setImageUrl(icon)
  }

  return (
    <img className={className} src={imageUrl} onError={onError} {...rProps} />
  )
}

export default Img
