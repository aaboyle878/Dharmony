import express from 'express';
import cors from 'cors';
import { pool } from './db.js';
import fetch from 'node-fetch';
import bech32 from 'bech32-buffer';

const { decode, fromWords } = bech32;
const app = express();
app.use(cors());
app.use(express.json());

const govtoolUrl = process.env.GOVTOOL_URL;

function bech32ToHex(bech32Address) {
  const decodedBuffer = bech32.decode(bech32Address);
  return decodedBuffer.toString('hex');
}

// index.js (or wherever your Express routes are)
app.get('/verify-drep/:drepIdHex', async (req, res) => {
  try {
    const drepIdHex = req.params.drepIdHex;

    const apiResponse = await fetch(`${govtoolUrl}/drep/info/${drepIdHex}`);
    if (!apiResponse.ok) {
      console.warn(`DRep ${drepIdHex} not found`);
      return res.json({ isDRep: false });
    }

    const drepData = await apiResponse.json();
    console.log('gov.tools response:', drepData);

    const isDRep = drepData.isRegisteredAsDRep === true || drepData.isRegisteredAsSoleVoter === true;

    res.json({ isDRep, dRepId: drepIdHex });
  } catch (err) {
    console.error('Error verifying DRep:', err);
    res.status(500).json({ error: 'Failed to verify dRep' });
  }
});


app.post('/submit-survey', async (req, res) => {
  try {
    const { stakeAddress, answers, dRepId } = req.body;

    if (!Array.isArray(answers) || answers.length !== 25) {
      return res.status(400).json({ error: 'Answers must be an array of 25 items.' });
    }

    // 🔒 If they're a DRep, store and skip matching
    if (dRepId) {
      await pool.query(
        `
        INSERT INTO survey_responses (stake_address, answers_json, drep_id)
        VALUES ($1, $2, $3)
        ON CONFLICT (stake_address)
        DO UPDATE SET answers_json = EXCLUDED.answers_json, drep_id = EXCLUDED.drep_id
        `,
        [stakeAddress, JSON.stringify(answers), dRepId]
      );
      return res.json({ recommendedDreps: null });
    }

    // 🧠 If NOT a DRep, fetch DReps and calculate match scores
    const { rows } = await pool.query(
      'SELECT stake_address, drep_id, answers_json FROM survey_responses WHERE drep_id IS NOT NULL'
    );

    const scoreMatch = (a, b) => {
      let matches = 0;
      const total = Math.min(a.length, b.length);
      for (let i = 0; i < total; i++) {
        if (a[i] === b[i]) matches++;
      }
      return matches / total;
    };

    const recommendations = rows
      .map(row => ({
        drep_id: row.drep_id,
        stake_address: row.stake_address,
        score: scoreMatch(answers, row.answers_json),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5); // Top 5 matches

    res.json({ recommendedDreps: recommendations });
  } catch (err) {
    console.error('Error handling survey submission:', err);
    res.status(500).json({ error: 'Failed to handle survey submission' });
  }
});

app.listen(4000, () => console.log('Backend running on port 4000'));
