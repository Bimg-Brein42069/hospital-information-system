package com.had.smtpserv.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SendMailModel {
    private String mailId;
    private String body;
}
