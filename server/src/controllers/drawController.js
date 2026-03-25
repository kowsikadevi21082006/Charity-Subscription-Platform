const db = require('../db');

const prizeMap = {
  3: 50,
  4: 200,
  5: 1000,
};

function randomUniqueNumbers(limit, min, max) {
  const set = new Set();
  while (set.size < limit) {
    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    set.add(rand);
  }
  return Array.from(set);
}

exports.runDraw = async (req, res) => {
  try {
    const drawNumbers = randomUniqueNumbers(5, 1, 45);

    const drawResult = await db.query(
      'INSERT INTO draws (draw_numbers, date) VALUES ($1, NOW()) RETURNING id, draw_numbers, date',
      [drawNumbers]
    );
    const draw = drawResult.rows[0];

    const users = await db.query('SELECT id FROM users');

    const winners = [];

    for (const user of users.rows) {
      const scoresRes = await db.query('SELECT score FROM scores WHERE user_id = $1', [user.id]);
      const scoreList = scoresRes.rows.map((r) => r.score);

      const matchCount = scoreList.filter((s) => drawNumbers.includes(s)).length;
      if (matchCount >= 3) {
        const prizeAmount = prizeMap[matchCount] || 0;
        await db.query(
          'INSERT INTO winners (user_id, draw_id, match_count, prize_amount, status) VALUES ($1, $2, $3, $4, $5)',
          [user.id, draw.id, matchCount, prizeAmount, 'pending']
        );
        winners.push({ user_id: user.id, match_count: matchCount, prize_amount: prizeAmount });
      }
    }

    return res.json({ draw, winners });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.drawResults = async (req, res) => {
  try {
    const draws = await db.query('SELECT id, draw_numbers, date FROM draws ORDER BY date DESC LIMIT 10');
    const drawIds = draws.rows.map((d) => d.id);

    const winners = await db.query(
      'SELECT w.*, u.name, u.email FROM winners w JOIN users u ON w.user_id = u.id WHERE w.draw_id = ANY($1) ORDER BY w.match_count DESC',
      [drawIds]
    );

    return res.json({ draws: draws.rows, winners: winners.rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
