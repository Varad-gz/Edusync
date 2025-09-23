import nodemailer from 'nodemailer'

export async function sendAccountCreationMail(to, password, user) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: "Edusync Core <edusync.core@gmail.com>",
        to,
        subject: "Your Account Details",
        html: `
          <p>Hi,</p>
          <p>Your account has been created successfully. Here are your login details:</p>
          <p><b>Email:</b> ${to}</p>
          <p><b>Password:</b> ${password}</p>
          <p>You can log in using the link below:</p>
          <a href="http://localhost:3000/${user}/signin?email=${encodeURIComponent(to)}">Login Now</a>
        `,
    };

    await transporter.sendMail(mailOptions);
}