require("dotenv").config();
const nodemailer = require("nodemailer");

async function main() {
    try {
        console.log("Email:", process.env.EMAIL);
        console.log("Pass length:", process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: process.env.EMAIL, // Send to self
            subject: "Test OTP Email",
            text: "This is a test email to verify nodemailer configuration.",
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

main();
