const db = require('../db');

exports.listCharities = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM charities ORDER BY id ASC');
    return res.json({ charities: result.rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.selectCharity = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { charity_id } = req.body;
    if (!charity_id) {
      return res.status(400).json({ message: 'charity_id is required.' });
    }

    const charity = await db.query('SELECT id FROM charities WHERE id = $1', [charity_id]);
    if (!charity.rows.length) {
      return res.status(404).json({ message: 'Charity not found.' });
    }

    await db.query('UPDATE subscriptions SET charity_id = $1 WHERE user_id = $2', [charity_id, userId]);

    return res.json({ message: 'Charity selected successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
