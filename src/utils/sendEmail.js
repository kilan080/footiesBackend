import nodemailer from 'nodemailer';

  console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "LOADED" : "MISSING");
export const sendMail = async ({ name, email, message}) => {
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });


    
  
    try {
        await transporter.sendMail({
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
        
    } catch (error) {
        console.error("Email failed:", error)
        throw error;
    }
};