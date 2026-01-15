import { Contact } from "../models/contact.models.js";

export const createContact = async (req, res) => {
    try {
        const { name, email, message} = req.body;


        //basic validation
        if(!name || !email || !message) {
            return res.status(400).json({
                message: "All fields are required"
            })

        }

        await Contact.create({
            name,
            email,
            message
        })
        return res.status(201).json({
            message: "Contact created successfully"
        })
    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(501).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

export const getContacts = async (req, res) => {
    const contacts = await Contact.find().sort({ createdAt: -1});
    res.json(contacts);
}