document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Zabráníme standardnímu odeslání formuláře

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Načteme uživatelské údaje z localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Najdeme uživatele podle jména
    const user = users.find(u => u.username === username);

    if (user) {
        // Ověříme heslo pomocí bcrypt, pokud je heslo správné
        bcrypt.compare(password, user.password).then(match => {
            if (match) {
                // Pokud heslo odpovídá
                localStorage.setItem('loggedIn', true);
                localStorage.setItem('username', username);

                // Zobrazení úspěšné zprávy
                document.getElementById('loginMessage').textContent = 'Byli jste úspěšně přihlášeni!';
                document.getElementById('loginMessage').style.color = 'green';

                // Přesměrování na jinou stránku (např. na chat)
                setTimeout(function() {
                    window.location.href = 'chat.html'; // Nahraďte vlastní cílovou stránkou
                }, 2000); // Po 2 sekundách přesměrování na chat
            } else {
                // Zobrazení chybové zprávy
                document.getElementById('loginMessage').textContent = 'Chybné přihlašovací údaje, zkuste to prosím znovu.';
                document.getElementById('loginMessage').style.color = 'red';
            }
        });
    } else {
        // Zobrazení chybové zprávy
        document.getElementById('loginMessage').textContent = 'Uživatel nenalezen.';
        document.getElementById('loginMessage').style.color = 'red';
    }
});

