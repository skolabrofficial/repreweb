import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET = 'fakt_tajnej_a_dlouhej_klic_tady'; // změň si to na svoje

const users = [
  {
    username: 'skolabr',
    passwordHash: bcrypt.hashSync('skolabr8520', 8),
    info: {
      role: 'admin',
      fullname: 'Školábr Admin',
      email: 'admin@skolabr.cz',
      note: 'Administrátor systému Školábr',
    },
  },
  {
    username: 'obskolabr',
    passwordHash: bcrypt.hashSync('obskolabr8520', 8),
    info: {
      role: 'obchod',
      fullname: 'Obchod Školábr',
      email: 'obchod@skolabr.cz',
      note: 'Obchodní zástupce Školábr',
    },
  },
  {
    username: 'splp85852',
    passwordHash: bcrypt.hashSync('gdsf5321', 8),
    info: {
      role: 'skola',
      fullname: 'Spolek Lipová',
      email: 'skola@lipova.cz',
      note: 'Škola Spolek Lipová',
    },
  },
];

// Jen role 'admin' a 'obchod' povolíme pro přihlášení
const allowedRoles = ['admin', 'obchod'];

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(401).json({ error: 'Neplatné uživatelské jméno nebo heslo' });

  const passOk = bcrypt.compareSync(password, user.passwordHash);
  if (!passOk) return res.status(401).json({ error: 'Neplatné uživatelské jméno nebo heslo' });

  if (!allowedRoles.includes(user.info.role)) {
    return res.status(403).json({ error: 'Přístup zamítnut' });
  }

  const token = jwt.sign({ username: user.username, role: user.info.role }, SECRET, { expiresIn: '2h' });

  res.status(200).json({ token });
}
