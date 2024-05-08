package com.had.reception.models;

import org.hibernate.annotations.CreationTimestamp;

import com.google.protobuf.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Bed {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer accomadationId;

    // @Column(name =  "bedno")
    private Integer bedNo;

    // @Column(name =  "wardno")
    private Integer wardNo;
    
    private Integer floorNo;
    private Integer patientId;
    private String status;


}
