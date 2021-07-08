import React from 'react'
import { useLocation } from 'react-router-dom'

interface UpdateQueryParamState {
  currentUrl: string
  UpdateURL: (urlParams: UrlParams) => void
  UpdateURLAndRoute: (urlParams: UrlParams, route: string) => void
}

type UrlParams = { key: string; value: string }[]

export const useUpdateQueryParamState = (
  history: any,
): UpdateQueryParamState => {
  const location = useLocation()
  const [currentUrl, setCurrentUrl] = React.useState<string>('')

  React.useEffect(() => {
    setCurrentUrl(location.search)
  }, [location, setCurrentUrl])

  const createNewQuery = (urlParams: UrlParams) => {
    const params = new URLSearchParams(location.search)
    urlParams.forEach(({ key, value }) => {
      if (value !== '') {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    return params.toString()
  }

  const UpdateURLAndRoute = (urlParams: UrlParams, route: string) => {
    const query = createNewQuery(urlParams)

    history.replace(`${route}?${query}`)
  }

  const UpdateURL = (urlParams: UrlParams) => {
    const query = createNewQuery(urlParams)

    if (!(location.search.replace('?', '') === `${query}`)) {
      history.replace(`${history.location.pathname}?${query}`)
    }
  }

  return { currentUrl, UpdateURL, UpdateURLAndRoute }
}
