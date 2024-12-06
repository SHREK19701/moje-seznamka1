document.getElementById("loginButton").addEventListener("click", function () {
  const enteredEmail = document.getElementById("email").value.trim();
  const enteredPassword = document.getElementById("password").value.trim();

  console.log("Zadaný email:", enteredEmail);
  console.log("Zadané heslo:", enteredPassword);

  // Načítáme uživatelský profil ze `node_env`
  const storedUserData = node_env.getItem("userProfile");

  if (!storedUserData) {
    console.error("Uživatelská data nebyla nalezena v node_env.");
    alert("Uživatel nenalezen. Zkontrolujte svůj email.");
    return;
  }

  // Parsujeme uložený JSON
  const parsedUserData = JSON.parse(storedUserData);

  // Kontrolujeme email a heslo
  if (parsedUserData.email === enteredEmail) {
    if (parsedUserData.password === enteredPassword) {
      alert("Přihlášení úspěšné! Vítejte, " + parsedUserData.username);
      window.location.href = "profil.html"; // Přesměrování na profil
    } else {
      console.error("Chybné heslo pro uživatele:", enteredEmail);
      alert("Chybné heslo.");
    }
  } else {
    console.error("Zadaný email nebyl nalezen v uživatelských datech.");
    alert("Uživatel nenalezen. Zkontrolujte svůj email.");
  }
});

