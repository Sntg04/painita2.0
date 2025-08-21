import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function sendOtpSMS(telefono, otp) {
  return client.messages.create({
    body: `Tu código de verificación es: ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: `+57${telefono}` // Asumiendo Colombia
  });
}
