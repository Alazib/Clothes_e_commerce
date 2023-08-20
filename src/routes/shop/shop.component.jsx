import { Routes, Route } from "react-router-dom"
import "./shop.styles.scss"
import CategoriesPreview from "../categories-preview/categories-preview.component"
import Category from "../category/category.component"
import { useEffect } from "react"
import { setCategoriesAction } from "../../store/categories/categories.action"
import { useDispatch } from "react-redux"
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils"

const Shop = () => {
  const dispatch = useDispatch()

  //We could put this useEffect in App.js as we did with the auth firebase listener for de user. It wouldn't be wrong, technically speaking.
  // The auth firebase listener needs to be trigger as soon as the App loads. But, we don't need Categories as soon as the aut firebase listener does:
  //the 2 components who need it are Category and CategoriesPreview...so, we put the useEffect who fetches Categories from firebase in their first common ancestor --> Shop.
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments()

      dispatch(setCategoriesAction(categoriesArray))
    }
    getCategoriesMap()
  }, [])

  return (
    <Routes>
      <Route index element={<CategoriesPreview />}></Route>
      <Route path=":category" element={<Category />}></Route>
    </Routes>
  )
}

export default Shop
