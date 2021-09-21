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


// @desc    POST chat of party
// @route   POST /api/party/chat
const getParty = asyncHandler(async (req, res) => {
  const { _id } = req.body;
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
});

// @desc    POST ask invitation to a party
// @route   POST /api/party/askInvitation
const askInvitation = asyncHandler(async (req, res) => {
  const { _id, name } = req.body;
  const partyEvent = await Party.updateOne({_id},{ $addToSet: { askingInvitation: [name] } })
  if (partyEvent) {
    const party = await Party.find({_id});
    if (party) {
      res.json({
        party
      });
    }else{
      res.status({
        error: "Invitation pas envoyer",
      });
    }
  } else {
    res.status({
      error: "Party not find",
    });
  }
});

// @desc    POST refused invitation to a party
// @route   POST /api/party/refuseInvitation
const refuseInvitation = asyncHandler(async (req, res) => {
  const { _id, name } = req.body;
  const partyEvent = await Party.updateOne({_id},{ $pullAll: { askingInvitation: [name] } })
  if (partyEvent) {
    const party = await Party.find({_id});
    if (party) {
      res.json({
        party
      });
    }else{
      res.status({
        error: "Party not find",
      });
    }
  } else {
    res.status({
      error: "la demande de supresion de la demande n'a put aboutir",
    });
  }
});


// @desc    POST accept invitation to a party
// @route   POST /api/party/acceptInvitation
const acceptInvitation = asyncHandler(async (req, res) => {
  const { _id, name } = req.body;
  const partyEvent = await Party.updateOne({_id},{ $pullAll: { askingInvitation: [name] } })
  const partyEvent2 = await Party.updateOne({_id},{ $addToSet: { menber: [name] } })
  if (partyEvent && partyEvent2) {
    const party = await Party.find({_id});
    if (party) {
      res.json({
        party
      });
    }else{
      res.status({
        error: "Party not find",
      });
    }
  } else {
    res.status({
      error: "la demande de supresion de la demande n'a put aboutir",
    });
  }
});

// @desc    POST bannie un menbre to a party
// @route   POST /api/party/kickUser
const kickUser = asyncHandler(async (req, res) => {
  const { _id, name } = req.body;
  const partyEvent = await Party.updateOne({_id},{ $pullAll: { menber: [name] } })
  if (partyEvent) {
    const party = await Party.find({_id});
    if (party) {
      res.json({
        party
      });
    }else{
      res.status({
        error: "Party not find",
      });
    }
  } else {
    res.status({
      error: "la demande de supresion de la demande n'a put aboutir",
    });
  }
});

// @desc    POST invite un user to a party
// @route   POST /api/party/inviteUser
const inviteUser = asyncHandler(async (req, res) => {
  const { _id, name } = req.body;
  const partyEvent = await Party.updateOne({_id},{ $addToSet: { askingInvitationByAuthor: [name] } })
  if (partyEvent) {
    const party = await Party.find({_id});
    if (party) {
      res.json({
        party
      });
    }else{
      res.status({
        error: "Party not find",
      });
    }
  } else {
    res.status({
      error: "la demande de supresion de la demande n'a put aboutir",
    });
  }
});

// @desc    POST cancel invitation d'un user to a auth party
// @route   POST /api/party/cancelInvite
const cancelInvite = asyncHandler(async (req, res) => {
  const { _id, name } = req.body;
  const partyEvent = await Party.updateOne({_id},{ $pullAll: { askingInvitationByAuthor: [name] } })
  if (partyEvent) {
    const party = await Party.find({_id});
    if (party) {
      res.json({
        party
      });
    }else{
      res.status({
        error: "Party not find",
      });
    }
  } else {
    res.status({
      error: "la demande de supresion de la demande n'a put aboutir",
    });
  }
});

// @desc    POST user leave target party
// @route   POST /api/party/leaveParty
const leaveParty = asyncHandler(async (req, res) => {
  const { _id, name } = req.body;
  const partyEvent = await Party.updateOne({_id},{ $pullAll: { menber: [name] } })
  if (partyEvent) {
    const party = await Party.find({_id});
    if (party) {
      res.json({
        party
      });
    }else{
      res.status({
        error: "Party not find",
      });
    }
  } else {
    res.status({
      error: "la demande de supresion de la demande n'a put aboutir",
    });
  }
});
// @desc    POST delete msg in chat party
// @route   POST /api/party/deleteMsg
const deleteMsg = asyncHandler(async (req, res) => {
  const { _id, msg } = req.body;
  const partyEvent = await Party.updateOne({_id},{ $pullAll: { chat: [msg] } })
  if (partyEvent) {
    const party = await Party.find({_id});
    if (party) {
      res.json({
        party
      });
    }else{
      res.status({
        error: "Party not find",
      });
    }
  } else {
    res.status({
      error: "la demande de supresion de la demande n'a put aboutir",
    });
  }
});
// @desc    POST insert field custom for party
// @route   POST /api/party/setFieldParty
const setFieldParty = asyncHandler(async (req, res) => {
  const { _id, titleActualParty, adressActualParty, descriptionActualParty } = req.body;
  const partyEvent = await Party.updateOne({_id}, 
    {title_auth: titleActualParty,
      adress_auth: adressActualParty,
     description_auth: descriptionActualParty }
  )
  if (partyEvent) {
    const party = await Party.find({_id});
    if (party) {
      res.json({
        party
      });
    }else{
      res.status({
        error: "Party not find",
      });
    }
  } else {
    res.status({
      error: "la demande de supresion de la demande n'a put aboutir",
    });
  }
});

// @desc    POST change visibily of party
// @route   POST /api/party/setVisibility
const setVisibility = asyncHandler(async (req, res) => {
  const { _id, visibility } = req.body;
  const partyEvent = await Party.updateOne({_id}, 
    {visibility: visibility }
  )
  if (partyEvent) {
    const party = await Party.find({_id});
    if (party) {
      res.json({
        party
      });
    }else{
      res.status({
        error: "Party not find",
      });
    }
  } else {
    res.status({
      error: "la demande de supresion de la demande n'a put aboutir",
    });
  }
});

// @desc    POST delete party
// @route   POST /api/party/cancelParty
const cancelParty = asyncHandler(async (req, res) => {
  const { _id, visibility } = req.body;
  const result = await Party.deleteOne({_id});
  res.json({
    result
  });
});

export { partyCreat, cancelParty, getAllPartys, newMessage, deleteMsg, getParty, setFieldParty, setVisibility,
   askInvitation, refuseInvitation, acceptInvitation, kickUser, inviteUser, cancelInvite, leaveParty};