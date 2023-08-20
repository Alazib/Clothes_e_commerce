//The selectors should transform the data into the final shape that you want
// ir orden to pass it to the reducer (the only performance that a reducer has to do is that: to reduce).
// It is where the bussines logic of Redux lives

export const selectCategoriesMap = (state) =>
  state.categories.categories.reduce((acc, category) => {
    const { title, items } = category
    acc[title.toLowerCase()] = items
    return acc
  }, {})
