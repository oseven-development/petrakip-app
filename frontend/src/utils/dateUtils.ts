// Get Short Date String
// e.g. 7. Juli 2021
export const getLocaleDateString = (date: Date) => {
  return new Date(date).toLocaleDateString('de-De', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Get Full Date String
// e.g. Mittwoch, 7. Juli 2021 um 21:10
export const getLongDateString = (
  createdAt: string | null | undefined,
  backup: string,
): string => {
  if (createdAt) {
    return new Intl.DateTimeFormat('de', {
      dateStyle: 'full',
      timeStyle: 'short',
    }).format(new Date(createdAt))
  }
  return backup
}

export const sortArrayDateDesc = (
  inArray: { [key: string]: any }[],
  dateCol = 'createdAt',
) => {
  return inArray.sort(
    (a, b) => new Date(b[dateCol]).getTime() - new Date(a[dateCol]).getTime(),
  )
}

export function groupArrayByDate<T>(inArray: T[], dateCol = 'createdAt') {
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
