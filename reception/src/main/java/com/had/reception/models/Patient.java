package com.had.reception.models;

import org.hibernate.annotations.CreationTimestamp;

import com.google.protobuf.Timestamp;
import com.had.reception.converter.StringCryptoConverter;

import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// @Document(collection="")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Convert(converter = StringCryptoConverter.class) 
    private String name;
    private int age;
    private String bloodGroup;
    @Convert(converter = StringCryptoConverter.class) 
    private String gender;
    @Convert(converter = StringCryptoConverter.class) 
    private String phoneNo;
    @Convert(converter = StringCryptoConverter.class) 
    private String address;
    @Convert(converter = StringCryptoConverter.class)
    private String emailId;
    private boolean redacted;
    private int status;
}
