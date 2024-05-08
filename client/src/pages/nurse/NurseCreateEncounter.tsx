import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonCol,
  IonGrid,
  IonRow,
  IonButton,
  IonInput,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import TextInput from "../../components/TextInput";
import Header from "../../components/Header";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";


type FormInputs = {
  temperature: number;
  lowBP: number;
  highBP: number;
  healthCondition: string;
};

const NurseCreateEncounter: React.FC = () => {
  const { control, handleSubmit, reset } = useForm();
  const { patientId } = useParams<{ patientId: string }>();

  const history = useHistory();

  const user = useSelector((state: any) => state.user.currentUser);

  const handleFormSubmit = async (data: any) => {
    const riyal_data = {
      "temperature":data.temperature,
      "highBP":data.lowBP,
      "lowBP":data.highBP,
      "healthCondition":data.healthCondition,
      "patientId":patientId,
      "nurseId":user.id
    }
    console.log(riyal_data)
    try{
      const response = await fetch(`http://localhost:8085/ipd/add-nurse-encounter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(riyal_data),
      });
      if (!response.ok) {
        throw new Error('Error adding patient record');
      }

      
      // Clear the form after successful submission
      reset();

      console.log('Success');
      history.push(`/nurse/patient-list`);

    } catch(error){
      console.error('Error adding patient record:', error);
    }
  };

  return (
    <IonPage>
      <Header/>
      <IonContent className="ion-padding">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-xl mx-auto mt-5">
        
        <h1 className='text-center text-2xl font-semibold mb-8'>Create Encounter</h1>

        <div className="flex flex-row gap-12">
          <TextInput name="lowBP" placeHolder="Low BP" label="Low BP" control={control} />
          <TextInput name="highBP" placeHolder="High BP" label="High BP" control={control} />
        </div>

        <TextInput name="temperature" placeHolder="Temperature" label="Temperature" control={control} />

        <TextInput name="healthCondition" placeHolder="Health Condition" label="Health Condition" control={control} />

        <IonButton type="submit" shape="round">Add Encounter</IonButton>

      </form>
      </IonContent>
    </IonPage>
  );
};

export default NurseCreateEncounter;
