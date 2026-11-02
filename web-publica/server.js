const http = require('http');
const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    
    // Encabezado por defecto para todas las respuestas
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // Endpoint de estado
    if (req.url === '/status') {
        res.writeHead(200);
        res.end(JSON.stringify({
            servicio: 'api-interna',
            estado: 'ok',
            puerto: PORT
        }));
        return;
    }

    // Ruta no encontrada
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'recurso no encontrado' }));
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`api-interna escuchando en el puerto ${PORT}`);
});
