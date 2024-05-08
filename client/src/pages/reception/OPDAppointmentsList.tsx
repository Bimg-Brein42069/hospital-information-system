import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';

const OPDAppointmentsList: React.FC = () => {

  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
		fetchData();
	}, []);

  const fetchData = async () => {
		try {
			const response = await fetch('http://localhost:8081/patient/get-opd-appointments');
			if (!response.ok) {
				throw new Error('Failed to fetch data');
			}
			const data = await response.json();
			setAppointments(data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

  const delData = async(id) => {
    const newData=appointments.filter(patient => patient.patientId !== id);
    setAppointments(newData)
    try {
			const response = await fetch('http://localhost:8081/patient/delete-opd-appointment?patientId=' + id, {
        method:'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
      });
			if (!response.ok) {
				throw new Error('Failed to delete data');
			}
		} catch (error) {
			console.error('Error deleting data:', error);
		}
  }
	

	return(
    <IonPage>
      <Header/>
      <IonContent>
        <h1 className='text-center text-xl font-semibold my-5'>OPD Appointments</h1>
        <IonGrid className="border-2 border-solid border-black mx-20 mb-5">
          <IonRow className="border-b-2 border-solid border-black font-semibold">
            <IonCol>Patient ID</IonCol>
            <IonCol>Appt Date</IonCol>
            <IonCol>Doctor</IonCol>
            <IonCol>Cancel Appt</IonCol>
          </IonRow>
          {
            appointments.map(patient => (
              <IonRow className='flex flex-row items-center' key={patient.patientId}>
                <IonCol>{patient.patientId}</IonCol>
                <IonCol>{patient.reason}</IonCol>
                <IonCol>{patient.doctorId}</IonCol>
                <IonCol>
                  <IonButton onClick={() => delData(patient.patientId)}>Cancel Appt</IonButton>
                </IonCol>
              </IonRow>
            ))
          }
        </IonGrid>
      </IonContent>
    </IonPage>
	);
}

export default OPDAppointmentsList;