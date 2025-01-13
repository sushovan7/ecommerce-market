import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "8230c9001@smtp-brevo.com",
    pass: "8GndrN2HQyXgzxs5",
  },
});

export default transporter;
