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
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
  IonSpinner,
  useIonViewWillEnter,
} from '@ionic/react'
import { arrowForward, albums, image, pencil, camera } from 'ionicons/icons'
import { ImageRecorder } from '../../components/media/imageRecorder'
import { Media } from '../../api/moment/saveMoment'
import { updateProfilePictureAPI } from '../../api/profile/updateProfilePicture'
import { getProfileAPI } from '../../api/profile/getProfile'

interface Props extends RouteComponentProps<{}> {}

export const ProfileDetailView: React.FC<Props> = ({ history }) => {
  const [user, setUser] = useState<any>(undefined)
  const platform = usePlatform()
  const [profilePicture, setProfilePicture] = useState<Media>({
    type: '',
    data: '',
    name: '',
  })
  useEffect(() => {
    Auth.currentUserInfo().then(user => setUser(user))
  }, [])

  useEffect(() => {
    if (user) {
      console.log('get profile picture')
    }
  }, [user])

  useIonViewWillEnter(() => {
    getProfileAPI().then(async res => {
      // Graphql returns a success query with null
      setProfilePicture(res.picture)
    })
  })

  console.log(profilePicture)

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

        {/*
           <IonList>
          <IonItem>{platform}</IonItem>
          <IonItem routerLink="/profile/changepassword">
            Password ändern
          </IonItem>
        </IonList> */}
        {user ? (
          <IonGrid>
            {/* <IonRow className="ion-justify-content-center"> */}

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
                        profilePicture.data
                          ? URL.createObjectURL(profilePicture.data)
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
                        setProfilePicture(media)
                      }}
                      buttonLabel={'Profilbild ändern'}
                    />
                  </IonCol>

                  <IonCol size="12">
                    <IonButton color="primary" expand="block">
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

            {/* <IonRow>
              <IonCol size="6">
                <IonCard>
                  <IonCardContent>
                    <IonIcon icon={image} />
                    <IonCardTitle>147</IonCardTitle>
                    <IonCardSubtitle>Momente</IonCardSubtitle>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol size="6">
                <IonCard>
                  <IonCardContent>
                    <IonIcon icon={albums} />
                    <IonCardTitle>63</IonCardTitle>
                    <IonCardSubtitle>Reflexionen</IonCardSubtitle>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow> */}

            <IonCard>
              <IonCardContent>
                <IonRow className="ion-justify-content-between">
                  <IonCardSubtitle>Alle Daten exportieren</IonCardSubtitle>
                  <IonIcon icon={arrowForward} />
                </IonRow>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardContent>
                <IonRow className="ion-justify-content-between">
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
