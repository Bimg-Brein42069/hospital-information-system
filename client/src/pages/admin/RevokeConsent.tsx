import { IonPage, IonContent, IonButton } from "@ionic/react";
import { useForm } from "react-hook-form";
import React from "react";
import Header from "../../components/Header";
import TextInput from "../../components/TextInput";

type FormInputs = {
  patientId: number;
  doctorId: number;
};

const RevokeConsent: React.FC = () => {

  const { control, handleSubmit, reset } = useForm();

  const onsubmit = async (data: any) => {
    try {
      const response = await fetch(
        "http://localhost:8085/consent/revoke-consent?patientId=" +
          data.patientId +
          "&doctorId=" +
          data.doctorId,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to revoke consent");
      }
      const rdata = await response.text();
      console.log("Revoked patient consent");
    } catch (error) {
      console.error("Error revoking consent");
    }
  };

  return (
    <IonPage>
      <Header/>
      <IonContent className="ion-padding">
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="max-w-md mx-auto mt-12"
        >
          <h1 className="text-center text-2xl font-semibold mb-8">
            Revoke consent for patient data
          </h1>
          <TextInput
            name="patientId"
            placeHolder="Enter patient details to revoke consent"
            label="Patient ID"
            control={control}
          />
          <TextInput
            name="doctorId"
            placeHolder="Enter doctor id to revoke consent"
            label="Doctor ID"
            control={control}
          />
          <IonButton type="submit">Revoke consent</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default RevokeConsent;
