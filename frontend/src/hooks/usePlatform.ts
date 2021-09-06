import { getPlatforms } from '@ionic/react'
import { useState, useEffect } from 'react'

export enum Platform {
  ios = 'ios',
  android = 'android',
  web = 'web',
  notDefined = 'not defined',
}

export const usePlatform = () => {
  const [platform, setPlatform] = useState(Platform.notDefined)

  useEffect(() => {
    async function getPlatform() {
      if (getPlatforms().includes('ios')) {
        setPlatform(Platform.ios)
      } else if (getPlatforms().includes('android')) {
        setPlatform(Platform.android)
      } else {
        setPlatform(Platform.web)
      }
    }
    getPlatform()
  }, [platform])

  return platform
}
