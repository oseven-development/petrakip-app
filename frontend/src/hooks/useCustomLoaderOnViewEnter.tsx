import React from 'react'
import { IonLoading, useIonViewWillEnter } from '@ionic/react'

interface Props<T> {
  promise: Promise<T>
  callback: (v: T) => void
  minTime?: number
  loadingMessage?: string
}

export function useCustomLoaderOnViewEnter<T>({
  promise: _promise,
  callback,
  minTime = 500,
  loadingMessage = 'bitte warten!',
}: Props<T>): [JSX.Element, boolean] {
  const [loader, setLoader] = React.useState(false)
  useIonViewWillEnter(() => {
    const start = new Date().getTime()
    setLoader(true)
    _promise
      .then(result => {
        const end = new Date().getTime()
        const time = end - start
        setTimeout(() => {
          callback(result)
          setLoader(false)
        }, minTime - time)
      })
      .catch(() => {
        setLoader(false)
      })
  }, [])
  return [<IonLoading isOpen={loader} message={loadingMessage} />, loader]
}
