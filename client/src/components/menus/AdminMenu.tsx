import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonMenuToggle, IonItem, IonLabel } from '@ionic/react';

const AdminMenu: React.FC = () => {

  return (
    <IonMenu contentId="main-content">
      
      <IonHeader>
        <IonToolbar>
          <IonTitle className='text-black font-bold'>Admin</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          <IonMenuToggle>
            <IonItem routerLink="/admin/sign-up" routerDirection="none">
              <IonLabel>Sign Up User</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/admin/delete-patient" routerDirection="none">
              <IonLabel color='danger'>Delete Patient</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/admin/delete-user" routerDirection="none">
              <IonLabel color='danger'>Delete User</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/admin/patient-revoke-consent" routerDirection='none'>
              <IonLabel color='danger'>Revoke Consent</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
}

export default AdminMenu;