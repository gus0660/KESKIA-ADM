document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM entièrement chargé et analysé");

  let isUserLoggedIn = localStorage.getItem("isUserLoggedIn") === "true";
  let storedUserData = localStorage.getItem("user");

  setupLoginModal(isUserLoggedIn);
  setupAccountForm(isUserLoggedIn, storedUserData);
  setupDeleteAccountButton();
});

// Fonction pour inclure la barre de navigation sur la page
function includeNavbar() {
  console.log("includeNavbar: début de la fonction");

  // Création et configuration de l'élément navbar
  var navbar = document.createElement("nav");
  navbar.classList.add("navbar");
  navbar.classList.add("navbar-expand-lg");
  navbar.classList.add("navbar-light");
  navbar.classList.add("fixed-top");
  console.log("includeNavbar: navbar créée");

  // Définition du contenu HTML de la navbar
  navbar.innerHTML = `
  <div class="container">
    <button
      class="navbar-toggler"
      id="menu-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
      <ul class="navbar-nav">
        <a href="index.html">
          <img src="images/logoKESKIADM.webp" class="navbar-logo d-none d-sm-block" alt="Logo" width="201" height="90" style="margin-left: auto; margin-right: 5px;">
        </a>
        <li class="nav-item ">
          <div class="nav-content">
            <a class="nav-link" href="destination.html">DESTINATION</a>
            <span class="nav-subtext">Carte - Trajet</span>
          </div>
        </li>
        <li class="nav-item">
          <div class="nav-content">
            <a class="nav-link" href="decouvrir.html">DECOUVRIR</a>
            <span class="nav-subtext">Explorez</span>
          </div>
        </li>
        <li class="nav-item">
          <div class="nav-content">
            <a class="nav-link" href="organisation.html">ORGANISATION</a>
            <span class="nav-subtext">De votre séjour</span>
          </div>
        </li>
        <li class="nav-item" id="accountButton">
          <div class="nav-content" id="remplacIcon">
            <a class="nav-link" id="navbDdMenu" href="mon-compte.html">MON COMPTE</a>
            <span class="nav-subtext">Créer Mon Compte</span>
          </div>
        </li>
      </ul>
      <button class="btn btn-secondary d-block d-sm-none" id="back-button">
        <a href="index.html" style="text-decoration: none; color: white;">ACCUEIL</a>
      </button>
    </div>
  </div>
    `;
  // Ajout de la navbar au container dédié
  var navbarContainer = document.querySelector("#navbar-container");
  navbarContainer.appendChild(navbar);

  var accountButton = document.querySelector("#navbDdMenu");
  console.log("includeNavbar: accountButton récupéré", accountButton);

// Logique pour afficher le modal
  if (accountButton) {
    accountButton.addEventListener("click", function () {
      event.preventDefault();
      console.log("includeNavbar: clic sur accountButton détecté");
      var loginModal = document.querySelector("#loginModal");
      console.log("Script principal: loginModal récupéré", loginModal);
      loginModal.style.display = "block";
      loginModal.classList.add("show");
      console.log("Script principal: loginModal affiché");
    });
  } else {
    console.log("Script principal: accountButton non trouvé");
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      closeNavbar();
    });
  });

  // Gestionnaire pour le bouton Se déconnecter
  let logoutButton = document.querySelector("#logoutButton");
  
  if (logoutButton) {
    console.log("Bouton de déconnexion trouvé", logoutButton);
    logoutButton.addEventListener("click", function () {
      localStorage.setItem("isUserLoggedIn", "false");
      console.log("Déconnexion de l'utilisateur");
      window.location.reload(); // Recharger la page pour refléter l'état déconnecté
    });
  }
}

// remplissage du menu modal (qui apparait quant on clique sur "MON COMPTE)")
function setupLoginModal(isLoggedIn) {
  var loginModalContent;
  if (!isLoggedIn) {
    // Contenu du modal pour les utilisateurs non connectés
    loginModalContent = `
      <div class="modal-content">
        <div id="loginError" style="color: red; display: none;"></div>
        <div class="modal-header">
          <h5 class="modal-title">Connexion</h5>
          <button type="button" class="close" id="closeModal" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body d-flex align-items-center justify-content-center">
          <button type="button" class="btn btn-success" onclick="location.href='mon-compte.html'">Page Mon Compte<br>Ou Créer un Compte</button>
        </div>
      </div>
    `;
  } else {
    // Contenu du modal pour les utilisateurs connectés
    loginModalContent = `
      <div class="modal-content">
        <div id="loginError" style="color: red; display: none;"></div>
        <div class="modal-header">
              <h5 class="modal-title">Connexion</h5>
              <button type="button" class="close" id="closeModal" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
              </button>
        </div>
        <div class="modal-body">
              <!-- Formulaire de connexion modal-->
          <form>
            <div class="form-group">
                      <label for="email">Adresse Email</label>
                      <input type="email" class="form-control" id="email" placeholder="email@example.com">
            </div>
            <div class="form-group">
                      <label for="password">Mot de Passe</label>
                      <input type="password" class="form-control" id="onPassword" placeholder="Mot de passe">
            </div>
                  <button type="button" class="btn btn-primary" id="loginButton" onclick="seConnectClick()">Se Connecter</button>
                  <button type="button" class="btn btn-danger my-2" id="logoutButton">Se déconnecter</button>
          </form>
          <div class="modal-footer">
            <div style="width: 100%; text-align: center;">
              <button type="button" class="btn btn-success" onclick="location.href='mon-compte.html'">Page Mon Compte<br>Ou Créer un Compte
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  let loginModal = document.createElement("div");
  loginModal.id = "loginModal";
  loginModal.className = "login-modal";
  loginModal.style.display = "none";
  loginModal.innerHTML = loginModalContent;

  // Réinitialiser l'élément d'erreur lors de la création du modal
  let errorDiv = loginModal.querySelector("#loginError");
  errorDiv.style.display = "none";

  // Écouteur pour le bouton de fermeture du modal
  let closeModalButton = loginModal.querySelector("#closeModal");
  if (closeModalButton) {
    closeModalButton.addEventListener("click", function () {
      loginModal.style.display = "none";
      loginModal.classList.remove("show");
    });
  }

  // Écouteur pour le bouton de connexion
  if (!isLoggedIn) {
    let loginButton = loginModal.querySelector("#loginButton");
    if (loginButton) {
      loginButton.addEventListener("click", function () {
        let email = loginModal.querySelector("#email").value;
        let password = loginModal.querySelector("#onPassword").value;

        // Logique de connexion si la validation est réussie
        if (validateLogin(email, password)) {
          localStorage.setItem("isUserLoggedIn", "true");
          localStorage.setItem(
            "user",
            JSON.stringify({ email: email, password: password })
          );
          updateNavbarForLoggedInUser();
          closeLoginModal();
          window.location.href = "mon-compte.html";
        } else {
          alert("Identifiants incorrects");
          let errorDiv = loginModal.querySelector("#loginError");
          errorDiv.textContent = "Saisie incorrecte";
          errorDiv.style.display = "block";
        }
      });
    }
  }

  // Écouteur pour le bouton de déconnexion
  if (isLoggedIn) {
    let logoutButton = loginModal.querySelector("#logoutButton");
    if (logoutButton) {
      logoutButton.addEventListener("click", function () {
        localStorage.setItem("isUserLoggedIn", "false");
        localStorage.removeItem("user");
        updateNavbarForLoggedOutUser();
        closeLoginModal();
        alert("Vous êtes maintenant déconnecté");
        window.location.href = "index.html";
      });
    }
  }

  document.body.appendChild(loginModal);
}

// Fonction pour fermer le modal de connexion
function closeLoginModal() {
  let loginModal = document.querySelector("#loginModal");
  if (loginModal) {
    loginModal.style.display = "none";
    loginModal.classList.remove("show");
  }
}

// fonction permettant la fermeture de  la barre de navigation (navbar) lorsque celle-ci est en mode "collapse"
function closeNavbar() {
  let navbarToggler = document.querySelector(".navbar-toggler");
  let navbarCollapse = document.querySelector(".navbar-collapse");

  if (navbarCollapse.classList.contains("show")) {
    navbarToggler.click();
  }
  updateNavbarForLoggedInUser();
}

// Créer un nouvel élément <footer> pour contenir le pied de page
function includeFooter() {
  
  let footer = document.createElement("footer");
  footer.classList.add("footer");
  footer.classList.add("justify-content-between");
  footer.classList.add("d-flex");
  footer.classList.add("align-items-center");
  // Définissez le contenu du pied de page
  footer.innerHTML = `
          <button class=" btn-footer d-none d-sm-block">
            <a href="https://www.france.fr/fr/operation/rever-en-grand-prendre-le-temps">
              <img src="images/Double-logo.webp" alt="Logo" width="170" height="auto">
            </a>
          </button>
          <button class="btn-footer d-sm-block">
            <h3 style="text-decoration: none; color: #9B055F; font-size: 24px;">SUIVEZ-NOUS</h3>
          </button>
          <button class="btn-footer d-sm-block">
            <h3 style="text-decoration: none; color: #9B055F; font-size: 24px;">LIENS UTILES</h3>
          </button>
          <button class="btn-footer d-sm-block">
            <h3 style="text-decoration: none; color: #9B055F; font-size: 24px;">C. G. U.</h3>
          </button>
  `;

  // Trouvez l'élément sur la page où vous souhaitez inclure le pied de page
  let footerContainer = document.querySelector("#footer-container");

  // Ajoutez le pied de page à cet élément
  footerContainer.appendChild(footer);
}

// LOCAL STORAGE

// fonction de soumission du formulaire
function setupAccountForm(isLoggedIn, storedUserData) {
  let accountForm = document.querySelector("#accountForm");
  if (accountForm) {
    if (isLoggedIn && storedUserData) {
      // Utilisateur connecté - Pré-remplir le formulaire
      storedUserData = JSON.parse(storedUserData);
      console.log(
        "Données utilisateur actuelles dans localStorage:",
        storedUserData
      );
      document.querySelector("#fullName").value = storedUserData.fullName || "";
      document.querySelector("#eMail").value = storedUserData.email || "";
      document.querySelector("#identifiant").value =
        storedUserData.identifiant || "";
      document.querySelector("#phone").value = storedUserData.phone || "";
      updateNavbarForLoggedInUser();
    }

    // Empêche le rechargement de la page, valide les données du formulaire, 
    // enregistre les informations de l'utilisateur dans le localStorage, 
    // indique que l'utilisateur est connecté, et redirige vers la page 'mon-compte.html'
    document.querySelector("#accountForm").addEventListener("submit", function (event) {
        event.preventDefault();
        if (!validateForm()) {
          console.log("Validation du formulaire échouée");
          return; // Arrête l'exécution si la validation échoue
        }

        let user = {
          fullName: document.querySelector("#fullName").value,
          email: document.querySelector("#eMail").value,
          identifiant: document.querySelector("#identifiant").value,
          phone: document.querySelector("#phone").value,
          password: document.querySelector("#password").value,
        };

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isUserLoggedIn", "true");
        console.log("Utilisateur enregistré dans localStorage:", user);
        alert("Votre compte est créé");
        event.stopPropagation();
        window.location.href = "mon-compte.html";
        console.log("Redirection vers 'mon-compte.html'");
    });
  } else {
    console.log(
      "Formulaire de compte '#accountForm' non trouvé sur cette page."
    );
  }
}

// fonction pour supprimer un compte
function setupDeleteAccountButton() {
  let deleteAccountButton = document.querySelector("#deleteAccount");
  if (deleteAccountButton) {
    deleteAccountButton.addEventListener("click", function () {
      localStorage.removeItem("user");
      localStorage.setItem("isUserLoggedIn", "false");
      console.log("Compte supprimé");
      alert("Votre compte vient d'être supprimé");
      window.location.href = "index.html";
    });
  } else {
    console.log("Bouton de suppression de compte non trouvé sur cette page.");
  }
}

function validateForm() {
  let isValid = true;

  // Vérifier que tous les champs requis sont remplis
  document.querySelectorAll(".required").forEach(function (input) {
    if (!input.value.trim()) {
      alert("Tous les champs doivent être remplis.");
      isValid = false;
    }
  });

  // Vérification de la complexité du mot de passe
  let password = document.querySelector("#password").value;
  let passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    alert(
      "Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial."
    );
    isValid = false;
  }

  // Vérification de la correspondance des mots de passe
  let confirmPassword = document.querySelector("#confirmPassword").value;
  if (password !== confirmPassword) {
    alert("Les mots de passe ne correspondent pas.");
    isValid = false;
  }

  // Vérification de l'absence de caractères spéciaux dans les autres champs
  document.querySelectorAll(".no-special-char").forEach(function (input) {
    if (/[^a-zA-Z0-9 \-+]/.test(input.value)) {
      alert("Les caractères spéciaux ne sont pas autorisés dans ce champ.");
      isValid = false;
    }
  });

  return isValid;
}

// Gestion de l'affichage du bouton Se déconnecter
let logoutButton = document.querySelector("#logoutButton");
let isUserLoggedIn = localStorage.getItem("isUserLoggedIn") === "true";
if (isUserLoggedIn && logoutButton) {
  logoutButton.classList.remove("d-none");
}

// fonction pour valider le login
function validateLogin(email, password) {
  // Récupérer les données de l'utilisateur depuis le localStorage
  let storedUser = localStorage.getItem("user");
  if (storedUser) {
    storedUser = JSON.parse(storedUser);

    // Comparer les identifiants entrés avec ceux stockés
    if (storedUser.email === email && storedUser.password === password) {
      return true; // Les identifiants correspondent
    }
  }
  return false; // Les identifiants ne correspondent pas ou l'utilisateur n'existe pas
}

//  pour gérer le processus de connexion d'un utilisateur en validant ses identifiants de connexion (email et mot de passe)
function seConnectClick() {
  console.log("Bouton de connexion cliqué");
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#onPassword").value;

  console.log("Email saisi:", email);
  console.log("Mot de passe saisi:", password);

  if (validateLogin(email, password)) {
    // Si la validation réussit
    console.log("Validation réussie");
    alert("Vous êtes connecté");
    localStorage.setItem("isUserLoggedIn", "true");
    updateNavbarForLoggedInUser();
    closeLoginModal();
  } else {
    // Afficher un message d'erreur
    console.log("Échec de la validation");
    alert("Identifiants incorrects");
  }
}

// change le bouton "MON COMPTE" en icone quant on cré un compte
function updateNavbarForLoggedInUser() {
  console.log("updateNavbarForLoggedInUser: fonction appelée");
  // Sélectionner l'élément dans la navbar qui doit être mis à jour
  let accountButtonContainer = document.querySelector("#remplacIcon");

  // Vérifier si l'élément existe
  if (accountButtonContainer) {
    // Modifier le contenu HTML pour afficher une icône
    accountButtonContainer.innerHTML =
      '<a class="nav-link px-5" href="mon-compte.html"><i class="bi bi-person-bounding-box" style="font-size: 2.5em;"></i></a>';
  } else {
    console.error("Élément pour le bouton du compte non trouvé");
  }
}

// pour remplacer l'icone de la navbar en texte
function updateNavbarForLoggedOutUser() {
  // Sélectionner l'élément dans la navbar qui doit être mis à jour
  let accountButtonContainer = document.querySelector("#remplacIcon");

  // Vérifier si l'élément existe
  if (accountButtonContainer) {
    // Modifier le contenu HTML pour l'état de déconnexion
    accountButtonContainer.innerHTML =
      '<a class="nav-link" id="navbDdMenu" href="mon-compte.html">MON COMPTE</a>';
  } else {
    console.error("Élément pour le bouton du compte non trouvé");
  }
}
