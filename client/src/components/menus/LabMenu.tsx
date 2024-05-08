import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonMenuToggle, IonItem, IonLabel } from '@ionic/react';

const LabMenu: React.FC = () => {

  return (
    <IonMenu contentId="main-content">
      
      <IonHeader>
        <IonToolbar>
          <IonTitle className='text-black font-bold'>Lab</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          <IonMenuToggle>
            <IonItem routerLink="/lab/search" routerDirection="none">
              <IonLabel>Search</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/lab/ip" routerDirection="none">
              <IonLabel>IP</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
      
    </IonMenu>
  );
}

export default LabMenu;