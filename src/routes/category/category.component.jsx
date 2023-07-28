import { useParams } from "react-router-dom"

import "./category.styles.scss"
import { useContext, useEffect, useState } from "react"
import { CategoriesContext } from "../../contexts/categories.context"
import ProductCard from "../../components/product-card/product-card.component"

const Category = () => {
  const { category } = useParams()
  const { categoriesMap } = useContext(CategoriesContext)

  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [category, categoriesMap])

  return (
    <div className="category-container">
      {products?.map((product) => {
        return <ProductCard key={product.id} product={product}></ProductCard>
      })}
    </div>
  )
}

export default Category
