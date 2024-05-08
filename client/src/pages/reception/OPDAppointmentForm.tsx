import React from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import { Controller, useForm } from 'react-hook-form';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';

type FormInputs = {
  patientId: number,
  reason: string,
  doctorId: number
}

const OPDAppointmentForm: React.FC = () => {

  const { control, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {

    data={...data,isactive:true}
    
    try{
      const response = await fetch("http://localhost:8081/patient/set-status?patientId=" + data.patientId + "&status=0",{
        method:'PUT'
      });
      if(!response.ok){
        throw new Error('Failed to update patient status')
      }
      const r_data=await response.json();
      console.log(r_data);
    }catch(error){
      console.error('Error updating patient')
    }

    try{
      const response = await fetch("http://localhost:8081/patient/opdappointment", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to register patient');
      }

      // Clear the form after successful submission
      reset();
      console.log(data);
      console.log('Patient registetered to OPD successfully');

    } catch(error){
      console.error('Error registering patient:', error);
    }
  };

  return (
    <IonPage>
      <Header/>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit(onSubmit)} className='max-w-lg mx-auto mt-12'>
          <h1 className='text-center text-xl font-semibold'>Add OPD Appointment</h1>
          <TextInput name='patientId' placeHolder='Enter patient ID' label='Patient ID' control={control}/>  
          <TextInput name='reason' placeHolder='Enter appointment date' label='Appointment Date' control={control}/> 
          <TextInput name='doctorId' placeHolder='Enter doctor ID' label='Doctor ID' control={control}/>
          <IonButton type='submit' shape='round'>Add Appointment</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default OPDAppointmentForm;
