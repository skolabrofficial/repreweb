import jwt from 'jsonwebtoken';

const SECRET = 'fakt_tajnej_a_dlouhej_klic_tady'; // stejný jako v login.js

const users = {
  skolabr: {
    role: 'admin',
    fullname: 'Školábr Admin',
    email: 'admin@skolabr.cz',
    note: 'Administrátor systému Školábr',
  },
  obskolabr: {
    role: 'obchod',
    fullname: 'Obchod Školábr',
    email: 'obchod@skolabr.cz',
    note: 'Obchodní zástupce Školábr',
  },
  splp85852: {
    role: 'skola',
    fullname: 'Spolek Lipová',
    email: 'skola@lipova.cz',
    note: 'Škola Spolek Lipová',
  },
};

const allowedRoles = ['admin', 'obchod'];

export default function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Chybí autorizace' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Neplatný token' });

  try {
    const decoded = jwt.verify(token, SECRET);
    if (!allowedRoles.includes(decoded.role)) {
      return res.status(403).json({ error: 'Přístup zamítnut' });
    }

    const userInfo = users[decoded.username];
    if (!userInfo) return res.status(404).json({ error: 'Uživatel nenalezen' });

    res.status(200).json(userInfo);
  } catch {
    res.status(401).json({ error: 'Neplatný token nebo vypršel čas' });
  }
}
