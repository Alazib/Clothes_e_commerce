import ProductCard from "../../components/product-card/product-card.component"
import { CategoriesContext } from "../../contexts/categories.context"
import { useContext, Fragment } from "react"
import "./shop.styles.scss"

const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext)
  return (
    <>
      {Object.keys(categoriesMap).map((title) => {
        return (
          //We use here a Fragment instead of a simpe <></> beacause we need to add it a Key prop
          <Fragment key={title}>
            <h2>{title}</h2>

            <div className="products-container">
              {categoriesMap[title].map((product) => {
                return (
                  <ProductCard product={product} key={product.id}></ProductCard>
                )
              })}
            </div>
          </Fragment>
        )
      })}
    </>
  )
}

export default Shop
