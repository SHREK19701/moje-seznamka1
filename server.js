const path = require('path');
const express = require('express');
const app = express();

// Nastavení serveru
app.listen(10000, () => {
    console.log('Server běží na portu 10000');
});

app.use(express.static(path.join(__dirname, '')));

// Různé stránky
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/registrace', (req, res) => res.sendFile(path.join(__dirname, 'registrace.html')));
app.get('/prihlaseni', (req, res) => res.sendFile(path.join(__dirname, 'prihlaseni.html')));
app.get('/profil', (req, res) => res.sendFile(path.join(__dirname, 'profil.html')));
app.get('/chat', (req, res) => res.sendFile(path.join(__dirname, 'chat.html')));
app.get('/koupit-mince', (req, res) => res.sendFile(path.join(__dirname, 'koupit mince.html')));
app.get('/komentare', (req, res) => res.sendFile(path.join(__dirname, 'komentare.html')));

