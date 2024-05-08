package com.had.ipd.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConsentMap {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private int id;
    private int patientId;
    private int doctorId;
}
