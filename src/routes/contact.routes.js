import { Router } from "express";
import { getContacts, createContact } from "../controllers/contact.controller.js";

const contactRoutes = Router();

contactRoutes.post("/", createContact);
contactRoutes.get("/", getContacts);




export default contactRoutes;