import fs from 'fs';
import path from 'path';

const clientsPath = path.join(process.cwd(), 'api/clients.json');

function readClients() {
    return JSON.parse(fs.readFileSync(clientsPath, 'utf8'));
}

function writeClients(data) {
    fs.writeFileSync(clientsPath, JSON.stringify(data, null, 2));
}

export default function handler(req, res) {
    const { method } = req;
    const { id } = req.query;

    try {
        switch (method) {
            case 'GET':
                if (id) {
                    // Obtener un cliente específico
                    const data = readClients();
                    const client = data.clients.find(c => c.id === id);
                    if (!client) {
                        return res.status(404).json({ error: 'Cliente no encontrado' });
                    }
                    res.status(200).json(client);
                } else {
                    // Obtener todos los clientes
                    const data = readClients();
                    res.status(200).json(data);
                }
                break;

            case 'POST':
                // Crear nuevo cliente
                const newClient = {
                    id: Date.now().toString(),
                    ...req.body,
                    createdAt: new Date().toISOString()
                };
                const data = readClients();
                data.clients.push(newClient);
                writeClients(data);
                res.status(201).json(newClient);
                break;

            case 'PUT':
                // Actualizar cliente existente
                if (!id) {
                    return res.status(400).json({ error: 'ID de cliente requerido' });
                }
                const updateData = readClients();
                const clientIndex = updateData.clients.findIndex(c => c.id === id);
                if (clientIndex === -1) {
                    return res.status(404).json({ error: 'Cliente no encontrado' });
                }
                updateData.clients[clientIndex] = {
                    ...updateData.clients[clientIndex],
                    ...req.body
                };
                writeClients(updateData);
                res.status(200).json(updateData.clients[clientIndex]);
                break;

            case 'DELETE':
                // Eliminar cliente
                if (!id) {
                    return res.status(400).json({ error: 'ID de cliente requerido' });
                }
                const deleteData = readClients();
                const filteredClients = deleteData.clients.filter(c => c.id !== id);
                if (filteredClients.length === deleteData.clients.length) {
                    return res.status(404).json({ error: 'Cliente no encontrado' });
                }
                deleteData.clients = filteredClients;
                writeClients(deleteData);
                res.status(200).json({ message: 'Cliente eliminado' });
                break;

            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
} 