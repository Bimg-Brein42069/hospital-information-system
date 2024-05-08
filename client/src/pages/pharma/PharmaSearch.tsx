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
import Header from "../../components/Header";
import DrawingImage from "../../toolkit/DrawingImage";
import AudioPlayback from "../../toolkit/AudioPlayback";
import TextInput from "../../components/TextInput";

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

const dummyEncounters: EncounterWrapper[] = [
  {
    encounter: {
      patientId: 1,
      doctorId: 1,
      prescriptionId: 1,
    },
    prescription: {
      prescriptionId: 1,
      notes: "Dummy notes",
      instructions: "Dummy instructions",
      scribbleNotes: "Dummy scribble notes",
      scribbleInstructions: "Dummy scribble instructions",
      audioNotes: "Dummy audio notes",
      audioInstructions: "Dummy audio instructions",
    },
    medications: [
      {
        medicationId: 1,
        prescriptionId: 1,
        medicineName: "Dummy medicine",
        quantity: 1,
        time: "Dummy time",
        duration: "Dummy duration",
      },
    ],
  },
  {
    encounter: {
      patientId: 2,
      doctorId: 2,
      prescriptionId: 2,
    },
    prescription: {
      prescriptionId: 2,
      notes: "Dummy notes 2",
      instructions: "Dummy instructions 2",
      scribbleNotes: "Dummy scribble notes 2",
      scribbleInstructions: "Dummy scribble instructions 2",
      audioNotes: "Dummy audio notes 2",
      audioInstructions: "Dummy audio instructions 2",
    },
    medications: [
      {
        medicationId: 2,
        prescriptionId: 2,
        medicineName: "Dummy medicine 2",
        quantity: 2,
        time: "Dummy time 2",
        duration: "Dummy duration 2",
      },
    ],
  },
];

const PharmaSearch: React.FC = () => {

  const [patientId, setPatientId] = useState("");
  const [encounters, setEncounters] = useState<EncounterWrapper[]>([]);
  const [encountersFetched, setEncountersFetched] = useState(false);
  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchLatestEncounters();
  }, []);

  const fetchLatestEncounters = async () => {

    try {

      const response = await fetch(`http://localhost:8085/ipd/get-latest-doctor-encounter-by-patient-id?patientId=`+ patientId);
      if (!response.ok) {
        throw new Error('Failed to fetch encounters');
      }
      const encounterData = await response.json();
      console.log(encounterData);

      const prescriptionResponse = await fetch(`http://localhost:8085/ipd/get-prescription?prescriptionId=${encounterData.prescriptionId}`);
      if (!prescriptionResponse.ok) {
        throw new Error('Failed to fetch prescription');
      }

      const prescriptionData = await prescriptionResponse.json();
      console.log(prescriptionData);
      const medicationResponse = await fetch(`http://localhost:8085/ipd/get-medication-by-prescription-id?prescriptionId=${encounterData.prescriptionId}`);
      if (!medicationResponse.ok) {
        throw new Error('Failed to fetch medication');
      }
      const medicationData = await medicationResponse.json();

      const encounter =  {
        encounter: encounterData,
        prescription: prescriptionData,
        medications: medicationData
      }

      setEncounters([encounter]);
      setEncountersFetched(true);

      console.log(encounter);
    }
    catch (error) {
      console.error('Error fetching encounters:', error);
      setEncountersFetched(false);
    }
  } 

  const handleFormSubmit = () => {
    console.log("Form submitted: ", { patientId });
    setPatientId(patientId);
    fetchLatestEncounters();
    setPatientId("");
  };

  const handleBackToForm = () => {
    // Reset patientId and encounters
    setPatientId("");
    setEncounters([]);
    setEncountersFetched(false);
  };

  return (
    <IonPage>
      <Header/>
      <IonContent className="ion-padding">
      <h1 className='text-center text-xl font-semibold'>Search Patient</h1>
      <form onSubmit={handleSubmit(handleFormSubmit)} className='max-w-lg mx-auto mt-12'>
        <TextInput name='patientId' placeHolder='Enter patient ID' label='Patient ID' control={control}/>
        <IonButton type='submit' shape='round'>Search</IonButton>
      </form>
        
      {/* {encountersFetched && (
        <IonButton onClick={handleBackToForm} color="light" className="back-button" shape="round">X</IonButton>
      )} */}

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
      
      </IonContent>
    </IonPage>
  );
};

export default PharmaSearch;
