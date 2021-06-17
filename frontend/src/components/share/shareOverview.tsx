import {
  IonButton,
  IonHeader,
  IonModal,
  IonTextarea,
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
import { share, trash } from 'ionicons/icons'
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
  sharedUsers,
  assetType,
}) => {
  const [showModal, setShowModal] = useState(false)
  const [shareUser, setShareUser] = useState<string>()

  return (
    <>
      {/* @ts-ignore */}
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
            <IonLabel>bereits freigegeben für</IonLabel>
          </IonListHeader>
          <IonList>
            {sharedUsers.map((user: any) => (
              <IonItem>
                <IonLabel>{user}</IonLabel>
                <IonIcon
                  color="danger"
                  slot="end"
                  icon={trash}
                  onClick={() => removeAsset(user)}
                />
              </IonItem>
            ))}
          </IonList>
          <IonListHeader>
            <IonLabel>Freigeben für</IonLabel>
          </IonListHeader>
          <IonList>
            <IonItem>
              <IonInput
                value={shareUser}
                placeholder="Email eingeben"
                onIonChange={e => setShareUser(e.detail.value!)}
              ></IonInput>
              <IonButton
                color="success"
                expand="full"
                onClick={() => shareAsset(shareUser)}
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
        <IonIcon color="secondary" slot="icon-only" icon={share} />
      </IonButton>
    </>
  )
}

export { ShareOverview }
