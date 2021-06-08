import React from 'react'
import { useLocation } from 'react-router-dom'

interface UpdateQueryParamState {
  currentUrl: string
  UpdateURL: (key: string, value: string) => void
  UpdateURLAndRoute: (key: string, value: string, route: string) => void
}

export const useUpdateQueryParamState = (
  history: any,
): UpdateQueryParamState => {
  const location = useLocation()
  const [currentUrl, setCurrentUrl] = React.useState<string>('')

  React.useEffect(() => {
    setCurrentUrl(location.search)
  }, [location, setCurrentUrl])

  const createNewQuery = (key: string, value: string) => {
    const params = new URLSearchParams(location.search)
    if (value !== '') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    return params.toString()
  }

  const UpdateURLAndRoute = (key: string, value: string, route: string) => {
    const query = createNewQuery(key, value)
    history.push(`${route}?${query}`)
  }

  const UpdateURL = (key: string, value: string) => {
    const query = createNewQuery(key, value)

    if (!(location.search.replace('?', '') === `${query}`)) {
      history.replace(`${history.location.pathname}?${query}`)
    }
  }

  return { currentUrl, UpdateURL, UpdateURLAndRoute }
}
