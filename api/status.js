import fs from 'fs';
import path from 'path';

const clientsPath = path.join(process.cwd(), 'api/clients.json');

export default function handler(req, res) {
  try {
    const { domain } = req.query;
    
    if (!domain) {
      return res.status(400).json({
        error: 'Se requiere el parámetro domain'
      });
    }

    const clientsData = JSON.parse(fs.readFileSync(clientsPath, 'utf8'));
    const client = clientsData.clients.find(c => c.domain === domain);

    if (!client) {
      return res.status(404).json({
        error: 'Cliente no encontrado'
      });
    }

    res.status(200).json({
      paymentStatus: client.paymentStatus,
      message: client.message
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
} 