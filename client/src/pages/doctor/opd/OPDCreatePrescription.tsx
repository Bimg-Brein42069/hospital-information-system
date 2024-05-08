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
import { useFieldArray, useForm } from "react-hook-form";
import Header from "../../../components/Header";
import TextInput from "../../../components/TextInput";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

type FormInputs = {
  patientComplaints: string;
  weight: number;
  height: number;
  temperature: number;
  lowBP: number;
  highBP: number;
  medicines: {
    medicineName: string;
    count: number;
    time: string;
    duration: number;
  }[];
  advice: string;
  followUp: string;
};

const OPDCreatePrescription: React.FC = () => {

  const { register,control, handleSubmit, reset } = useForm(); 
  const { patientId } = useParams<{ patientId: string }>();
  const {fields,append,remove} = useFieldArray({
    name:'medicines',
    control
  });
  const user = useSelector((state: any) => state.user.currentUser);

  const handleMedication = async (data: any, prescriptionId: any) =>{

    const medication_data = {
      "prescriptionId": prescriptionId,
      "medicineName": data.medicineName,
      "quantity": data.count,
      "time": data.time,
      "duration": data.duration
    } 

    console.log("Prescription Id is: " + prescriptionId)
    try{
      const response = await fetch("http://localhost:8085/ipd/add-medication", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medication_data),
      });

      var responseData = await response.json();
      if (!response.ok) {
        throw new Error('Error adding medication');
      }
      reset();
      console.log('Medication added successfully');
    } 
    catch(error){
      console.error('Error adding medication:', error);
    }
  }
  
  const handleFormSubmit = async (data: any) => {

    console.log("Form submitted:", {...data,"patientId":patientId,"doctorId":user.id});

    var medicationId;
    var prescriptionId;
    var responseData; 

    const prescription_data = {
      "notes":data.notes,
      "instructions":data.advice
    }

    try{
      const response = await fetch("http://localhost:8085/ipd/add-prescription", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prescription_data),
      });

      responseData = await response.json();
      prescriptionId = responseData.prescriptionId; 
      console.log("Prescription Id is: " + prescriptionId)

      if (!response.ok) {
        throw new Error('Error adding prescription');
      }

      reset();
      console.log('Presciption added successfully');

    } 
    catch(error){
      console.error('Error adding prescription:', error);
    }
    
    console.log(data)
    for(var i=0; i<data.medicines.length; i++){
      handleMedication(data.medicines[i], prescriptionId); 
    }

    const record_data = {
      "patientId":patientId,
      "doctorId":user.id,
      "prescriptionId": prescriptionId,
      "patientComplaints":data.patientComplaints,
      "weight":data.weight,
      "height":data.height,
      "temperature":data.temperature,
      "lowBP":data.lowBP,
      "highBP":data.highBP,
      "followUp":data.followUp
    }

    try{
      const response = await fetch("http://localhost:8083/opd/add-patient-record", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record_data),
      });

      if (!response.ok) {
        throw new Error('Error adding patient record OPD');
      }  
      reset();
      console.log('Success');
    } 
    catch(error){
      console.error('Error adding patient record:', error);
    }
  };

  return (
    <IonPage>
      <Header />
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-6xl mx-auto mt-5">

          <h1 className='text-center text-2xl font-semibold mb-8'>Add OPD Encounter</h1>

          <TextInput name="patientComplaints" placeHolder="Enter complaint" label="Complaint" control={control}/>

          <div className="flex flex-row gap-2">
            <TextInput name="weight" placeHolder="Enter weight" label="Weight" control={control}/>
            <TextInput name="height" placeHolder="Enter height" label="Height" control={control}/>
            <TextInput name="temperature" placeHolder="Enter temperature" label="Temperature" control={control}/>
            <TextInput name="lowBP" placeHolder="Enter low BP" label="Low BP" control={control}/>
            <TextInput name="highBP" placeHolder="Enter high BP" label="High BP" control={control}/>
          </div>

          <TextInput name="notes" placeHolder="Enter notes" label="Notes" control={control}/>
          <TextInput name="advice" placeHolder="Enter advice" label="Advice" control={control}/>
          <TextInput name="followUp" placeHolder="Enter follow up date" label="Follow Up on" control={control}/>

          <h1 className='text-xl font-semibold my-2'>Medicines</h1>
          {fields.map((field, index) => {
            return (
              <div className="flex flex-row justify-between items-center">
                <TextInput placeHolder="" label="Medicine Name" {...register(`medicines.${index}.medicineName`)} control={control}/>
                <TextInput placeHolder="" label="Quantity" {...register(`medicines.${index}.medicineQty`)} control={control} />
                <TextInput placeHolder="" label="Timing" {...register(`medicines.${index}.medicineTiming`)} control={control} />
                <TextInput placeHolder="" label="Duration" {...register(`medicines.${index}.medicineDuration`)} control={control} />
                <IonButton className="h-8" onClick={() => remove(index)} shape="round">-</IonButton>
              </div>
            );
          })}
          <IonButton className="block w-16" onClick={() => append({ medicineName: "", medicineDuration: "", medicineQty: 0, medicineTiming: "" })} shape="round">+</IonButton>

          <div className="mt-8 flex justify-center">
            <IonButton type="submit" shape="round">Add Encounter</IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default OPDCreatePrescription;
