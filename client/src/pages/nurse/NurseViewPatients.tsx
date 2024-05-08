import React, { useState, useEffect } from "react";
import { IonPage, IonContent, IonCol, IonGrid, IonRow, IonButton } from "@ionic/react";
import Header from "../../components/Header";
import { useHistory } from "react-router-dom";

const NurseViewPatients: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const history = useHistory();
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        // fetching data from reception service
      const response = await fetch(
        "http://localhost:8081/patient/get-ipd-appointments"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const viewPatientDetails = (patientId: any) => {
    // Navigate to the patient details page with the patient ID
    history.push(`/nurse/patient-details/` + patientId);
    location.reload()
  };

  const addEncounter = (patientId: any) => {
    // Navigate to the add encounter page
    history.push(`/nurse/add-encounter/`+ patientId);
  };


  const viewDoctorEncounter = (patientId: any)  => {
    history.push(`/doctor/ipd/patient-details/` + patientId);
  }


  return (
    <IonPage>
      <Header/>
      <IonContent>
        <h1 className='text-center text-xl font-semibold my-5'>Patients</h1>
        <IonGrid className="border-2 border-solid border-black mx-20 mb-5">
          <IonRow className="border-b-2 border-solid border-black font-semibold">
            <IonCol size="1">Patient ID</IonCol>
            <IonCol size="2">Room No</IonCol>
            <IonCol size="2">Ward No</IonCol>
            <IonCol>View Details</IonCol>
            <IonCol>Add Encounter</IonCol>
            <IonCol>Doctor Encounter</IonCol>
          </IonRow>
          {patients.map(patient => (
            <IonRow key={patient.id}>
              <IonCol size="1">{patient.patientId}</IonCol>
              <IonCol size="2">{patient.bedNo}</IonCol>
              <IonCol size="2">{patient.wardNo}</IonCol>
              <IonCol><IonButton size="small" onClick={() => viewPatientDetails(patient.patientId)}>View</IonButton></IonCol>
              <IonCol><IonButton size="small" onClick={() => addEncounter(patient.patientId)}>Add</IonButton></IonCol>
              <IonCol><IonButton size="small" onClick={() => viewDoctorEncounter(patient.patientId)}>Doctor Encounter</IonButton></IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>

  );
};

export default NurseViewPatients;
