// Ukázkové zprávy podle role uživatele (na základě tokenu)

const messages = {
  admin: [
    { from: 'Systém', text: 'Máte nové hlášení o chybě v systému.' },
    { from: 'Uživatel XY', text: 'Žádost o přístup k datům.' }
  ],
  obchod: [
    { from: 'Klient ABC', text: 'Dotaz na ceny licencí.' },
    { from: 'Systém', text: 'Aktualizace ceníku.' }
  ],
  skola: [
    { from: 'Ředitel', text: 'Nový rozvrh hodin je zveřejněn.' },
    { from: 'Učitelka Jana', text: 'Potvrď prosím účast na školení.' }
  ]
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
  if (!messages[role]) return res.status(404).json({ error: 'Žádné zprávy nenalezeny' });

  res.status(200).json(messages[role]);
}
