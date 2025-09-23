import nodemailer from 'nodemailer'

export default async function sendMailToSelf(name, email, message) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: email,
        to: process.env.GMAIL_USER,
        subject: `New Contact Query from ${name}`,
        text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);
}