export const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'November', 'Dec' ]
export const weekDays = [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ]

export const colors = {
    white:"#fff",
    primary:"#080886",
    secondary:'#7272d4',
    lightGray:"#DDDDDD"
}

export const findTwoDatesDifference = (startDate: string, endDate: string) => {
  const firstDate: any = new Date(startDate)
  const secondDate: any = new Date(endDate)
  const diffTime = Math.abs(firstDate - secondDate)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
