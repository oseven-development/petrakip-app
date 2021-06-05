export const getLocaleDateString = (date: Date) => {
  return new Date(date).toLocaleDateString('de-De', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const sortArrayDateDesc = (inArray: any[], dateCol = 'createdAt') => {
  return inArray.sort(
    // @ts-ignore

    (a: any, b: any) => new Date(b[dateCol]) - new Date(a[dateCol]),
  )
}

export const groupArrayByDate = (inArray: any[], dateCol = 'createdAt') => {
  const groups = sortArrayDateDesc(inArray).reduce((groups, day) => {
    const date = getLocaleDateString(day[dateCol])
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(day)
    return groups
  }, {})
  return groups
}
