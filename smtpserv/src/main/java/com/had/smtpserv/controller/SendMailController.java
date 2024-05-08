package com.had.smtpserv.controller;

import com.had.smtpserv.model.SendMailModel;
import com.had.smtpserv.services.SendMailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



@RestController
@CrossOrigin
@RequestMapping("/mail")
public class SendMailController {

    @Autowired
    private SendMailService mailSvc;

    @PostMapping("/send-mail")
    public void sendMail(@RequestBody SendMailModel sendMailModel){
        mailSvc.sendEmail(sendMailModel);
    }
}
