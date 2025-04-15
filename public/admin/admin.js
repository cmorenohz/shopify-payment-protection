const API_URL = '/api/clients';

// Función para cargar la lista de clientes
async function loadClients() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        renderClients(data.clients);
    } catch (error) {
        console.error('Error al cargar clientes:', error);
    }
}

// Función para renderizar la tabla de clientes
function renderClients(clients) {
    const tbody = document.getElementById('clientsTable');
    tbody.innerHTML = '';

    clients.forEach(client => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">${client.name}</td>
            <td class="px-6 py-4 whitespace-nowrap">${client.domain}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${client.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' : 
                      client.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}">
                    ${client.paymentStatus}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onclick="editClient('${client.id}')" class="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                <button onclick="deleteClient('${client.id}')" class="text-red-600 hover:text-red-900">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Función para editar un cliente
async function editClient(clientId) {
    try {
        const response = await fetch(`${API_URL}/${clientId}`);
        const client = await response.json();

        document.getElementById('clientId').value = client.id;
        document.getElementById('clientName').value = client.name;
        document.getElementById('clientDomain').value = client.domain;
        document.getElementById('paymentStatus').value = client.paymentStatus;
        document.getElementById('clientMessage').value = client.message;
    } catch (error) {
        console.error('Error al cargar cliente:', error);
    }
}

// Función para eliminar un cliente
async function deleteClient(clientId) {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
        try {
            await fetch(`${API_URL}/${clientId}`, {
                method: 'DELETE'
            });
            loadClients();
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
        }
    }
}

// Manejar el envío del formulario
document.getElementById('clientForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const clientId = document.getElementById('clientId').value;
    const clientData = {
        name: document.getElementById('clientName').value,
        domain: document.getElementById('clientDomain').value,
        paymentStatus: document.getElementById('paymentStatus').value,
        message: document.getElementById('clientMessage').value
    };

    try {
        const url = clientId ? `${API_URL}/${clientId}` : API_URL;
        const method = clientId ? 'PUT' : 'POST';

        await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientData)
        });

        // Limpiar formulario y recargar lista
        document.getElementById('clientForm').reset();
        document.getElementById('clientId').value = '';
        loadClients();
    } catch (error) {
        console.error('Error al guardar cliente:', error);
    }
});

// Cargar clientes al iniciar
loadClients(); 