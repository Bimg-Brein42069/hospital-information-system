import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonPage,
} from "@ionic/react";
import { useParams } from "react-router";
import Header from "../../../components/Header";
import DrawingImage from "../../../toolkit/DrawingImage";
import AudioPlayback from "../../../toolkit/AudioPlayback";
import { useLocation, useHistory } from 'react-router-dom';

interface PatientDetails {
  id: number;
  name: string;
  age: number;
  bloodGroup: string;
  gender: string;
}

interface Encounter {
  patientId: number;
  doctorId: number;
  prescriptionId: number;
}

interface Prescription {
  prescriptionId: number;
  notes: string;
  instructions: string;
  scribbleNotes: string;
  scribbleInstructions: string;
  audioNotes: string;
  audioInstructions: string;
}

interface Medication {
  medicationId: number;
  prescriptionId: number;
  medicineName: string;
  quantity: number;
  time: string;
  duration: string;
}

interface EncounterWrapper {
  encounter: Encounter;
  prescription: Prescription;
  medications: Medication[];
}

const PatientDetailsPage: React.FC = () => {

  const { patientId } = useParams<{ patientId: string }>();
  const [patientDetails, setPatientDetails] = useState<PatientDetails>();
  const [encounters, setEncounters] = useState<EncounterWrapper[]>([]);

  const history = useHistory();

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
    } 
    catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  const fetchEncounters = async () => {
    try {

      const response = await fetch(`http://localhost:8085/ipd/get-doctor-encounter-by-patient-id?patientId=`+ patientId);
      if (!response.ok) {
        throw new Error('Failed to fetch encounters');
      }
      const data = await response.json();

      const encountersData = await Promise.all(data.map(async (item: any) => {

        const prescriptionResponse = await fetch(`http://localhost:8085/ipd/get-prescription?prescriptionId=${item.prescriptionId}`);
        if (!prescriptionResponse.ok) {
          throw new Error('Failed to fetch prescription');
        }
        const prescriptionData = await prescriptionResponse.json();

        const medicationResponse = await fetch(`http://localhost:8085/ipd/get-medication-by-prescription-id?prescriptionId=${item.prescriptionId}`);
        if (!medicationResponse.ok) {
          throw new Error('Failed to fetch medication');
        }
        const medicationData = await medicationResponse.json();

        return {
          encounter: item,
          prescription: prescriptionData,
          medications: medicationData
        }
      }))

      setEncounters(encountersData);

      console.log(encountersData);
    } 
    catch (error) {
      console.error('Error fetching encounters:', error);
    }
  };

  const viewDiagnosisReport = () => {
    history.push(`/doctor/diagnosis-report/` + patientId);
    location.reload();
  }

  return (
    <IonPage>
      <Header/>
      <IonContent>

        <div className="border-2 border-solid border-black mx-10 my-5 p-3">
          <p>Patient ID: {patientDetails?.id}</p>
          <p>Name: {patientDetails?.name}</p>
          <p>Age: {patientDetails?.age}</p>
          <p>Gender: {patientDetails?.gender}</p>
          <p>Blood Group: {patientDetails?.bloodGroup}</p>
        </div>

        <IonButton className="mx-10" onClick={viewDiagnosisReport}> Diagnosis Report </IonButton>

        {encounters.map((encounter, index) => (
          <div key={index} className="border-2 border-solid border-black mx-10 my-5 p-3 flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Encounter {index + 1}</h1>
            <p>Doctor Id: {encounter.encounter.doctorId}</p>

            <p>Notes: {encounter.prescription?.notes}</p>
            <DrawingImage imageData={encounter.prescription?.scribbleNotes}/>
            <AudioPlayback audioData={encounter.prescription?.audioNotes}/>

            <p>Instructions: {encounter.prescription?.instructions}</p>
            <DrawingImage imageData={encounter.prescription?.scribbleInstructions}/>
            <AudioPlayback audioData={encounter.prescription?.audioInstructions}/>

            <h2 className="text-xl font-semibold">Medicines</h2>
            <ul className="flex flex-col gap-4">
              {encounter.medications.map((medication,index) => (
                <li key={index}>
                  <h3 className="text-lg font-semibold">Medicine {index + 1}</h3>
                  <p>Name: {medication.medicineName}</p>
                  <p>Quantity: {medication.quantity}</p>
                  <p>Time: {medication.time}</p>
                  <p>Duration: {medication.duration}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      
      
        {/* <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Patient ID: {patientDetails?.id}</IonCardSubtitle>
            <IonCardTitle>{patientDetails?.name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Age: {patientDetails?.age}</p>
            <p>Gender: {patientDetails?.gender}</p>
            <p>Blood Group: {patientDetails?.bloodGroup}</p>
          </IonCardContent>
        </IonCard> */}

        {/* {encounters.map((encounter, index) => (
          <IonCard key={index}>
            <IonCardHeader>
              <IonCardTitle>Encounter {index + 1}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>Doctor Id: {encounter.encounter.doctorId}</p>
      
              <p>Notes: {encounter.prescription.notes}</p>
              <DrawingImage imageData={encounter.prescription.scribbleNotes}/>
              <AudioPlayback audioData={encounter.prescription.audioNotes}/>

              <p>Instructions: {encounter.prescription.instructions}</p>
              <DrawingImage imageData={encounter.prescription.scribbleInstructions}/>
              <AudioPlayback audioData={encounter.prescription.audioInstructions}/>
              
              <ul>
                {encounter.medications.map((medication) => (
                  <li key={medication.medicationId}>
                    <p>Name: {medication.medicineName}</p>
                    <p>Quantity: {medication.quantity}</p>
                    <p>Time: {medication.time}</p>
                    <p>Duration: {medication.duration}</p>
                    <br></br>
                  </li>
                ))}
              </ul>
            </IonCardContent>
          </IonCard>
        ))} */}

      </IonContent>
    </IonPage>
  );
};

export default PatientDetailsPage;