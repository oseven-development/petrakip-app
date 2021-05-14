import { getPlatforms } from '@ionic/react'
import { useState, useEffect } from 'react'

export const usePlatform = () => {
  const [platform, setPlatform] = useState('')

  useEffect(() => {
    async function getPlatform() {
      if (getPlatforms().includes('ios')) {
        setPlatform('ios')
      } else if (getPlatforms().includes('android')) {
        setPlatform('android')
      } else {
        setPlatform('web')
      }
    }
    getPlatform()
  }, [platform])

  return platform
}
