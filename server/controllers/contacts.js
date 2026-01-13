import Contact from '../models/Contact.js';
import sendEmail from '../utils/sendEmail.js';

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const createdContact = await contact.save();

    // Send confirmation email
    try {
      await sendEmail({
        email: createdContact.email,
        subject: 'Message Received - TechTide Co.',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
            <h2 style="color: #453abc;">Hello ${createdContact.name},</h2>
            <p>Thank you for contacting <strong>TechTide Co.</strong></p>
            <p>We have received your message regarding <strong>${createdContact.subject}</strong>.</p>
            <p>Our team will review your inquiry and get back to you as soon as possible.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 0.9em; color: #666;">Best regards,<br>The TechTide Team<br>info@techtidecorporate.com</p>
          </div>
        `
      });

      // Send notification email to Admin
      await sendEmail({
        email: process.env.FROM_EMAIL,
        subject: `New Support Message: ${createdContact.subject}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
            <h2 style="color: #453abc;">New Support Inquiry</h2>
            <p><strong>Name:</strong> ${createdContact.name}</p>
            <p><strong>Email:</strong> ${createdContact.email}</p>
            <p><strong>Phone:</strong> ${createdContact.phone || 'N/A'}</p>
            <p><strong>Subject:</strong> ${createdContact.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${createdContact.message}</p>
          </div>
        `
      });
    } catch (emailError) {
      console.error('Email confirmation failed:', emailError);
    }

    res.status(201).json(createdContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateContactStatus = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (contact) {
      contact.status = req.body.status || contact.status;
      const updatedContact = await contact.save();
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Contact message not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (contact) {
      await contact.deleteOne();
      res.json({ message: 'Contact message removed' });
    } else {
      res.status(404).json({ message: 'Contact message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
