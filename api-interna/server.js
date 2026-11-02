const http = require('http');
const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL;
const VERSION = process.env.APP_VERSION || '1.0';

const server = http.createServer(async (req, res) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);

    // Endpoint de salud
    if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ estado: 'ok', version: VERSION, puerto: PORT }));
        return;
    }

    // Proxy a la API interna
    if (req.url === '/api') {
        try {
            const respuesta = await fetch(API_URL);
            const datos = await respuesta.text();
            res.writeHead(respuesta.status, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(datos);
        } catch (error) {
            console.error('Error al conectar con la API:', error.message);
            res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ error: 'no se pudo conectar con api-interna' }));
        }
        return;
    }

    // Página de inicio (HTML)
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
        <h1>Redes con Docker</h1>
        <p>Sistemas Operativos - 4.º año</p>
        <p>Servicio público funcionando</p>
        <p>Versión ${VERSION}</p>
        <p><a href="/health">Comprobar /health</a></p>
        <p><a href="/api">Consultar /api</a></p>
    `);
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`web-publica escuchando en el puerto ${PORT}`);
});

