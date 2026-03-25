const db = require('../db');

const PLAN_PRICES = {
  monthly: 10,
  yearly: 100,
};

exports.subscribe = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { plan_type } = req.body;
    if (!plan_type || !PLAN_PRICES[plan_type]) {
      return res.status(400).json({ message: 'Invalid subscription plan type.' });
    }

    const price = PLAN_PRICES[plan_type];
    const charity_amount = Math.max(1, Math.round(price * 0.1 * 100) / 100);

    const renewal_date = new Date();
    if (plan_type === 'monthly') {
      renewal_date.setMonth(renewal_date.getMonth() + 1);
    } else {
      renewal_date.setFullYear(renewal_date.getFullYear() + 1);
    }

    const existing = await db.query('SELECT id FROM subscriptions WHERE user_id = $1', [userId]);
    let subscription;
    if (existing.rows.length > 0) {
      const update = await db.query(
        'UPDATE subscriptions SET plan_type = $1, status = $2, renewal_date = $3, price = $4, charity_amount = $5 WHERE user_id = $6 RETURNING *',
        [plan_type, 'active', renewal_date, price, charity_amount, userId]
      );
      subscription = update.rows[0];
    } else {
      const insert = await db.query(
        'INSERT INTO subscriptions (user_id, plan_type, status, renewal_date, price, charity_amount) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
        [userId, plan_type, 'active', renewal_date, price, charity_amount]
      );
      subscription = insert.rows[0];
    }

    return res.status(200).json({ subscription });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.getSubscription = async (req, res) => {
  try {
    const userId = req.user.userId;
    const result = await db.query('SELECT * FROM subscriptions WHERE user_id = $1', [userId]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'No subscription found.' });
    return res.json({ subscription: result.rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
