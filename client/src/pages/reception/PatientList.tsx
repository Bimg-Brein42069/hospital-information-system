import React, { useState, useEffect } from "react";
import { IonPage, IonContent, IonCol, IonGrid, IonRow } from "@ionic/react";
import Header from "../../components/Header";

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/patient/get-all-patients"
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

  return (
    <IonPage>
      <Header />
      <IonContent>
        <h1 className='text-center text-xl font-semibold my-5'>Patients</h1>
        <IonGrid className="border-2 border-solid border-black mx-20 mb-5">
          <IonRow className="border-b-2 border-solid border-black font-semibold">
            <IonCol>Patient ID</IonCol>
            <IonCol>Name</IonCol>
            <IonCol>Age</IonCol>
            <IonCol>Gender</IonCol>
            <IonCol>Blood Group</IonCol>
            <IonCol>Phone No</IonCol>
            <IonCol>Address</IonCol>
            <IonCol>Email-ID</IonCol>
          </IonRow>
          {patients.map((patient) => (
            <IonRow className="my-2" key={patient.id}>
              <IonCol>{patient.id}</IonCol>
              <IonCol>{patient.name}</IonCol>
              <IonCol>{patient.age}</IonCol>
              <IonCol>{patient.gender}</IonCol>
              <IonCol>{patient.bloodGroup}</IonCol>
              <IonCol>{patient.phoneNo}</IonCol>
              <IonCol>{patient.address}</IonCol>
              <IonCol>{patient.emailId}</IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default PatientList;
