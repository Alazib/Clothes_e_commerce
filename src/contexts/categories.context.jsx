import { createContext, useState, useEffect } from "react"
import {
  addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from "../utils/firebase/firebase.utils.js"
import SHOP_DATA from "../shop-data.js"

export const CategoriesContext = createContext({
  categoriesMap: {},
})

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({})

  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA)
  // }, [])
  //  We only use this useEffect ONCE in order to set the FireStore BBDD with the new collection 'categories'.
  // If we don't comment this useEffect, each time we run the code it will try to set up the collection

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments()
      console.log(categoryMap)
      setCategoriesMap(categoryMap)
    }
    getCategoriesMap()
  }, [])
  const value = { categoriesMap }

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}
