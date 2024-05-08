package com.had.lab.model;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.annotation.Generated;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DiagnosisReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int diagnosisId;
    private int patientId;
    private String path;
    // private String fileData;



    public int getDiagnosisId() {
        return diagnosisId;
    }

    public void setDiagnosisId(int diagnosisId) {
        this.diagnosisId = diagnosisId;
    }

    public int getPatientId() {
        return patientId;
    }

    public void setPatientId(int patientId) {
        this.patientId = patientId;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    // public String getFileData(){
    //     return fileData;
    // }

    // public void setFileData(String fileData){
    //     this.fileData = fileData;
    // }
}
