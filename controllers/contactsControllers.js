const { Contact, schemas } = require("../models/contactModel.js");
const HttpError = require("../helpers/HttpError.js");

const getAllContacts = async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
};

const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    next(HttpError(404));
  } else {
    res.json(result);
  }
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    next(HttpError(404));
  } else {
    await Contact.findByIdAndDelete(id);
    res.json({
      message: "Delete success",
    });
  }
};

const createContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    next(HttpError(404));
  } else {
    res.status(201).json(result);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    next(HttpError(404));
  } else {
    res.status(201).json(result);
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
};
