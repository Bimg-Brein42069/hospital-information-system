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
public class OpdAppointment {
    @Id
    private int patientId;
    private int doctorId;
    private String reason;
    private boolean isactive;

}
