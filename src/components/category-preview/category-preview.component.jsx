import "./category-preview.styles.scss"
import ProductCard from "../../components/product-card/product-card.component"

const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview-container">
      <h2>
        <span className="title">{title.toUpperCase()}</span>
      </h2>
      {/* We use a filter here with index < 4 because, in this preview, we only want to show de first 4 products form each category */}
      <div className="preview">
        {products
          .filter((_, index) => index < 4)
          .map((product) => {
            return (
              <ProductCard key={product.id} product={product}></ProductCard>
            )
          })}
      </div>
    </div>
  )
}

export default CategoryPreview
