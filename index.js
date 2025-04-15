// Este archivo es necesario para que Vercel reconozca el proyecto como Node.js
export default function handler(req, res) {
  res.status(200).json({ message: 'API funcionando correctamente' });
} 