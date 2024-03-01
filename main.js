function includeNavbar() {
  // Créez un nouvel élément <nav> pour contenir la barre de navigation
  var navbar = document.createElement("nav");
  navbar.classList.add("navbar");
  navbar.classList.add("navbar-expand-lg");
  navbar.classList.add("navbar-light");
  navbar.classList.add("fixed-top");

  // Définissez le contenu de la barre de navigation
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
          <img src="images/logoKESKIADM.webp" class="navbar-logo d-none d-sm-block" alt="Logo" width="201" height="90" style="margin-right: auto; margin-left: auto; margin-right: 30px;">
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
  // Trouver l'élément de conteneur de la barre de navigation et l'ajouter
  var navbarContainer = document.querySelector("#navbar-container");
  navbarContainer.appendChild(navbar);

  // Création du modal de connexion
  var loginModal = document.createElement("div");
  loginModal.id = "loginModal";
  loginModal.className = "login-modal";
  loginModal.style.display = "none"; // Cachez-le initialement
  loginModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Connexion</h5>
                <button type="button" class="close" id="closeModal" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <!-- Formulaire de connexion -->
                <form>
                    <div class="form-group">
                        <label for="email">Adresse Email</label>
                        <input type="email" class="form-control" id="email" placeholder="email@example.com">
                    </div>
                    <div class="form-group">
                        <label for="password">Mot de Passe</label>
                        <input type="password" class="form-control" id="password" placeholder="Mot de passe">
                    </div>
                    <button type="submit" class="btn btn-primary">Se Connecter</button>
                    <button type="button" class="btn btn-danger my-2" id="logoutButton">
                Se déconnecter
            </button>
                </form>
                <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="mon-compte.html">New around here? Sign up</a>
                  <a class="dropdown-item" href="#">Forgot password?</a>
                </div>
        </div>
    `;
  // Ajout du modal à la fin du body
  document.body.appendChild(loginModal);

  var isUserLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true';
    var accountButton = document.getElementById('navbDdMenu');
    var remplacIconDiv = document.getElementById('remplacIcon');

    if (isUserLoggedIn) {
        // Utilisateur connecté: Modifier pour afficher l'icône et ajouter un écouteur d'événements
        if (remplacIconDiv) {
            remplacIconDiv.innerHTML = '<a class="nav-link" href="#" id="userIcon"><i class="bi bi-person-bounding-box" style="font-size: 3em;"></i></a>';
            var userIcon = document.getElementById('userIcon');
            userIcon.addEventListener('click', function(event) {
                event.preventDefault();
                loginModal.style.display = 'block';
                loginModal.classList.add('show');
            });
        }
    } else {
        // Utilisateur non connecté: Ajouter un écouteur d'événements pour afficher le modal de connexion
        if (accountButton) {
            accountButton.addEventListener('click', function(event) {
                event.preventDefault();
                loginModal.style.display = 'block';
                loginModal.classList.add('show');
            });
        }
    }

  // Ajout d'un écouteur d'événements pour afficher le modal lors du clic sur "MON COMPTE"
  // var accountButton = document.getElementById('navbDdMenu');
  // accountButton.addEventListener('click', function (event) {
  //   event.preventDefault(); // Empêche la navigation par défaut
  //   loginModal.style.display = 'block'; // Affiche le modal
  //   loginModal.classList.add('show'); // Ajoutez la classe 'show' pour afficher le modal
  // });

  // Ajout d'un écouteur d'événements pour fermer le modal
  var closeModalButton = document.getElementById('closeModal');
  closeModalButton.addEventListener('click', function () {
    loginModal.style.display = 'none';
    loginModal.classList.remove('show');
    resetLoginForm(); // Appelle la fonction de réinitialisation
  });

  // var accountButton = document.getElementById('navbDdMenu');
  // accountButton.addEventListener('click', function (event) {
  //   // Logique existante pour afficher le modal...
  //   closeNavbar(); // Ferme le menu burger
  // });

  // Trouvez l'élément sur la page où vous souhaitez inclure la barre de navigation
  var navbarContainer = document.querySelector("#navbar-container");

  // Gestionnaire pour le bouton Se déconnecter
  if (logoutButton) {
    logoutButton.addEventListener('click', function () {
      localStorage.removeItem('user');
      localStorage.setItem('isUserLoggedIn', 'false');
      console.log("Déconnexion de l'utilisateur");
      alert("Vous êtes maintenant déconnecté");
      window.location.reload(); // Recharger la page pour refléter l'état déconnecté
    });
  }
  // Avant de commencer la modification
  console.log("Prêt à modifier le bouton MON COMPTE");

  // var remplacIconDiv = document.getElementById('remplacIcon');
  //   var isUserLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true';

  //   if (remplacIconDiv) {
  //     if (isUserLoggedIn) {
  //         // Remplacer le contenu du div par l'icône, liée à une action ou un script différent
  //         remplacIconDiv.innerHTML = '<a class="nav-link" href="" id="userIcon"><i class="bi bi-person-bounding-box" style="font-size: 3em;"></i></a>';
  //         var userIcon = document.getElementById('userIcon');
  //         userIcon.addEventListener('click', function(event) {
  //             event.preventDefault();
  //             // Ouvrir le menu de connexion ou effectuer une autre action
  //             console.log("Icône cliquée par un utilisateur connecté");
  //             // Code pour ouvrir le menu de connexion ou autre
  //         });
  //         console.log("Bouton MON COMPTE modifié pour afficher l'icône");
  //     } else {
  //         // Pour un utilisateur non connecté, vous pouvez lier à la page de connexion ou conserver l'action originale
  //         remplacIconDiv.innerHTML = '<a class="nav-link" href="#">MON COMPTE</a><span class="nav-subtext">Créer Mon Compte</span>';
  //         console.log("Bouton MON COMPTE réinitialisé");
  //     }
  // } else {
  //     console.log("L'élément remplacIcon n'a pas été trouvé");
  // }
  
}


function resetLoginForm() {
  let emailInput = document.querySelector('#email');
  let passwordInput = document.querySelector('#password');

  emailInput.value = '';
  passwordInput.value = '';
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

document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM entièrement chargé et analysé");

  // Vérifier si les données utilisateur sont déjà stockées dans le localStorage au chargement de la page
  let storedUserData = localStorage.getItem('user');
  console.log("Données utilisateur actuelles dans localStorage:", storedUserData ? JSON.parse(storedUserData) : "Aucune donnée utilisateur");

  // Gestion de la création du compte (s'assurer que le formulaire existe)
  var accountForm = document.querySelector('#accountForm');
  if (accountForm) {
    accountForm.addEventListener('submit', function (event) {
      event.preventDefault();
      console.log("Soumission du formulaire de création de compte");

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
      window.location.href = 'mon-compte.html';
      console.log("Redirection vers 'mon-compte.html'");
    });
  } else {
    console.log("Formulaire de compte '#accountForm' non trouvé sur cette page.");
  }

  // Gestion de la suppression du compte (s'assurer que le bouton existe)
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
});
// Gestion de l'affichage du bouton Se déconnecter
var logoutButton = document.querySelector('#logoutButton');
var isUserLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true';
if (isUserLoggedIn && logoutButton) {
  logoutButton.classList.remove('d-none');
}
