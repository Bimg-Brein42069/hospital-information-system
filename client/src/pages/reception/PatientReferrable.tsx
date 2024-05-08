import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Header from "../../components/Header";

const PatientReferrable: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const history = useHistory();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/patient/get-referable"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch patients");
      }
      const rdata = await response.json();
      setPatients(rdata);
    } catch (error) {
      console.error("Error fetching patient");
    }
  };

  const referToIPD = () => {
    history.push("/reception/admit-ipd-patient");
  };

  return (
    <IonPage>
      <Header />
      <IonContent>
        <h1 className='text-center text-xl font-semibold my-5'>Referrable Patients</h1>
        <IonGrid className="border-2 border-solid border-black mx-20 mb-5">
          <IonRow className="border-b-2 border-solid border-black font-semibold">
            <IonCol>Patient ID</IonCol>
            <IonCol>Patient Name</IonCol>
            <IonCol>Refer to IPD</IonCol>
          </IonRow>
          {
            patients.map(patient => (
              <IonRow className='flex flex-row items-center' key={patient.id}>
                <IonCol>{patient.id}</IonCol>
                <IonCol>{patient.name}</IonCol>
                <IonCol>
                  <IonButton onClick={referToIPD}>Refer to IPD</IonButton>
                </IonCol>
              </IonRow>
            ))
          }
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default PatientReferrable;
