import { IonButton, IonContent, IonPage } from "@ionic/react";
import React, { useState } from "react";
import { useParams } from "react-router";

const ConsentForm:React.FC = () => {
    const docId=useParams<{doctorId:string}>();
    const pId=useParams<{patientId:string}>();
    const [granted,setGranted] = useState(false);

    const onsubmit = async() => {
        const pdata={patientId:pId.patientId,doctorId:docId.doctorId}
        try{
            const response=await fetch('http://localhost:8085/consent/add-consent',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(pdata)
            })
            if(!response.ok){
                throw new Error('Failed to add patient')
            }
            const rdata=await response.text();
            setGranted(true);
            alert('Your consent has been granted, you can now close the tab')
        }catch(error){
            console.error("Error adding patient")
        }
    }

    function CNF(){
        return (
            <div className="max-w-max mx-auto mt-1">    		   
    		 <div className="container"><h1 className='text-center text-2xl font-bold'>Terms and Conditions</h1><p>This Privacy Policy governs how we, MedPlusPlus hospitals unit of MedPlusPlus fertility Research Center private limited, a company duly incorporated in the year 2024 under the provisions of the Companies Act,1956 , having its registered office No76 &amp;77 Harrington Road, Chetpet, Chennai 600031. (collectively,"MedPlusPlus Hospital", "Company", "we", "us", or "our") collect, use, share and process your information, that you provide to us through your use of the app, MedPlusPlus hospitals in the course of availing services that are made available on the said app as defined in the Terms and Conditions&nbsp; to you.</p><p>Owner of the MedPlusPlus hospitals app, respects your privacy, and seeks to comply with applicable legal requirements, including the Information Technology Act, 2000 as amended from time to time, in respect of data collection, processing, and transfer.</p><p>Please read this Privacy Policy carefully. By accessing or using this App, you agree to be bound by the terms described herein and all the terms incorporated by reference. If you do not agree to all of these terms, do not use App.</p><p style={{textAlign: 'center'}}><b><u>User Agreement:</u></b></p><p>By using the hospital app, you agree to abide by the terms and conditions outlined herein.</p><p><b>Access and Usage:</b></p><p>Access to the app is granted for the purpose of obtaining healthcare information, scheduling appointments, and other related services. Unauthorized use is strictly prohibited.</p><p><b>User Responsibilities:</b></p><p>Users are responsible for providing accurate and up-to-date information during registration and while using the app. Misuse or fraudulent activities will result in account termination.</p><p><b>Confidentiality:&nbsp;</b></p><p>All personal health information shared through the app is treated with the utmost confidentiality. The hospital app adheres to strict privacy and data protection regulations.</p><p><b>Service Availability:</b></p><p>The hospital app strives to provide uninterrupted services, but we do not guarantee 24/7 availability. Maintenance or unforeseen issues may temporarily impact access.</p><p><b>Appropriate Conduct:</b></p><p>Users must engage in respectful and appropriate conduct while using the app. Any form of harassment, discrimination, or abusive behavior is strictly prohibited.</p><p><b>Intellectual Property:</b></p><p>All content, trademarks, and intellectual property within the hospital app are owned by the hospital or its licensors. Users may not reproduce or distribute such content without permission.</p><p><b>Security Measures:</b></p><p>Users are responsible for maintaining the security of their login credentials. Any unauthorized access due to negligence on the user's part will be their sole responsibility.</p><p><b>Updates and Modifications:</b>&nbsp;</p><p>The hospital reserves the right to update, modify, or discontinue features of the app. Users will be notified of significant changes, and continued use implies acceptance of these changes.</p><p><b>Termination of Access:</b></p><p>The hospital reserves the right to terminate a user's access to the app for violation of terms, illegal activities, or any behavior deemed inappropriate.</p><p><b>Disclaimer of Liability:</b></p><p>The hospital app is provided "as is" without any warranties. The hospital is not liable for any direct, indirect, incidental, or consequential damages arising from the use of the app.</p><p><b>Medical Reports and Ex-Spouse, relatives, friends and other registered Information:&nbsp;</b></p><p>If the hospital app provides features allowing users to access medical reports or information related to be Ex-Spouse, relatives, friends and other registered using your phone number, the hospital holds no responsibility for the accuracy, completeness, or privacy of such information. Users are solely responsible for obtaining consent and ensuring compliance with legal and ethical standards.</p><p><b>Governing Law:</b></p><p>These terms and conditions are governed by the laws of Chennai. Any disputes shall be resolved in the appropriate courts of Chennai. By using the hospital app, you acknowledge that you have read, understood, and agreed to these terms and conditions.</p><p><br/></p></div>
            </div>
        )
    }

    return (
        <IonPage>
            {
                !granted && 
            <IonContent>
                <CNF />
                <div className="ion-text-center ion-padding "><IonButton className='font-semibold' onClick={onsubmit}>Allow consent</IonButton></div>
            </IonContent>
            }
        </IonPage>
    )
}

export default ConsentForm;