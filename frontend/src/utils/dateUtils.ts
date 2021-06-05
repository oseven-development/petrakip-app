export const getLocaleDateString = (date: Date) => {
  return new Date(date).toLocaleDateString('de-De', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
