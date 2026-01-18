import { Contact } from "../models/contact.models.js";
import { sendEmail } from  "../utils/sendEmail.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = await Contact.create({
      name,
      email,
      message,
    });

    await sendEmail({ name, email, message });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send message" });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
};
