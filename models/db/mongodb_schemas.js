import mongoose from 'mongoose';

//-----------------------------------------------------------------------------
// COLLECTIONS
//-----------------------------------------------------------------------------
const usersCollection = 'users';

//-----------------------------------------------------------------------------
// SCHEMAS
//-----------------------------------------------------------------------------
const usersSchema = new mongoose.Schema(
  {
    user: { type: String, maxLength: 50, required: true },
    pwdHash: { type: String, maxLength: 60, required: true },
  },
  { versionKey: false }
);

//-----------------------------------------------------------------------------
// MODELS
//-----------------------------------------------------------------------------

const userModel = mongoose.model(usersCollection, usersSchema);
export { mongoose, userModel };
