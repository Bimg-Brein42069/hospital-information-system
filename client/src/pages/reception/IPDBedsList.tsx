import { IonPage, IonContent, IonCol, IonGrid, IonRow } from "@ionic/react";
import { useState, useEffect } from "react";
import Header from "../../components/Header";

const IPDBedsList: React.FC = () => {
  const [Bed, setBed] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8081/patient/view-beds");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(data);
      setBed(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <IonPage>
      <Header />
      <IonContent>
        <h1 className='text-center text-xl font-semibold my-5'>IPD Beds List</h1>
        <IonGrid className="border-2 border-solid border-black mx-20 mb-5">
          <IonRow className="border-b-2 border-solid border-black font-semibold">
            <IonCol>Bed Number</IonCol>
            <IonCol>Ward Number</IonCol>
            <IonCol>Floor Number</IonCol>
            <IonCol>Status</IonCol>
          </IonRow>
          {Bed.map((Bed) => (
            <IonRow key={Bed.accomadationId}>
              <IonCol>{Bed.bedNo}</IonCol>
              <IonCol>{Bed.wardNo}</IonCol>
              <IonCol>{Bed.floorNo}</IonCol>
              <IonCol>{Bed.status}</IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default IPDBedsList;
