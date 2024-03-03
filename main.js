
document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM entièrement chargé et analysé");

  let isUserLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true';
  let storedUserData = localStorage.getItem('user');
  

  setupAccountForm(isUserLoggedIn, storedUserData);
  setupDeleteAccountButton();
  setupLogoutButton(isUserLoggedIn);

});
// ----------------------
// UTILITAIRES

// Fonction pour réinitialiser le formulaire de connexion
// function resetLoginForm() {
//   let emailInput = document.querySelector('#email');
//   let passwordInput = document.querySelector('#password');

//   emailInput.value = '';
//   passwordInput.value = '';
// }

// Fonction pour fermer le modal de connexion et réinitialiser le formulaire
function closeLoginModal() {
  let loginModal = document.querySelector('#loginModal');
  if (loginModal) {
    loginModal.style.display = 'none';
    loginModal.classList.remove('show');
    // resetLoginForm();
  }
}



// Fonction pour inclure la barre de navigation sur la page
function includeNavbar() {
  // Création et configuration de l'élément navbar
  var navbar = document.createElement("nav");
  navbar.classList.add("navbar");
  navbar.classList.add("navbar-expand-lg");
  navbar.classList.add("navbar-light");
  navbar.classList.add("fixed-top");

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

  // Création et configuration du modal de connexion
  var loginModal = document.createElement("div");
  loginModal.id = "loginModal";
  loginModal.className = "login-modal";
  loginModal.style.display = "none";
  loginModal.innerHTML = `
        <div class="modal-content">
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
            <button type="button" class="btn btn-success" onclick="location.href='mon-compte.html'">Page Mon Compte<br>Ou Céer un Compte</button>

                <a class="dropdown-item" href="#">Forgot password?</a>
            </div>
    `;
  // Ajout du modal à la fin du body
  document.body.appendChild(loginModal);

  let isUserLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true';
  let accountButton = document.querySelector('#navbDdMenu');
  let remplacIconDiv = document.querySelector('#remplacIcon');

  if (isUserLoggedIn) {
    // Utilisateur connecté: Modifier pour afficher l'icône et ajouter un écouteur d'événements
    if (remplacIconDiv) {
      remplacIconDiv.innerHTML = '<a class="nav-link px-5" href="#" id="userIcon"><i class="bi bi-person-bounding-box" style="font-size: 2.5em;"></i></a>';
      var userIcon = document.getElementById('userIcon');
      userIcon.addEventListener('click', function (event) {
        event.preventDefault();
        loginModal.style.display = 'block';
        loginModal.classList.add('show');
      });
    }
  } else {
    // Utilisateur non connecté: Ajouter un écouteur d'événements pour afficher le modal de connexion
    if (accountButton) {
      accountButton.addEventListener('click', function (event) {
        event.preventDefault();
        loginModal.style.display = 'block';
        loginModal.classList.add('show');
      });
    }
  }

  // Ajout d'un écouteur d'événements pour fermer le modal
  let closeModalButton = document.querySelector('#closeModal');
  closeModalButton.addEventListener('click', function () {
    loginModal.style.display = 'none';
    loginModal.classList.remove('show');
    //resetLoginForm();  Appelle la fonction de réinitialisation
  });

  // Trouvez l'élément sur la page où vous souhaitez inclure la barre de navigation
  var navbarContainer = document.querySelector("#navbar-container");
  let logoutButton = document.querySelector('#logoutButton');

  // Gestionnaire pour le bouton Se déconnecter
  if (logoutButton) {
    console.log("Bouton de déconnexion trouvé", logoutButton);
    logoutButton.addEventListener('click', function () {
      localStorage.setItem('isUserLoggedIn', 'false');
      console.log("Déconnexion de l'utilisateur");
      window.location.reload(); // Recharger la page pour refléter l'état déconnecté
    });
  }
  
}



function closeNavbar() {
  let navbarToggler = document.querySelector('.navbar-toggler');
  let navbarCollapse = document.querySelector('.navbar-collapse');

  if (navbarCollapse.classList.contains('show')) {
    navbarToggler.click();
  }
}

function includeFooter() {
  // Créez un nouvel élément <footer> pour contenir le pied de page
  var footer = document.createElement("footer");
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

function setupAccountForm(isLoggedIn, storedUserData) {
  var accountForm = document.querySelector('#accountForm');
  if (accountForm) {
    if (isLoggedIn && storedUserData) {
      // Utilisateur connecté - Pré-remplir le formulaire
      storedUserData = JSON.parse(storedUserData);
      console.log("Données utilisateur actuelles dans localStorage:", storedUserData);
      document.querySelector('#fullName').value = storedUserData.fullName || '';
      document.querySelector('#eMail').value = storedUserData.email || '';
      document.querySelector('#identifiant').value = storedUserData.identifiant || '';
      document.querySelector('#phone').value = storedUserData.phone || '';
    }

    // accountForm.addEventListener('submit', function (event) {
    document.querySelector('#accountForm').addEventListener('submit', function(event) {
      event.preventDefault();
      if (!validateForm()) {
        console.log("Validation du formulaire échouée");
        return; // Arrête l'exécution si la validation échoue
      }

      let user = {
        fullName: document.querySelector('#fullName').value,
        email: document.querySelector('#eMail').value,
        identifiant: document.querySelector('#identifiant').value,
        phone: document.querySelector('#phone').value,
        password: document.querySelector('#password').value
      };

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isUserLoggedIn', 'true');
      console.log("Utilisateur enregistré dans localStorage:", user);
      alert("Votre compte est créé");
      event.stopPropagation()
      window.location.href = 'mon-compte.html';
      console.log("Redirection vers 'mon-compte.html'");
    });
  } else {
    console.log("Formulaire de compte '#accountForm' non trouvé sur cette page.");
  }
}



function setupDeleteAccountButton() {
  var deleteAccountButton = document.querySelector('#deleteAccount');
  if (deleteAccountButton) {
    deleteAccountButton.addEventListener('click', function () {
      localStorage.removeItem('user');
      localStorage.setItem('isUserLoggedIn', 'false');
      console.log("Compte supprimé");
      alert("Votre compte vient d'être supprimé");
      window.location.href = 'index.html';
    });
  } else {
    console.log("Bouton de suppression de compte non trouvé sur cette page.");
  }
}

function setupLogoutButton(isLoggedIn) {
  var logoutButton = document.querySelector('#logoutButton');
  if (isLoggedIn && logoutButton) {
    logoutButton.classList.remove('d-none');
    logoutButton.addEventListener('click', function () {
      localStorage.setItem('isUserLoggedIn', 'false');
      console.log("Déconnexion de l'utilisateur");
      alert("Vous êtes maintenant déconnecté");
      window.location.reload(); // Recharger la page pour refléter l'état déconnecté
    });
  }
}

function validateForm() {
  let isValid = true;

  // Vérifier que tous les champs requis sont remplis
  document.querySelectorAll('.required').forEach(function (input) {
    if (!input.value.trim()) {
      alert('Tous les champs doivent être remplis.');
      isValid = false;
    }
  });

  // Vérification de la complexité du mot de passe
  let password = document.querySelector('#password').value;
  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    alert('Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial.');
    isValid = false;
  }

  // Vérification de la correspondance des mots de passe
  let confirmPassword = document.querySelector('#confirmPassword').value;
  if (password !== confirmPassword) {
    alert('Les mots de passe ne correspondent pas.');
    isValid = false;
  }

  // Vérification de l'absence de caractères spéciaux dans les autres champs
  document.querySelectorAll('.no-special-char').forEach(function (input) {
    if (/[^a-zA-Z0-9 \-+]/.test(input.value)) {
      alert('Les caractères spéciaux ne sont pas autorisés dans ce champ.');
      isValid = false;
    }
  });

  return isValid;
}
// Gestion de l'affichage du bouton Se déconnecter
let logoutButton = document.querySelector('#logoutButton');
let isUserLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true';
if (isUserLoggedIn && logoutButton) {
  logoutButton.classList.remove('d-none');
}
function validateLogin(email, password) {
  // Récupérer les données de l'utilisateur depuis le localStorage
  var storedUser = localStorage.getItem('user');
  if (storedUser) {
    storedUser = JSON.parse(storedUser);

    // Comparer les identifiants entrés avec ceux stockés
    if (storedUser.email === email && storedUser.password === password) {
      return true; // Les identifiants correspondent
    }
  }
  return false; // Les identifiants ne correspondent pas ou l'utilisateur n'existe pas
}

function seConnectClick() {
  console.log("Bouton de connexion cliqué");
  let email = document.querySelector('#email').value;
  let password = document.querySelector('#onPassword').value;

  console.log("Email saisi:", email);
  console.log("Mot de passe saisi:", password); // Attention à la sécurité ici, normalement on évite de logger les mots de passe

  if (validateLogin(email, password)) {
    // Si la validation réussit
    console.log("Validation réussie");
    alert("Vous êtes connecté");
    localStorage.setItem('isUserLoggedIn', 'true');
    updateNavbarForLoggedInUser();
    closeLoginModal();
  } else {
    // Afficher un message d'erreur
    console.log("Échec de la validation");
    alert("Identifiants incorrects");
  }
}


function updateNavbarForLoggedInUser() {
  // Sélectionner l'élément dans la navbar qui doit être mis à jour
  let accountButtonContainer = document.querySelector('#remplacIcon');

  // Vérifier si l'élément existe
  if (accountButtonContainer) {
    // Modifier le contenu HTML pour afficher une icône
    accountButtonContainer.innerHTML = '<a class="nav-link px-5" href="mon-compte.html"><i class="bi bi-person-bounding-box" style="font-size: 2.5em;"></i></a>';
  } else {
    console.error("Élément pour le bouton du compte non trouvé");
  }
}
