const bcrypt = require('bcrypt');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http'); // Pro spuštění HTTP serveru
const socketIo = require('socket.io'); // Import socket.io
const app = express();
const server = http.createServer(app); // Vytvoření serveru

// Simulovaný pool bez databáze
const pool = {
  connect: async () => {
    console.log('Simulované připojení k databázi.');
    return {
      query: async (sql, params) => {
        console.log(`Simulovaný SQL dotaz: ${sql}, Parametry: ${params}`);
        return { rows: [{ message: 'Simulovaná odpověď' }] };
      },
      release: () => {
        console.log('Simulované připojení uvolněno.');
      }
    };
  },
  query: async (sql, params) => {
    console.log(`Simulovaný SQL dotaz: ${sql}, Parametry: ${params}`);
    return { rows: [{ message: 'Simulovaná odpověď' }] };
  }
};

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '')));

// Test připojení k simulované databázi
pool.connect()
  .then(client => {
    console.log('Připojeno k simulované databázi');
    client.release();
  })
  .catch(err => {
    console.error('Chyba při připojování k simulované databázi:', err);
  });

// Funkce pro registraci uživatele
async function registrujUzivatele(email, heslo) {
  try {
    const hashedPassword = await bcrypt.hash(heslo, 10); // Zahashování hesla
    const query = 'INSERT INTO prihlaseni (email, heslo) VALUES ($1, $2)';
    await pool.query(query, [email, hashedPassword]);
    console.log('Uživatel úspěšně zaregistrován');
  } catch (err) {
    console.error('Chyba při registraci:', err);
  }
}

// Statické stránky
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/registrace', (req, res) => res.sendFile(path.join(__dirname, 'registrace.html')));
app.get('/prihlaseni', (req, res) => res.sendFile(path.join(__dirname, 'prihlaseni.html')));
app.get('/profil', (req, res) => res.sendFile(path.join(__dirname, 'profil.html')));
app.get('/chat', (req, res) => res.sendFile(path.join(__dirname, 'chat.html')));

// Nastavení Socket.IO pro reálný čas
const io = socketIo(server);

// Uživatel se připojí
io.on('connection', (socket) => {
  console.log('Uživatel připojen:', socket.id);

  // Posílání zpráv
  socket.on('send_message', (data) => {
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

