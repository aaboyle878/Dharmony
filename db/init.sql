CREATE TABLE survey_responses (
  id SERIAL PRIMARY KEY,
  stake_address TEXT UNIQUE,
  answers_json JSONB,
  drep_id TEXT,
  submitted_at TIMESTAMP DEFAULT NOW()
);