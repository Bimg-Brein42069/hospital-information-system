package com.had.reception.models;

import org.hibernate.annotations.CreationTimestamp;

import com.google.protobuf.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class IpdAppointment {
    @Id
    private Integer patientId;
    private Integer wardNo;
    private Integer bedNo;
    private Boolean isActive;


}
