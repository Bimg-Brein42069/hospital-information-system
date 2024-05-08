import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonCol,
  IonGrid,
  IonRow,
  IonButton,
  IonSearchbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { Route, useHistory, useParams, useLocation } from "react-router-dom";
import Header from "../../../components/Header";
import { useSelector } from "react-redux";

/* 
const dummyData = [
  {
    patientId: 1,
    wardNo: 1,
    bedNo: 101,
    department: "Cardiology",
    doctorName: "Dr. John Doe",
  },
  {
    patientId: 2,
    wardNo: 1,
    bedNo: 102,
    department: "Neurology",
    doctorName: "Dr. Jane Smith",
  },
  {
    patientId: 3,
    wardNo: 1,
    bedNo: 201,
    department: "Orthopedics",
    doctorName: "Dr. David Johnson",
  },
  {
    patientId: 3,
    wardNo: 1,
    bedNo: 201,
    department: "Orthopedics",
    doctorName: "Dr. David Johnson",
  },
  {
    patientId: 3,
    wardNo: 1,
    bedNo: 201,
    department: "Orthopedics",
    doctorName: "Dr. David Johnson",
  },
  {
    patientId: 3,
    wardNo: 1,
    bedNo: 201,
    department: "Orthopedics",
    doctorName: "Dr. David Johnson",
  },
  {
    patientId: 4,
    wardNo: 1,
    bedNo: 202,
    department: "Neurology",
    doctorName: "Dr. Sarah Williams",
  },
  {
    patientId: 5,
    wardNo: 1,
    bedNo: 203,
    department: "Cardiology",
    doctorName: "Dr. Michael Brown",
  },
  {
    patientId: 6,
    wardNo: 1,
    bedNo: 204,
    department: "Orthopedics",
    doctorName: "Dr. Emily Davis",
  },
  {
    patientId: 7,
    wardNo: 1,
    bedNo: 205,
    department: "Neurology",
    doctorName: "Dr. James Wilson",
  },
  {
    patientId: 8,
    wardNo: 1,
    bedNo: 206,
    department: "Cardiology",
    doctorName: "Dr. Olivia Martinez",
  },
  {
    patientId: 9,
    wardNo: 1,
    bedNo: 207,
    department: "Orthopedics",
    doctorName: "Dr. Ethan Taylor",
  },
  {
    patientId: 10,
    wardNo: 1,
    bedNo: 208,
    department: "Neurology",
    doctorName: "Dr. Ava Anderson",
  },
  {
    patientId: 11,
    wardNo: 1,
    bedNo: 209,
    department: "Cardiology",
    doctorName: "Dr. Noah Thomas",
  },
  {
    patientId: 12,
    wardNo: 1,
    bedNo: 210,
    department: "Orthopedics",
    doctorName: "Dr. Sophia Garcia",
  },
  {
    patientId: 13,
    wardNo: 1,
    bedNo: 211,
    department: "Neurology",
    doctorName: "Dr. Liam Martinez",
  },
  {
    patientId: 14,
    wardNo: 1,
    bedNo: 212,
    department: "Cardiology",
    doctorName: "Dr. Isabella Johnson",
  },
];
*/

const IPDViewPatients: React.FC = () => {

  const [patients, setPatients] = useState<any[]>([]);
  const { wardNo } = useParams<{ wardNo: any }>();
  const user = useSelector((state: any) => state.user.currentUser);
  const history = useHistory();

  const dataLocation = useLocation();
  const pids:any = dataLocation.state;

  // console.log(pids);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      //fetching data from reception service
      const response = await fetch(
        "http://localhost:8081/patient/get-ipd-appointments"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setPatients(data);
      // console.log(data);
    } 
    catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const viewPatientDetails = (patientId: any) => {
    //navigate to the patient details page
    history.push(`/doctor/ipd/patient-details/` + patientId);
    location.reload();
  };

  const addEncounter = (patientId: any) => {
    //navigate to the add encounter page
    history.push(`/doctor/ipd/add-encounter/` + patientId);
  };

  const viewNurseEncounter = (patientId: any) => {
    history.push(`/nurse/patient-details/` + patientId);
    location.reload();
  };

  const dischargePatient = async (patient: any) => {
    try{
      const response = await fetch("http://localhost:8081/patient/set-status?patientId=" + patient.patientId + "&status=0",{
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
      const response = await fetch("http://localhost:8081/patient/delete-ipd-appointment",{
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(patient)
      });
      if(!response.ok){
        throw new Error('Failed to discharge patient')
      }
      const r_data=await response.text();
      console.log(r_data);
      location.reload();
    }catch(error){
      console.error('Error discharging patient')
    }
  }

  return (
    <IonPage>
      <Header/>
      <IonContent>

        <h1 className='text-center text-xl font-semibold my-5'>IPD Patients</h1>

        <IonSearchbar value={searchText} onIonInput={e => setSearchText(e.detail.value || '')}></IonSearchbar>
        
        <div className="flex flex-wrap justify-center">
          {patients.filter(patient => (patient.wardNo == wardNo) && (pids && pids.find((item:any) => item.patientId == patient.patientId)))
            .filter(patient => searchText == '' || patient.patientId==searchText)
            .map((patient, key) => (
              <IonCard className="cursor-pointer" key={key}>
              <IonCardHeader>
                <IonCardTitle>Patient ID: {patient.patientId}</IonCardTitle>
                <IonCardSubtitle>WardNo: {patient.wardNo}</IonCardSubtitle>
                <IonCardSubtitle>BedNo: {patient.bedNo}</IonCardSubtitle>
                <IonCardSubtitle>Doctor: {user.name}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonButton className="w-full" onClick={() => viewPatientDetails(patient.patientId)}>View Details</IonButton>
                <IonButton className="w-full" onClick={() => viewNurseEncounter(patient.patientId)}>Nurse Encounter</IonButton>
                <IonButton className="w-full" onClick={() => addEncounter(patient.patientId)}>Add Encounter</IonButton>
                <IonButton className="w-full" onClick={() => dischargePatient(patient)}>Discharge</IonButton>
              </IonCardContent>
            </IonCard>
          ))}
        </div>

      </IonContent>
    </IonPage>
  );
};

export default IPDViewPatients;