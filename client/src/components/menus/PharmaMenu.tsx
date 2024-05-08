import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonMenuToggle, IonItem, IonLabel } from '@ionic/react';

const PharmaMenu: React.FC = () => {

  return (
    <IonMenu contentId="main-content">
      
      <IonHeader>
        <IonToolbar>
          <IonTitle className='text-black font-bold'>Pharmacy</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          <IonMenuToggle>
            <IonItem routerLink="/pharma/search" routerDirection="none">
              <IonLabel>Search</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
      
    </IonMenu>
  );
}

export default PharmaMenu;