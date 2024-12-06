// Funkce pro odeslání zprávy
function sendMessage(userId, message) {
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userId, message: message })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Zpráva odeslána:', data);
        // Po odeslání zprávy ji automaticky načteme
        loadMessages();
    })
    .catch(error => console.error('Chyba při odesílání zprávy:', error));
}

// Funkce pro načítání zpráv
function loadMessages() {
    fetch('/chat')
    .then(response => response.json())
    .then(messages => {
        const chatContainer = document.getElementById('chatContainer');
        chatContainer.innerHTML = ''; // Vyčistíme chat před načtením nových zpráv

        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.textContent = `${message.timestamp} - User ${message.user_id}: ${message.message}`;
            chatContainer.appendChild(messageElement);
        });
    })
    .catch(error => console.error('Chyba při načítání zpráv:', error));
}

// Funkce pro připojení události k formuláři pro odesílání zpráv
function setupChatForm() {
    const chatForm = document.getElementById('chatForm');
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = document.getElementById('messageInput').value;
        const userId = 1; // Nahraď správným ID uživatele

        sendMessage(userId, message);
    });
}

// Funkce pro automatické načítání zpráv každých 5 sekund
function startAutoReload() {
    setInterval(loadMessages, 5000); // Načítat nové zprávy každých 5 sekund
}

// Spuštění všech funkcí po načtení stránky
window.onload = () => {
    setupChatForm();
    loadMessages(); // Načteme zprávy ihned po načtení stránky
    startAutoReload(); // Spustíme automatické načítání zpráv
};

