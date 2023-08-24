import { useParams } from "react-router-dom"
import "./category.styles.scss"
import { useEffect, useState } from "react"
import ProductCard from "../../components/product-card/product-card.component"
import { useSelector } from "react-redux"
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/categories.selector"
import Spinner from "../../components/spinner/spinner.component"

const Category = () => {
  const { category } = useParams()

  const categoriesMap = useSelector(selectCategoriesMap)
  const isLoading = useSelector(selectCategoriesIsLoading)

  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [category, categoriesMap])

  return (
    <>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {isLoading ? (
          <Spinner></Spinner>
        ) : (
          products?.map((product) => {
            return (
              <ProductCard key={product.id} product={product}></ProductCard>
            )
          })
        )}
      </div>
    </>
  )
}

export default Category
