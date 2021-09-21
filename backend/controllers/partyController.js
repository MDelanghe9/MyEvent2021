import asyncHandler from "express-async-handler";
import Party from "../models/partyModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    POST party
// @route   POST /api/party/creatparty
// @access  Private
const partyCreat = asyncHandler(async (req, res) => {
  const { id_event, email_auth, name_auth, picture, date, adress, description, title } = req.body;
  var event_identifiant = id_event;
  /*
  description_auth: {
  adress_auth: {*/
  /*  res.status(201).json({
      event_identifiant,
      email_auth,
      name_auth,
      title,
      picture,
      date,
      adress,
      description,
    });*/
  const partyEvent = await Party.create({
    event_identifiant,
    email_auth,
    name_auth,
    title,
    picture,
    date,
    adress,
    description,
  });

  if (partyEvent) {
    res.status(201).json({
      partyEvent
    });
  } else {
    res.status(400).json({
      "error":"Sortie Non cree",
    });
  }
});

// @desc    GET all partys in databasse
// @route   GET /api/party/all
const getAllPartys = asyncHandler(async (req, res) => {
  const filter = {};
  const partys = await Party.find(filter);
  if (partys) {
    res.json({
      partys
    });
  } else {
    res.status({
      error: "pas de party trouver",
    });
  }
});

// @desc    PUT new message for chat of party
// @route   PUT /api/party/chat
const newMessage = asyncHandler(async (req, res) => {
  const { _id, message } = req.body;
  const partyEvent = await Party.updateOne({_id},{ $addToSet: { chat: message } })
  if (partyEvent) {
    const party = await Party.find({_id});
    if (party) {
      res.json({
        party
      });
    }else{
      res.status({
        error: "Message pas envoyer",
      });
    }
  } else {
    res.status({
      error: "Message pas envoyer",
    });
  }
});


export { partyCreat, getAllPartys, newMessage };