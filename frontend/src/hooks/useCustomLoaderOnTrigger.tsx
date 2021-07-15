import React from 'react'
import { IonLoading, IonToast } from '@ionic/react'

interface Props<T, K> {
  promise: (i: K) => Promise<T>
  callback: (v: T) => void
  minTime?: number
  loadingMessage?: string
  toastMessage?: string
}

export function useCustomLoaderOnTrigger<T, K>({
  promise: _promise,
  callback,
  minTime = 500,
  loadingMessage = 'bitte warten!',
  toastMessage,
}: Props<T, K>): [JSX.Element, boolean, (i: K) => void] {
  const [loader, setLoader] = React.useState(false)
  const [message, setMessage] = React.useState<{
    message: string
    display: boolean
    color?: undefined | 'danger'
  }>({
    message: '',
    display: false,
    color: undefined,
  })

  const trigger = (i: K) => {
    const start = new Date().getTime()
    setLoader(true)
    const end = new Date().getTime()
    _promise(i)
      .then(result => {
        const time = end - start
        setTimeout(() => {
          callback(result)
          setLoader(false)
          if (toastMessage) {
            setMessage({
              message: toastMessage,
              display: true,
            })
          }
        }, minTime - time)
      })
      .catch(error => {
        console.error(error)
        const time = end - start
        setTimeout(() => {
          setLoader(false)
          setMessage({
            message: 'Es ist ein Fehler aufgetreten!',
            display: true,
            color: 'danger',
          })
        }, minTime - time)
      })
  }
  return [
    <>
      <IonLoading isOpen={loader} message={loadingMessage} />
      <IonToast
        isOpen={message.display}
        onDidDismiss={() => setMessage({ message: '', display: false })}
        message={message.message}
        duration={3000}
        position="top"
        translucent={message.color ? false : true}
        color={message.color}
      />
    </>,
    loader,
    trigger,
  ]
}
