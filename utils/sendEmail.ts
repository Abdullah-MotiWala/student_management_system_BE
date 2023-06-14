import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({})


export const sendEmail = async (mailOptions: { from: string, to: string, subject: string, text: string }) => {
    return transporter.sendMail(mailOptions)
}