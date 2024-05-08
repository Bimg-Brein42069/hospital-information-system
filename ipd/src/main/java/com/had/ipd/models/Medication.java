package com.had.ipd.models;

import java.security.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Medication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int medicationId;
    private int prescriptionId;
    private String medicineName;
    private int quantity;
    private String time;
    private String duration;


    // Getter and Setter for medicationId
    public int getMedicationId() {
        return medicationId;
    }

    public void setMedicationId(int medicationId) {
        this.medicationId = medicationId;
    }

    public int getPrescriptionId(){
        return prescriptionId;
    }

    public void setPrescriptionId(int prescriptionId){
        this.prescriptionId = prescriptionId;
    }

    // Getter and Setter for medicineName
    public String getMedicineName() {
        return medicineName;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    // Getter and Setter for quantity
    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    // Getter and Setter for time
    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    // Getter and Setter for duration
    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }
}

