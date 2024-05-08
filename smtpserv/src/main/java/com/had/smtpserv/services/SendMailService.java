package com.had.smtpserv.services;

import com.had.smtpserv.model.SendMailModel;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class SendMailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(SendMailModel sendMailModel){
        try {
            MimeMessage msg = mailSender.createMimeMessage();
            msg.setSubject("Request for consent");
            MimeMessageHelper helper = new MimeMessageHelper(msg,true);
            helper.setFrom("rish.rvv@gmail.com");
            helper.setTo(sendMailModel.getMailId());
            helper.setText(sendMailModel.getBody(),true);
            mailSender.send(msg);
        } catch(MessagingException ex){
            throw new RuntimeException("Unable to send email:" + ex);
        }
    }
}
