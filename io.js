// Pripojení k serveru pres WebSocket
const socket = io();

// Funkce pro nacítání zpráv z databáze
function loadMessages() {
  fetch('/chat')
    .then(response => response.json())
    .then(messages => {
      const chatContainer = document.getElementById('chatContainer');
      chatContainer.innerHTML = ''; // Vycistíme chat pred nactením nových zpráv

      messages.forEach(message => {
        const messageElement = document.createElement('div');
        const messageContent = `${message.timestamp} - User ${message.user_id}: ${message.message}`;

        // Pokud zpráva obsahuje fotku, pridej ji
        const messageImg = message.image_url ? `<img src="${message.image_url}" alt="Fotka" width="100" />` : '';
        messageElement.innerHTML = `${messageContent} ${messageImg}`;

        chatContainer.appendChild(messageElement);
      });
    })
    .catch(error => console.error('Chyba pri nacítání zpráv:', error));
}

// Spuštení nacítání zpráv po nactení stránky
window.onload = loadMessages;

// Posluchac na nový príchozí zprávu
socket.on('new_message', (data) => {
  const chatContainer = document.getElementById('chatContainer');
  const messageElement = document.createElement('div');
  const messageContent = `${data.timestamp} - User ${data.user_id}: ${data.message}`;

  // Pokud zpráva obsahuje fotku, pridej ji
  const messageImg = data.imageUrl ? `<img src="${data.imageUrl}" alt="Fotka" width="100" />` : '';
  messageElement.innerHTML = `${messageContent} ${messageImg}`;

  chatContainer.appendChild(messageElement);
});

