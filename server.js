const path = require('path');
const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const http = require('http');  // Pro spuštění HTTP serveru
const socketIo = require('socket.io');  // Import socket.io
const app = express();
const server = http.createServer(app);  // Vytvoření serveru

// Připojovací řetězec pro PostgreSQL
const pool = new Pool({
    user: 'postgres', // Uprav dle svého uživatele
    host: 'localhost', // Pokud běží na localhostu
    database: 'node_env', // Název tvé databáze
    password: 'Charalamba11@', // Tvé heslo
    port: 5432, // Výchozí port PostgreSQL
});
// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '')));

// Test připojení k databázi
pool.connect()
  .then(client => {
    console.log('Připojeno k databázi');
    client.release();
  })
  .catch(err => {
    console.error('Chyba při připojování k databázi:', err);
  });

// API endpointy
app.post('/api/registrace', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
      [username, email, password]
    );
    res.status(201).json({ message: 'Uživatel registrován', userId: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Chyba při registraci' });
  }
});

app.post('/api/prihlaseni', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );
    if (result.rows.length > 0) {
      res.json({ message: 'Přihlášení úspěšné', user: result.rows[0] });
    } else {
      res.status(401).json({ error: 'Špatné přihlašovací údaje' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Chyba při přihlášení' });
  }
});

// Statické stránky
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/registrace', (req, res) => res.sendFile(path.join(__dirname, 'registrace.html')));
app.get('/prihlaseni', (req, res) => res.sendFile(path.join(__dirname, 'prihlaseni.html')));
app.get('/profil', (req, res) => res.sendFile(path.join(__dirname, 'profil.html')));
app.get('/chat', (req, res) => res.sendFile(path.join(__dirname, 'chat.html')));
// Nastavení Socket.IO pro reálný čas
const io = socketIo(server); // Připojíme Socket.IO k serveru

// Uživatel se připojí
io.on('connection', (socket) => {
  console.log('Uživatel připojen:', socket.id);

  // Posílání zpráv
  socket.on('send_message', (data) => {
    // Zde by bylo možné zprávu uložit do databáze, pokud by bylo potřeba
    console.log('Zpráva přijatá:', data);
    io.emit('receive_message', data); // Posílání zprávy všem připojeným klientům
  });

  // Odpojení uživatele
  socket.on('disconnect', () => {
    console.log('Uživatel odpojen:', socket.id);
  });
});

// Nastavení serveru na portu 10000
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
});

