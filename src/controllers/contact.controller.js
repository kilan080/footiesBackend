import { Contact } from "../models/contact.models.js";
import { sendMail } from "../utils/sendEmail.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const contact = await Contact.create({ name, email, message });

    await sendMail({ name, email, message });


    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: contact,
    });

  } catch (error) {

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This email has already sent a message",
      });
    }

    console.error(error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: contacts,
    });

  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      success: false,
      message: "Error fetching contacts",
    });
  }
};
