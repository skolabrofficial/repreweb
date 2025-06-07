// Dekóduje token a vrátí info o uživateli

const users = {
  skolabr: { fullname: 'Školábr Admin', role: 'admin', email: 'admin@skolabr.cz', note: 'Hlavní admin' },
  obskolabr: { fullname: 'Obchod Školábr', role: 'obchod', email: 'obchod@skolabr.cz', note: 'Obchodní zástupce' },
  splp85852: { fullname: 'Spolek Lipová', role: 'skola', email: 'skola@lipova.cz', note: 'Zástupce školy' }
};

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Pouze GET' });

  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Chybí token' });

  const token = auth.slice(7);
  let decoded;
  try {
    decoded = Buffer.from(token, 'base64').toString('utf8');
  } catch {
    return res.status(401).json({ error: 'Neplatný token' });
  }

  const [username, role] = decoded.split(':');
  if (!users[username]) return res.status(401).json({ error: 'Uživatel nenalezen' });

  res.status(200).json(users[username]);
}
