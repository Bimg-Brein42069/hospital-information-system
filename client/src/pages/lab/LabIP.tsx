import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonCol,
  IonGrid,
  IonRow,
  IonButton,
} from "@ionic/react";
import Header from "../../components/Header";
import "./LabStyle.css";

const LabIP: React.FC = () => {
  const [patient, setPatient] = useState({ id: 0, name: "", bill: 0 });
  const [docNotes, setDocNotes] = useState("");
  const [tests, setTests] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setPatient({ id: 14, name: "Deep", bill: 200 });
    setDocNotes("Lorem Ipsum");
    setTests([
      { id: 1, testname: "x-ray", testcode: "MD123", bill: 180 },
      { id: 32, testname: "blood test", testcode: "OTC222", bill: 20 },
    ]);
  };

  return (
    <div className="view-bill">
      <IonPage>
        <Header />
        <IonContent>
          <h1>Patients</h1>
          <IonGrid className="table">
            <IonRow className="table-header">
              <IonCol>Patient ID</IonCol>
              <IonCol>Name</IonCol>
              <IonCol>Bill</IonCol>
            </IonRow>
            <IonRow>
              <IonCol>{patient.id}</IonCol>
              <IonCol>{patient.name}</IonCol>
              <IonCol>Rs.{patient.bill}</IonCol>
            </IonRow>
          </IonGrid>
          <IonGrid className="table">
            <IonRow className="table-header">
              <IonCol>Doctor's Notes</IonCol>
            </IonRow>
            <IonRow>
              <IonCol>{docNotes}</IonCol>
            </IonRow>
          </IonGrid>
          <IonGrid className="table">
            <IonRow className="table-header">
              <IonCol>Test</IonCol>
              <IonCol>Test Code</IonCol>
              <IonCol>Bill(Rs)</IonCol>
            </IonRow>
            {tests.map((test) => (
              <IonRow key={test.id}>
                <IonCol>{test.testname}</IonCol>
                <IonCol>{test.testcode}</IonCol>
                <IonCol>{test.bill}</IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default LabIP;
