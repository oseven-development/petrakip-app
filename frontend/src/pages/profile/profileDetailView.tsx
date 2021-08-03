import { Header, LargeHeader } from '../../components'
import { RouteComponentProps } from 'react-router-dom'
import Auth from '@aws-amplify/auth'
import { usePlatform } from '../../hooks/usePlatform'
import { useEffect, useState } from 'react'
import {
  IonButton,
  IonImg,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
  IonSpinner,
  useIonAlert,
} from '@ionic/react'
import { arrowForward, pencil } from 'ionicons/icons'
import { ImageRecorder } from '../../components/media/imageRecorder'
import { Media } from '../../api/moment/saveMoment'
import { updateProfilePictureAPI } from '../../api/profile/updateProfilePicture'
import { getProfileAPI } from '../../api/profile/getProfile'
import {
  downloadExportDataAPI,
  exportAllDataAPI,
  ProfileSettings,
} from '../../api/profile/exportAllData'
import { deleteProfileAPI } from '../../api/profile/deleteProfile'

interface Props extends RouteComponentProps<{}> {}

interface ExportData {
  media: Media
  latestExportKey: string
}

export const ProfileDetailView: React.FC<Props> = ({ history }) => {
  const [user, setUser] = useState<any>(undefined)

  const platform = usePlatform()
  const [present] = useIonAlert()
  const [profileSettings, setProfileSettings] = useState<
    ProfileSettings | undefined
  >(undefined)
  useEffect(() => {
    Auth.currentUserInfo().then(user => setUser(user))
  }, [])

  useEffect(() => {
    getProfileAPI().then(async res => {
      setProfileSettings(res)
    })
  }, [])

  const createOrGetDataExport = async (useKey: boolean = false) => {
    let exportData: ExportData | any = {}
    if (profileSettings?.settings?.latestExportKey && useKey) {
      exportData.media = await downloadExportDataAPI(
        profileSettings.settings.latestExportKey,
      )
      exportData.latestExportKey = profileSettings.settings.latestExportKey
    } else {
      exportData = await exportAllDataAPI()
    }
    // Create blob link to download
    const url = window.URL.createObjectURL(exportData.media.data)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', exportData.media.name)

    // Append to html link element page
    document.body.appendChild(link)

    // Start download
    link.click()

    // Clean up and remove the link
    // @ts-ignore
    link.parentNode.removeChild(link)
    return exportData.latestExportKey
  }

  return (
    <IonPage>
      <Header
        shareSlot={
          <IonButton
            onClick={() => {
              Auth.signOut()
              history.replace('/moments')
            }}
          >
            Ausloggen
          </IonButton>
        }
      >
        Profil
      </Header>
      <IonContent fullscreen>
        <LargeHeader>Profil</LargeHeader>
        {user ? (
          <IonGrid>
            <IonCard>
              <IonCardContent>
                <IonRow className="ion-justify-content-center">
                  <div
                    style={{
                      position: 'relative',
                      width: '200px',
                      height: '200px',
                      overflow: 'hidden',
                      borderRadius: '50%',
                    }}
                  >
                    <IonImg
                      style={{
                        width: '100%',
                        height: 'auto',
                      }}
                      src={
                        profileSettings?.picture?.data
                          ? URL.createObjectURL(profileSettings.picture.data)
                          : `assets/profile-placeholder.png`
                      }
                      alt="test"
                    />
                  </div>

                  <IonRow>
                    <IonCol size="12">
                      <IonText color="dark">
                        <h1>
                          {user.attributes.name} {user.attributes.family_name}
                        </h1>
                      </IonText>
                      <IonText color="medium">
                        <p>{user.attributes.preferred_username}</p>
                      </IonText>
                    </IonCol>
                  </IonRow>
                </IonRow>

                <IonRow>
                  <IonCol size="12">
                    <ImageRecorder
                      setMedia={async media => {
                        await updateProfilePictureAPI(media as Media)
                        setProfileSettings({
                          ...profileSettings,
                          picture: media as Media,
                        })
                      }}
                      buttonLabel={'Profilbild ändern'}
                    />
                  </IonCol>

                  <IonCol size="12">
                    <IonButton
                      color="primary"
                      expand="block"
                      routerLink="/profile/changepassword"
                    >
                      <IonIcon
                        icon={pencil}
                        size="small"
                        style={{ paddingRight: 4 }}
                      />
                      Passwort ändern
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonCardContent>
            </IonCard>

            <IonCard>
              <IonCardContent>
                <IonRow
                  className="ion-justify-content-between ion-align-items-center"
                  onClick={async () => {
                    const AlertArrayActuions = [
                      {
                        text: 'Neuer Datenexport',
                        handler: async () => {
                          const dataUrl: string = await createOrGetDataExport()
                          setProfileSettings({
                            ...profileSettings,
                            settings: { latestExportKey: dataUrl },
                          })
                        },
                      },
                    ]
                    if (profileSettings?.settings?.latestExportKey) {
                      AlertArrayActuions.push({
                        text: 'aktuellen Datenexport laden',
                        handler: async () => await createOrGetDataExport(true),
                      })
                    }
                    present({
                      header: 'Datenexport',
                      message:
                        'Hier kannst du ein Export aller deiner Daten machen.',
                      buttons: AlertArrayActuions,
                      // onDidDismiss: e => console.log('did dismiss'),
                    })
                  }}
                >
                  <IonCardSubtitle>Alle Daten exportieren</IonCardSubtitle>
                  <IonIcon size="medium" icon={arrowForward} />
                </IonRow>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardContent>
                <IonRow
                  className="ion-justify-content-between ion-align-items-center"
                  onClick={async () => {
                    present({
                      header: 'Account löschen',
                      message: 'Möchtest du deinen Account wirklich löschen?',
                      buttons: [
                        {
                          text: 'Ja ich möchte meinen Account löschen',
                          handler: async () => {
                            await deleteProfileAPI()
                            window.location.reload()
                          },
                        },
                      ],
                      // onDidDismiss: e => console.log('did dismiss'),
                    })
                  }}
                >
                  <IonCardSubtitle>Account löschen</IonCardSubtitle>
                  <IonIcon icon={arrowForward} />
                </IonRow>
              </IonCardContent>
            </IonCard>
          </IonGrid>
        ) : (
          <IonSpinner name="crescent" />
        )}
      </IonContent>
    </IonPage>
  )
}
