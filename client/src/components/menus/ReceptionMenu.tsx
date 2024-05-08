import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonMenuToggle, IonItem, IonLabel } from '@ionic/react';

const ReceptionMenu: React.FC = () => {

  return (
    <IonMenu contentId="main-content">
      
      <IonHeader>
        <IonToolbar>
          <IonTitle className='text-black font-bold'>Reception</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          <IonMenuToggle>
            <IonItem routerLink="/reception/register-patient" routerDirection="none">
              <IonLabel>Register New Patient</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/reception/add-opd-appointment" routerDirection="none">
              <IonLabel>Add New OPD Appointment</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/reception/admit-ipd-patient" routerDirection="none">
              <IonLabel>Admit New Patient to IPD</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/reception/patient-list" routerDirection="none">
              <IonLabel>View All Patients</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/reception/opd-appointments-list" routerDirection="none">
              <IonLabel>View All OPD Appointments</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/reception/ipd-beds-list" routerDirection="none">
              <IonLabel>View All IPD Beds</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/reception/patient-referrable" routerDirection="none">
              <IonLabel>View Referrable Patients</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
      
    </IonMenu>
  );
}

export default ReceptionMenu;