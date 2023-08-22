export const createAction = (type, payload) => {
  console.log({ type, payload })
  return { type, payload }
}
