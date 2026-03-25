const db = require('../db');

exports.getUsers = async (req, res) => {
  try {
    const users = await db.query('SELECT id, name, email, role FROM users ORDER BY id');
    return res.json({ users: users.rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.getWinners = async (req, res) => {
  try {
    const result = await db.query(
      'SELECT w.*, u.name, u.email, d.draw_numbers, d.date as draw_date FROM winners w JOIN users u ON w.user_id = u.id JOIN draws d ON w.draw_id = d.id ORDER BY d.date DESC'
    );
    return res.json({ winners: result.rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.verifyWinner = async (req, res) => {
  try {
    const winnerId = req.params.id;
    const { status } = req.body;

    if (!['pending', 'verified', 'paid', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status.' });
    }

    const result = await db.query('UPDATE winners SET status = $1 WHERE id = $2 RETURNING *', [status, winnerId]);
    if (!result.rows.length) {
      return res.status(404).json({ message: 'Winner not found.' });
    }

    return res.json({ winner: result.rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
