const db = require('../db');

exports.addScore = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { score } = req.body;

    if (!Number.isInteger(score) || score < 1 || score > 45) {
      return res.status(400).json({ message: 'Score must be an integer between 1 and 45.' });
    }

    await db.query('INSERT INTO scores (user_id, score, date) VALUES ($1, $2, NOW())', [userId, score]);

    const scores = await db.query('SELECT * FROM scores WHERE user_id = $1 ORDER BY date DESC', [userId]);
    return res.status(201).json({ scores: scores.rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.getScores = async (req, res) => {
  try {
    const userId = req.user.userId;
    const result = await db.query('SELECT * FROM scores WHERE user_id = $1 ORDER BY date DESC', [userId]);
    return res.json({ scores: result.rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
