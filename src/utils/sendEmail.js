import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

export const sendEmail = async ({ name, email, message}) => {
    await transporter.sendEmail({
        from: `"Contact From" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: "New Contact Message",
        html: `
            <h3>New Message</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `,
    });
};