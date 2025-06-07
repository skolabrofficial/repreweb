// login API — jednoduchý ověření uživatelů podle pevně daných údajů

const users = [
  { username: 'skolabr', password: 'skolabr8520', fullname: 'Školábr Admin', role: 'admin', email: 'admin@skolabr.cz', note: 'Hlavní admin' },
  { username: 'obskolabr', password: 'obskolabr8520', fullname: 'Obchod Školábr', role: 'obchod', email: 'obchod@skolabr.cz', note: 'Obchodní zástupce' },
  { username: 'splp85852', password: 'gdsf5321', fullname: 'Spolek Lipová', role: 'skola', email: 'skola@lipova.cz', note: 'Zástupce školy' }
];

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Pouze POST' });

  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'Chybí uživatelské jméno nebo heslo' });

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'Špatné přihlašovací údaje' });

  // V jednoduchosti pošlu token jako base64 zakódované username:role
  const token = Buffer.from(`${user.username}:${user.role}`).toString('base64');
  res.status(200).json({ token });
}
