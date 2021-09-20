import mongoose from "mongoose";

const partySchema = mongoose.Schema(
  {
    event_identifiant: {
      type: Number,
      required: true,
      unique: false
    },
    email_auth: {
      type: String,
      required: true,
      unique: false
    },
    name_auth: {
      type: String,
      required: true,
      unique: false
    },
    visibility: {
      type: String,
      default:"private"
    },
    menber: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Party = mongoose.model("Party", partySchema);

export default Party;