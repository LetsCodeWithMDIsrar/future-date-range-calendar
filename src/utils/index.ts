export const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'November', 'Dec' ]
export const weekDays = [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ]

export const colors = {
    white:"#fff",
    primary:"#080886",
    secondary:'#7272d4',
    lightGray:"#DDDDDD"
}

export const findTwoDatesDifference = (firstDate: string, secondDate: string) => {
  const date1: any = new Date(firstDate)
  const date2: any = new Date(secondDate)
  const diffTime = Math.abs(date1 - date2)
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return totalDays
}
