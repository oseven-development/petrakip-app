import {
  IonButton,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonListHeader,
  IonLabel,
  IonList,
  IonItem,
  IonInput,
  IonContent,
} from '@ionic/react'
import { share } from 'ionicons/icons'
import React, { useState } from 'react'
import { checkUserAndShareAssetAPI, shareAPI } from '../../api/index'
import { useCustomLoaderOnTrigger } from '../../hooks'
import { AssetType, assetTypeDict } from '../../types/assetType'
import { CheckShareUser, ShareUser } from '../../types/shareUser'

interface Props {
  id: string
  shareAsset: ({ email, id, alreadyExist }: CheckShareUser) => void
  removeAsset: ({ email, id }: ShareUser) => void
  sharedUsers: ShareUser[]
  assetType: AssetType
}

const ShareOverview: React.FC<Props> = ({
  id: objectId,
  shareAsset: _shareAssetCallback,
  removeAsset: _removeAssetCallback,
  assetType,
  sharedUsers,
}) => {
  const [showModal, setShowModal] = useState(false)
  const [newShareUser, setNewShareUser] = useState<string>('')

  const checkUserExistOrInvite = async () => {
    try {
      const { email, uuid, alreadyExist } = await checkUserAndShareAssetAPI(
        newShareUser,
      )
      shareAPI({ email, id: uuid }, objectId, 'share', assetType)
      setNewShareUser('')
      return { email, id: uuid, alreadyExist }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const [JSXLoaderAddShare, , callerAddShare] = useCustomLoaderOnTrigger({
    promise: checkUserExistOrInvite,
    callback: _shareAssetCallback,
    loadingMessage: `${assetType} wird freigegeben...`,
    toastMessage: `${assetType} erfolgreich freigegeben!`,
  })

  const removeAsset = async (user: ShareUser) => {
    shareAPI(user, objectId, 'remove', assetType)
    return user
  }

  const [JSXLoaderRemoveShare, , callerRemoveShare] = useCustomLoaderOnTrigger({
    promise: removeAsset,
    callback: _removeAssetCallback,
    loadingMessage: `Teilen für ${assetType} wird beendet...`,
    toastMessage: `Teilen erfolgreich beendet!`,
  })

  /*
    Check if the "Freigabe" should be enabled
  */
  const enableSharingButton = (): boolean => {
    // check input is not empty
    const empty = newShareUser !== ''
    // check if the input is a valid Mail-Adresse
    const re = /\S+@\S+\.\S+/
    const mail = re.test(newShareUser)
    // check if the input exist in the SharedUserArray
    const exist = sharedUsers.map(({ email }) => email).includes(newShareUser)
    return !mail || exist || !empty
  }

  return (
    <>
      {JSXLoaderAddShare}
      {JSXLoaderRemoveShare}
      <IonModal isOpen={showModal} cssClass="test">
        <IonHeader>
          <IonToolbar>
            <IonTitle>{assetTypeDict[assetType]} freigeben</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonListHeader>
            <IonLabel>Freigegebenen User</IonLabel>
          </IonListHeader>
          <IonList>
            {sharedUsers.map(user => (
              <IonItem key={`${user.id}-share`}>
                <IonLabel>{user.email}</IonLabel>
                <IonButton
                  color="danger"
                  expand="full"
                  onClick={() => {
                    callerRemoveShare(user)
                  }}
                >
                  löschen
                </IonButton>
              </IonItem>
            ))}
          </IonList>
          <IonListHeader>
            <IonLabel>Freigeben für</IonLabel>
          </IonListHeader>
          <IonList>
            <IonItem>
              <IonInput
                value={newShareUser}
                placeholder="Email eingeben"
                onIonChange={e => setNewShareUser(e.detail.value!)}
              ></IonInput>
              <IonButton
                disabled={enableSharingButton()}
                color="success"
                expand="full"
                onClick={callerAddShare}
              >
                freigeben
              </IonButton>
            </IonItem>
          </IonList>
        </IonContent>

        <IonButton
          color="primary"
          expand="full"
          onClick={() => setShowModal(false)}
        >
          Freigabe beenden
        </IonButton>
      </IonModal>
      <IonButton onClick={() => setShowModal(true)}>
        <IonIcon color="primary" slot="icon-only" icon={share} />
      </IonButton>
    </>
  )
}

export { ShareOverview }
