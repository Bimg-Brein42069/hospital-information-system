import React from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonItem, IonPage, IonRadio, IonRadioGroup, IonRow } from '@ionic/react';
import { Controller, useForm } from 'react-hook-form';
import TextInput from "../../components/TextInput";
import Header from '../../components/Header';

type FormInputs = {
  id:number
}

const DeleteUser: React.FC = () => {

  const { control, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {

    console.log("Attempted to delete UserId:" + data.id);

    try{
      const response = await fetch("http://localhost:8082/api/auth/delete-user?userId=" + data.id, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete patient');
      }

      // Clear the form after successful submission
      reset();

      alert('User ' + data.id + ' deleted successfully');

    } 
    catch(error){
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <IonPage>
      <Header/>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit(onSubmit)} className='max-w-md mx-auto mt-12'>
          <h1 className='text-center text-2xl font-semibold mb-8'>Delete User</h1>
          <TextInput name='id' placeHolder='Enter user ID' label='User ID' control={control}/>
          <IonButton type='submit' color='danger' shape='round'>DELETE</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default DeleteUser;