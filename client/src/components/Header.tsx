import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonButton } from '@ionic/react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../redux/user/userSlice';

const Header: React.FC = () => {

  const user = useSelector((state: any) => state.user.currentUser);
  const jwt = useSelector((state: any) => state.user.jwt);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  }

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle className='text-black font-bold'>Hospital System</IonTitle>
        <IonButtons slot='end'>
          <IonButton disabled={true} className='text-black font-bold'>{user.id}</IonButton>
          <IonButton disabled={true} className='text-black font-bold'>{user.name}</IonButton>
          <IonButton disabled={true} className='text-black font-bold'>{user.role}</IonButton>
          <IonButton onClick={handleSignOut} className='text-black font-bold bg-gray-200'>Sign Out</IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
}

export default Header;