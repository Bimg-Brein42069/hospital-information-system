import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonMenuToggle, IonItem, IonLabel } from '@ionic/react';

const DoctorMenu: React.FC = () => {

  return (
    <IonMenu contentId="main-content">
      
      <IonHeader>
        <IonToolbar>
          <IonTitle className='text-black font-bold'>Doctor</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          <IonMenuToggle>
            <IonItem routerLink="/doctor/ipd/view-wards" routerDirection="none">
              <IonLabel>View my IPD Patients</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/doctor/opd/patient-list" routerDirection="none">
              <IonLabel>View my OPD Patients</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/doctor/ipd/patient-get-consent" routerDirection="none">
              <IonLabel>Get patient consent</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
}

export default DoctorMenu;