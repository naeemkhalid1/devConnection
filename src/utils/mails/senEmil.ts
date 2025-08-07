const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendEmail = async (to: string, name: string): Promise<void> => {
  console.log("email:", process.env.MAIL_USER, process.env.MAIL_PASS);
  await transport.sendMail({
    from: process.env.MAIL_USER,
    to,
    subject: "Congrats on Creating Account",
    html: `
  <div style="font-family: Arial, sans-serif; background: #f1f1f1; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 8px;">
      <h2 style="text-align: center; color: #222;">🔐 Email Verification</h2>
      <p>Hello <strong>${name}</strong>,</p>
      <p style="font-size: 16px;">Thanks for signing up! Please use the code below to verify your email address:</p>
      <h1 style="text-align: center; color: #007bff;">${name}</h1>
      <p style="text-align: center;">This code will expire in 10 minutes.</p>
      <hr />
      <p style="font-size: 12px; color: gray;">If you didn’t request this, you can safely ignore this email.</p>
    </div>
  </div>
`,
  });
};
