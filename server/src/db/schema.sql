-- charities
CREATE TABLE IF NOT EXISTS charities (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT
);

-- users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- admin credentials
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  plan_type TEXT NOT NULL,
  status TEXT NOT NULL,
  renewal_date TIMESTAMPTZ NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  charity_amount NUMERIC(10,2) NOT NULL,
  charity_id INTEGER REFERENCES charities(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- scores
CREATE TABLE IF NOT EXISTS scores (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  date TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- draws
CREATE TABLE IF NOT EXISTS draws (
  id SERIAL PRIMARY KEY,
  draw_numbers INTEGER[] NOT NULL,
  date TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- winners
CREATE TABLE IF NOT EXISTS winners (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  draw_id INTEGER REFERENCES draws(id) ON DELETE CASCADE,
  match_count INTEGER NOT NULL,
  prize_amount NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
