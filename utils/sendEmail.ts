import nodemailer from 'nodemailer';
import tls from 'tls';
interface EmailConfig {
    service: string;
    auth: {
        user: string;
        pass: string;
    };
    tls: {
        rejectUnauthorized: boolean,

    }
}

const emailConfig: EmailConfig = {
    service: 'gmail',
    auth: {
        user: '_',
        pass: '_',
    },
    tls: {
        rejectUnauthorized: false,
    },
};

const transporter = nodemailer.createTransport({
    service: emailConfig.service,
    auth: emailConfig.auth,
    tls: emailConfig.tls,
    debug: true
})


export const sendEmail = async (mailOptions: { from: string, to: string, subject: string, text: string }) => {
    return transporter.sendMail(mailOptions)
}