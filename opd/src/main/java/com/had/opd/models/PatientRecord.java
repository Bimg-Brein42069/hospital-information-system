package com.had.opd.models;

import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.google.protobuf.Timestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
// import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int recordId;
    private int patientId;
    private int doctorId;
    private String hospitalName;
    private String patientComplaints;

    // vitals
    private double weight;
    private double height;
    private double temperature;
    private int lowBP;
    private int highBP;

    private int prescriptionId;
    /* extras
     * notes is when doctor wants some extra checkup like X-ray, EMR, etc.
     * advice is similar to instructions in IPD
     */
    
    // date
    private String followUp; // next date doctor gives to a patient

}
