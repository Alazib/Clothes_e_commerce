import { useNavigate } from "react-router-dom"
import {
  BackGroundImage,
  Body,
  DirectoryItemContainer,
} from "./directory-item.styles.jsx"

const DirectoryItem = ({ category }) => {
  const navigate = useNavigate()
  const { imageUrl, title } = category

  return (
    <DirectoryItemContainer
      onClick={() => {
        navigate(`/shop/${title.toLowerCase()}`)
      }}
    >
      <BackGroundImage imageurl={imageUrl} />
      <Body>
        <h2>{title.toUpperCase()}</h2>
        <p>Shop now</p>
      </Body>
    </DirectoryItemContainer>
  )
}

export default DirectoryItem
