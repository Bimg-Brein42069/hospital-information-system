package com.had.ipd.models;


import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
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
@Table(name="prescriptions")
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int prescriptionId;
    private String notes;
    private String instructions;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String scribbleNotes; // ALTER TABLE your_table MODIFY COLUMN scribble_instructions MEDIUMTEXT;
    
    @Column(columnDefinition = "MEDIUMTEXT")
    private String scribbleInstructions;
    
    @Column(columnDefinition = "MEDIUMTEXT")
    private String audioNotes;
    
    @Column(columnDefinition = "MEDIUMTEXT")
    private String audioInstructions;



    // Getter and Setter for prescriptionId
    public int getPrescriptionId() {
        return prescriptionId;
    }

    public void setPrescriptionId(int prescriptionId) {
        this.prescriptionId = prescriptionId;
    }

    // Getter and Setter for notes
    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    // Getter and Setter for instructions
    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }


    // Getter for scribbleNotes
    public String getScribbleNotes() {
        return scribbleNotes;
    }

    // Setter for scribbleNotes
    public void setScribbleNotes(String scribbleNotes) {
        this.scribbleNotes = scribbleNotes;
    }

    // Getter for scribbleInstructions
    public String getScribbleInstructions() {
        return scribbleInstructions;
    }

    // Setter for scribbleInstructions
    public void setScribbleInstructions(String scribbleInstructions) {
        this.scribbleInstructions = scribbleInstructions;
    }

    // Getter for audioNotes
    public String getAudioNotes() {
        return audioNotes;
    }

    // Setter for audioNotes
    public void setAudioNotes(String audioNotes) {
        this.audioNotes = audioNotes;
    }

    // Getter for audioInstructions
    public String getAudioInstructions() {
        return audioInstructions;
    }

    // Setter for audioInstructions
    public void setAudioInstructions(String audioInstructions) {
        this.audioInstructions = audioInstructions;
    }

}
