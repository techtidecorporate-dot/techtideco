import Partner from '../models/Partner.js';
import sendEmail from '../utils/sendEmail.js';

export const createPartnerRequest = async (req, res) => {
  try {
    const partner = new Partner(req.body);
    const createdPartner = await partner.save();

    // Send confirmation email
    try {
      // Send confirmation email to user
      await sendEmail({
        email: createdPartner.email,
        subject: 'Partnership Request Received - TechTide Co.',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
            <h2 style="color: #453abc;">Hello ${createdPartner.fullName},</h2>
            <p>Thank you for reaching out to <strong>TechTide Co.</strong> regarding a potential partnership.</p>
            <p>We have received your project details for <strong>${createdPartner.service}</strong> with a budget range of <strong>${createdPartner.budget}</strong>.</p>
            <p>Our team is currently reviewing your request and will get back to you within 24 hours to discuss the next steps.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 0.9em; color: #666;">Best regards,<br>The TechTide Team<br>info@techtidecorporate.com</p>
          </div>
        `
      });

      // Send notification email to Admin
      await sendEmail({
        email: process.env.FROM_EMAIL,
        subject: `New Partnership Request: ${createdPartner.service}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
            <h2 style="color: #453abc;">New Partnership Request</h2>
            <p><strong>Name:</strong> ${createdPartner.fullName}</p>
            <p><strong>Email:</strong> ${createdPartner.email}</p>
            <p><strong>Company:</strong> ${createdPartner.companyName || 'N/A'}</p>
            <p><strong>Phone:</strong> ${createdPartner.phone}</p>
            <p><strong>Service:</strong> ${createdPartner.service}</p>
            <p><strong>Budget:</strong> ${createdPartner.budget}</p>
            <p><strong>Description:</strong></p>
            <p>${createdPartner.description}</p>
          </div>
        `
      });
    } catch (emailError) {
      console.error('Email confirmation failed:', emailError);
      // We don't fail the request if only the email fails
    }

    res.status(201).json(createdPartner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPartnerRequests = async (req, res) => {
  try {
    const requests = await Partner.find({}).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
