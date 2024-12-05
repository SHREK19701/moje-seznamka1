// Event listener pro odesl�n� registracn�ho formul�re
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Nacten� hodnot z formul�re
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

    // Ulo�en� dat do localStorage s bonusov�mi mincemi
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
        coins: 500 // Bonus 500 minc�
    }));

    // Ulo�en� bonusu 500 minc� pr�mo do localStorage pro zobrazen�
    localStorage.setItem('userCoins', 500);

    alert("Bonus 500 minc� byl prid�n na v� �cet!");

    // Presmerov�n� po registraci
    window.location.href = 'profil.html';
});

// Zobrazen� minc� na str�nce po prihl�en� nebo presmerov�n�
window.addEventListener('load', function() {
    const coins = localStorage.getItem('userCoins');
    if (coins) {
        document.getElementById('coins').innerText = coins;
    } else {
        document.getElementById('coins').innerText = '0';
    }
});

