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

interface Props {
  shareAsset: any
  removeAsset: any
  sharedUsers: string[]
  assetType: 'Moment' | 'Reflexion'
}

const ShareOverview: React.FC<Props> = ({
  shareAsset,
  removeAsset,
  assetType,
  sharedUsers,
}) => {
  const [showModal, setShowModal] = useState(false)
  const [newShareUser, setNewShareUser] = useState<string>()

  return (
    <>
      <IonModal isOpen={showModal} cssClass="test">
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              {assetType === 'Moment' ? 'Moment' : 'Reflexion'} freigeben
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonListHeader>
            <IonLabel>Freigegebenen User</IonLabel>
          </IonListHeader>
          <IonList>
            {sharedUsers.map((user: any) => (
              <IonItem key={user}>
                <IonLabel>{user}</IonLabel>
                <IonButton
                  color="danger"
                  expand="full"
                  onClick={() => {
                    removeAsset(user)
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
                color="success"
                expand="full"
                onClick={() => {
                  // TODO check user exist and return mail + uuid
                  /* const checkSharedUser = (email) => {
                    call lambda with mail 
                    return mail + uuid + state if exist or invite
                  }
                  shareAsset({mail, uuid})
                  */
                  shareAsset(newShareUser)
                  setNewShareUser('')
                }}
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
