const express = require("express");
const ctrl = require("../controllers/contactsControllers.js");
const validateBody = require("../helpers/validateBody.js");
const { schemas } = require("../models/contactModel.js");
const ctrlWrapper = require("../helpers/ctrlWrapper.js");
const isValidId = require("../helpers/isValidId.js");

const contactsRouter = express.Router();

contactsRouter.get("/", isValidId, ctrlWrapper(ctrl.getAllContacts));

contactsRouter.get("/:id", isValidId, ctrlWrapper(ctrl.getOneContact));

contactsRouter.delete("/:id", isValidId, ctrlWrapper(ctrl.deleteContact));

contactsRouter.post(
  "/",
  validateBody(schemas.createContactSchema),
  ctrlWrapper(ctrl.createContact)
);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(schemas.createContactSchema),
  ctrlWrapper(ctrl.updateContact)
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = contactsRouter;
