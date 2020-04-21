export const dateFormatter = (date) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  const d = new Date(date)
  const month = months[d.getMonth()]
  const year = d.getFullYear('yyyy')
  let dt = d.getDate()

  if (dt < 10) {
    dt = '0' + dt
  }

  return `${month} ${dt}, ${year}`
}