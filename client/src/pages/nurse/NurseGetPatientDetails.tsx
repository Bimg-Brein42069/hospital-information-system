import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonCol,
  IonGrid,
  IonRow,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import Header from "../../components/Header";
import { useParams } from "react-router";

interface PatientDetails {
  name: string;
  patientId: string;
  age: number;
  reasonForAdmit: string;
}

interface Encounter {
  patientId: number;
  nurseId: number;
  temperature: number;
  lowBP: number;
  highBP: number;
  healthCondition: string;
}

const NurseGetPaitentDetails: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  console.log(patientId);
  const [patientDetails, setPatientDetails] = useState<PatientDetails | null>(null);
  const [encounters, setEncounters] = useState<Encounter[]>([]);

  useEffect(() => {
    fetchPatientDetails();
    fetchEncounters();
  }, []);



  const fetchPatientDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8081/patient/get-demographics?id=`+ patientId);
      if (!response.ok) {
        throw new Error('Failed to fetch patient details');
      }
      const data = await response.json();
      setPatientDetails(data);
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };


  const fetchEncounters = async () => {
    try {
      const response = await fetch(`http://localhost:8085/ipd/get-nurse-encounter-by-patient-id?patientId=`+ patientId);
      if (!response.ok) {
        throw new Error('Failed to fetch encounters');
      }
      const data = await response.json();
      setEncounters(data);

    } catch (error) {
      console.error('Error fetching encounters:', error);
    }
  };





  if (!patientDetails) {
    return <div>Loading...</div>;
  }

  return (
    <IonPage>
      <Header/>
      <IonContent>
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>Patient ID: {patientDetails.patientId}</IonCardSubtitle>
          <IonCardTitle>{patientDetails.name}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <p>Age: {patientDetails.age}</p>
          <p>Reason for Admit: {patientDetails.reasonForAdmit}</p>
        </IonCardContent>
      </IonCard>

      {encounters.map((encounter, index) => (
        <IonCard key={index}>
          <IonCardHeader>
            <IonCardTitle>Encounter {index + 1}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {/* <p>Notes: {encounter.patientId}</p>
            <p>Nurse Instructions: {encounter.doctorId}</p>
            <p>Medicines:{encounter.prescriptionId}</p> */}
            <IonCol>Temperature:{encounter.temperature} F</IonCol>
            <IonCol>Blood Pressure:{encounter.lowBP}/{encounter.highBP} mmHg</IonCol>
            <IonCol>Health Condition:{encounter.healthCondition}</IonCol>
          </IonCardContent>
        </IonCard>
      ))}
      </IonContent>
    </IonPage>
  );
};

export default NurseGetPaitentDetails;
