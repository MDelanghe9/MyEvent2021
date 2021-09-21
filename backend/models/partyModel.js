import mongoose from "mongoose";

const partySchema = mongoose.Schema(
  {
    event_identifiant: {
      type: Number,
      required: true,
    },
    email_auth: {
      type: String,
      required: true,
    },
    description_auth: {
      type: String,
    },
    adress_auth: {
      type: String,
    },
    title_auth: {
      type: String,
    },
    title: {
      type: String,
    },
    picture: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    adress: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    visibility: {
      type: String,
      default:"private"
    },
    menber: {
      type: Array,
    },
    chat: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Party = mongoose.model("Party", partySchema);

export default Party;