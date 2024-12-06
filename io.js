// Pripojen� k serveru pres WebSocket
const socket = io();

// Funkce pro nac�t�n� zpr�v z datab�ze
function loadMessages() {
  fetch('/chat')
    .then(response => response.json())
    .then(messages => {
      const chatContainer = document.getElementById('chatContainer');
      chatContainer.innerHTML = ''; // Vycist�me chat pred nacten�m nov�ch zpr�v

      messages.forEach(message => {
        const messageElement = document.createElement('div');
        const messageContent = `${message.timestamp} - User ${message.user_id}: ${message.message}`;

        // Pokud zpr�va obsahuje fotku, pridej ji
        const messageImg = message.image_url ? `<img src="${message.image_url}" alt="Fotka" width="100" />` : '';
        messageElement.innerHTML = `${messageContent} ${messageImg}`;

        chatContainer.appendChild(messageElement);
      });
    })
    .catch(error => console.error('Chyba pri nac�t�n� zpr�v:', error));
}

// Spu�ten� nac�t�n� zpr�v po nacten� str�nky
window.onload = loadMessages;

// Posluchac na nov� pr�choz� zpr�vu
socket.on('new_message', (data) => {
  const chatContainer = document.getElementById('chatContainer');
  const messageElement = document.createElement('div');
  const messageContent = `${data.timestamp} - User ${data.user_id}: ${data.message}`;

  // Pokud zpr�va obsahuje fotku, pridej ji
  const messageImg = data.imageUrl ? `<img src="${data.imageUrl}" alt="Fotka" width="100" />` : '';
  messageElement.innerHTML = `${messageContent} ${messageImg}`;

  chatContainer.appendChild(messageElement);
});

