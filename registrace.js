// Event listener pro odeslání registracního formuláre
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Nactení hodnot z formuláre
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const birthdate = document.getElementById('birthdate').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const eyes = document.getElementById('eyes').value;
    const hair = document.getElementById('hair').value;
    const children = document.getElementById('children').value;
    const job = document.getElementById('job').value;
    const hobbies = document.getElementById('hobbies').value;
    const orientation = document.getElementById('orientation').value;
    const search = document.getElementById('search').value;

    // Uložení dat do localStorage s bonusovými mincemi
    localStorage.setItem('userProfile', JSON.stringify({
        email,
        username,
        password,
        birthdate,
        height,
        weight,
        eyes,
        hair,
        children,
        job,
        hobbies,
        orientation,
        search,
        coins: 500 // Bonus 500 mincí
    }));

    // Uložení bonusu 500 mincí prímo do localStorage pro zobrazení
    localStorage.setItem('userCoins', 500);

    // Presmerování po registraci
    window.location.href = 'profil.html';
});

// Zobrazení mincí na stránce po prihlášení nebo presmerování
window.addEventListener('load', function() {
    const coins = localStorage.getItem('userCoins');
    if (coins) {
        document.getElementById('coins').innerText = coins;
    } else {
        document.getElementById('coins').innerText = '500';
    }
});

