import express from 'express';
import Stripe from 'stripe';
import db from '../db/config.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { priceId, companyId } = req.body;

    const company = await db.execute({
      sql: 'SELECT * FROM companies WHERE id = ? AND owner_id = ?',
      args: [companyId, req.user.userId]
    });

    if (!company.rows[0]) {
      return res.status(404).json({ error: 'Company not found' });
    }

    let { stripe_customer_id: customerId } = company.rows[0];

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: req.user.email,
        metadata: { companyId }
      });
      customerId = customer.id;

      await db.execute({
        sql: 'UPDATE companies SET stripe_customer_id = ? WHERE id = ?',
        args: [customerId, companyId]
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/settings?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/settings`,
      metadata: { companyId }
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/create-portal-session', async (req, res) => {
  try {
    const { companyId } = req.body;

    const company = await db.execute({
      sql: 'SELECT * FROM companies WHERE id = ? AND owner_id = ?',
      args: [companyId, req.user.userId]
    });

    if (!company.rows[0]?.stripe_customer_id) {
      return res.status(404).json({ error: 'No subscription found' });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: company.rows[0].stripe_customer_id,
      return_url: `${process.env.FRONTEND_URL}/settings`,
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;