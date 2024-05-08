import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  IonPage,
  IonContent,
  IonCol,
  IonGrid,
  IonRow,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/react";
import Header from "../../components/Header";
import "./LabStyle.css";

interface PatientDetails {
  id: number;
  name: string;
  age: number;
  bloodGroup: string;
  gender: string;
}

const LabSearch: React.FC = () => {
  const [pid, setPID] = useState("");
  const [patientDetails, setPatientDetails] = useState<PatientDetails>();
  const [fileChoose, setFileChoose] = useState(false);
  const [selectedFilesPath, setSelectedFilesPath] = useState([]);

  const handleFormSubmit = () => {
    fetchPatientDetails(); 
    if (patientDetails) setFileChoose(true);
  };

  const addDiagnosisReport = async () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length === 0) {
      console.error("No files selected.");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < fileInput.files.length; i++) {
      const file = fileInput.files[i];
      formData.append("files", file);
    }

    formData.append("patientId", pid);

    try {
      const response = await fetch(
        "http://localhost:8087/lab/add-diagnosis-report",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        console.log(response);
      } else {
        console.error("Failed to add records.");
      }
    } catch (error) {
      console.error("Error adding records: ", error);
    }
  };


  const fetchPatientDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/patient/get-demographics?id=` + pid
      );
      if (response.ok) {
        const data = await response.json();
        setPatientDetails(data);
      }
      else{
        throw new Error("Failed to fetch patient details");
      }
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  return (
    <div className="view-patient">
      <IonPage>
        <Header />
        <IonContent className="ion-padding">
          <h1>Search Patient</h1>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonInput
                  value={pid}
                  onIonChange={(e) => setPID(e.detail.value!)}
                  label="Patient ID:"
                  labelPlacement="floating"
                  placeholder="Enter patient ID"
                ></IonInput>
              </IonCol>
            </IonRow>
          </IonGrid>
          <div className="button-container">
            <IonButton onClick={handleFormSubmit} shape="round">
              Search
            </IonButton>
          </div>

          {fileChoose && (
            <>
              <div className="border-2 border-solid border-black mx-10 my-5 p-3">
                <p>Patient ID: {patientDetails?.id}</p>
                <p>Name: {patientDetails?.name}</p>
                <p>Age: {patientDetails?.age}</p>
                <p>Gender: {patientDetails?.gender}</p>
                <p>Blood Group: {patientDetails?.bloodGroup}</p>
              </div>

              {/* <form id="fileUploadForm"> */}
              <input
                type="file"
                id="fileInput"
                name="file"
                // onChange={handleFileChange}
                multiple
              ></input>
              <IonButton onClick={addDiagnosisReport}>
                Add Diagnosis Report
              </IonButton>
              {/* </form> */}
            </>
          )}
        </IonContent>
      </IonPage>
    </div>
  );
};

export default LabSearch;
