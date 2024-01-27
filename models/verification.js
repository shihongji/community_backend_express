import mongoose from 'mongoose';

const { Schema } = mongoose;
const verificationCodeSchema = new Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  created: { type: Date, expires: '30m', default: Date.now },
});

const VerificationCode = mongoose.model('VerificationCode', verificationCodeSchema);
export default VerificationCode;
