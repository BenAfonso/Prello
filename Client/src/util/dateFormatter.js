export const dateFormatter = (d) => {
  console.log(d)
  let date = new Date(d)
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`
}
