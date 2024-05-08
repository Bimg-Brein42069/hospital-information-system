import { IonPage, IonContent, IonButton, IonAlert } from "@ionic/react"
import { useForm } from "react-hook-form"
import Header from "../../../components/Header"
import React, { useEffect, useState } from "react"
import TextInput from "../../../components/TextInput"
import { useSelector } from "react-redux"

interface pDetails{
    id:number,
    emailId:string
}

type FormInputs = {
    patientId:number
}

const AddConsent:React.FC = () => {
    const {control,handleSubmit,reset} = useForm()
    const user = useSelector((state: any) => state.user.currentUser);
    const [eId,setEmailId] =useState<pDetails>();

    useEffect(() => {
        if(!eId)
            return ;
        sendEmail();
    },[eId])

    const sendEmail = async () => {
        /*Iske jagah pe ek mailer daalna hoga ki add-consent krte hi patient ke mail-id mein chalejae,fir ye call hogi.
            Node mailer try kiya but error de rha hai ye. Koi aur ye mailer wala kaam karo.
        */
        const htmlData = '<p>Your consent form:<a href=\"http://localhost:8100/patient/consent-form/' + user.id + '/' + eId?.id + '\">Here</a></p>';
        console.log(htmlData,eId?.emailId);
        try{
            const response = await fetch('http://localhost:5001/mail/send-mail',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({mailId:eId?.emailId,body:htmlData})
            })
            if(!response.ok){
                throw new Error('Failed to write email')
            }
            const rdata=await response.text();
            console.log('Send mail success')
            reset()
        }catch(error){
            console.error('Unable to write email')
        }
    }

    const onsubmit = async (data:any) => {
        
        try {
            const response = await fetch('http://localhost:8081/patient/get-demographics?id=' + data.patientId);
            if(!response.ok){
                throw new Error('Failed to add consent')
            }
            const rdata=await response.json()
            setEmailId(rdata)
        }catch(error){
            console.error("Error adding consent")
        }

    } 

    return (
        <IonPage>
            <Header />
            <IonContent className='ion-padding'>
                <form onSubmit={handleSubmit(onsubmit)} className="max-w-6xl mx-auto mt-5">
                    <h1 className='text-center text-2xl font-semibold mb-8'>Ask consent for patient data</h1>
                    <TextInput name='patientId'
                        placeHolder="Enter patient details to get consent"
                        label="Patient ID"
                        control={control}
                    />
                    <IonButton type='submit'>Ask for consent</IonButton>
                </form>
            </IonContent>
        </IonPage>   
    )
}

export default AddConsent