const path = require('path');
const express = require('express');
const { Pool } = require('pg'); // PostgreSQL připojení
const app = express();

// Připojovací řetězec pro PostgreSQL
const pool = new Pool({
  user: 'postgres',         // uživatel
  host: 'localhost',        // hostitel (místní server)
  database: 'node_env',     // název databáze
  password: 'Charalamba11@', // heslo
  port: 5432,               // port (standardní pro PostgreSQL)
});

// Test připojení k databázi
pool.connect()
  .then(client => {
    console.log('Připojeno k databázi node_env');
    client.release();
  })
  .catch(err => {
    console.error('Chyba při připojování k databázi:', err);
  });

// Nastavení serveru na portu 10000
app.listen(10000, () => {
  console.log('Server běží na portu 10000');
});

// Nastavení statických souborů (pokud máte soubory v adresáři)
app.use(express.static(path.join(__dirname, '')));

// Různé stránky
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/registrace', (req, res) => res.sendFile(path.join(__dirname, 'registrace.html')));
app.get('/prihlaseni', (req, res) => res.sendFile(path.join(__dirname, 'prihlaseni.html')));
app.get('/profil', (req, res) => res.sendFile(path.join(__dirname, 'profil.html')));
app.get('/chat', (req, res) => res.sendFile(path.join(__dirname, 'chat.html')));
app.get('/koupit-mince', (req, res) => res.sendFile(path.join(__dirname, 'koupit mince.html')));
app.get('/komentare', (req, res) => res.sendFile(path.join(__dirname, 'komentare.html')));

