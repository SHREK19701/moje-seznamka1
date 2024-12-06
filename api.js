// Funkce pro registraci uživatele
function registraceUzivatele(data) {
  fetch('https://vase-api-url.com/registrace', {
    method: 'POST', // Používáme POST pro odesílání dat na server
    headers: {
      'Content-Type': 'application/json', // Urcuje, že posíláme JSON data
      'Authorization': 'Bearer IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcImYxODU5NWE5LTIyZTgtNGQwNy04NWJhLWZiNzVhNzI5YWJhNVwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjIzNTJjZDhiLWNlNmItNGU3ZS05OWUzLTNmNWJjODA0NDZlY1wifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCIyNmU4MTM3NS04ZDg3LTRjY2MtYTM2Ny02ODA1MmU4M2I3NzNcIn19IiwiaWF0IjoxNzMzNDgwNjE2fQ.NtD2Xj4Mv2wt9U5y3K_iJRkBuQruES6ObNfUNGzZGIQcxwThrYrhi68ITEvz4TCdTeiFtjVXjTClnETEINkBHTvK9UhKO0lXOpsdOyDVrbR2Yal0-_MIBReUv7aqD-8fSYKgMrOguCV-U0VUj4sc2mbptoXEMpfBdQCJzG-8ktxYG5O56uWL9AGyv2NMroHS12-NDNFfOEWRSWoxjRBIifuDVKJM7DI6PdSWKxeG9Xo1MET1bXwM1M6v2FUEPDTfvyS9LM9lgxCHA2DSmyVl0gAebYS1nDsPq7N3f6Smzi23M42TYVtniBdzysaTT-GrHUH1zcdEab5QV-6MQ0EUkw' // API token
    },
    body: JSON.stringify(data) // Odesíláme data jako JSON
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Chyba pri registraci: ' + response.statusText);
    }
    return response.json();
  })
  .then(responseData => {
    console.log('Uživatel úspešne zaregistrován:', responseData);
  })
  .catch(error => {
    console.error('Chyba:', error);
  });
}

