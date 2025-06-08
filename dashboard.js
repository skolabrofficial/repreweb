// Simulace přihlášeného uživatele – později nahradíš backendem
const currentUser = {
  username: "skolabr",
  role: "admin",
  name: "Školábr"
};

// Možné zprávy pro různé role
const messages = {
  admin: "Vítejte v administraci systému Školábr. Zde můžete spravovat vše.",
  obchod: "Toto je rozhraní obchodu Školábr. Připravena je nová nabídka zboží.",
  skola: "Zde vidíte zprávy a materiály určené pro školy."
};

// Vykreslení údajů do HTML
document.addEventListener("DOMContentLoaded", () => {
  const info = document.getElementById("user-info");
  const message = document.getElementById("user-message");

  info.innerHTML = `<strong>${currentUser.name}</strong> <span>(${currentUser.role})</span>`;
  message.textContent = messages[currentUser.role] || "Žádná zpráva.";
});
