// Déclaration des variables
let emailInput, passwordInput, loginModal, accountButton, remplacIconDiv, logoutButton, closeModalButton,
    closeNavbar, footerContainer, footer, value, accountForm, deleteAccountButton;

// Initialisation au chargement du DOM
document.addEventListener("DOMContentLoaded", function () {
    // Initialisation des variables
    navbarContainer = document.querySelector("#navbar-container");
    footerContainer = document.querySelector("#footer-container");
    emailInput = document.querySelector("#email");
    passwordInput = document.querySelector("#password");
    loginModal = document.querySelector("#loginModal");
    accountButton = document.querySelector("#navbDdMenu");
    remplacIconDiv = document.querySelector("#remplacIcon");
    logoutButton = document.querySelector("#logoutButton");
    closeModalButton = document.querySelector("#closeModal");
    accountForm = document.querySelector("#accountForm");
    deleteAccountButton = document.querySelector("#deleteAccount");
    // Récupération des données depuis storageManager
    let storedUserData = storageManager.getItem("user");
    let isUserLoggedIn = storageManager.getItem("isUserLoggedIn");

    // Appels des fonctions d'initialisation
    navbarManager.includeNavbar();
    navbarManager.closeNavbar();
    loginManager.resetLoginForm();
    loginManager.closeLoginModal();
    loginManager.updateLoginState();
    loginManager.setupLogoutButton();
    loginManager.updateLoginState(isUserLoggedIn);
    loginManager.setupLogoutButton(isUserLoggedIn);
    footerManager.includeFooter();
    storageManager.setupAccountForm();
    storageManager.getItem();
    storageManager.setItem();
    storageManager.removeItem();
    storageManager.setupDeleteAccountButton();
    storageManager.deleteAccountButton();
});

// Objets de gestion
var loginManager = {
    resetLoginForm: function () {
        emailInput.value = "";
        passwordInput.value = "";
    },
    closeLoginModal: function () {
        if (loginModal) {
            loginModal.style.display = "none";
            loginModal.classList.remove("show");
            this.resetLoginForm();
        }
    },

    updateLoginState: function () {
        // Vérifier si l'utilisateur est connecté
        let isUserLoggedIn = localStorage.getItem("isUserLoggedIn") === "true";

        // Gérer l'affichage de l'icône de l'utilisateur ou du bouton de connexion
        if (isUserLoggedIn) {
            if (remplacIconDiv) {
                remplacIconDiv.innerHTML =
                    '<a class="nav-link px-5" href="#" id="userIcon"><i class="bi bi-person-bounding-box" style="font-size: 2.5em;"></i></a>';
                var userIcon = document.getElementById("userIcon");
                userIcon.addEventListener("click", function (event) {
                    event.preventDefault();
                    loginModal.style.display = "block";
                    loginModal.classList.add("show");
                });
            }
            if (logoutButton) {
                logoutButton.classList.remove("d-none");
            }
        } else {
            if (accountButton) {
                accountButton.addEventListener("click", function (event) {
                    event.preventDefault();
                    loginModal.style.display = "block";
                    loginModal.classList.add("show");
                });
            }
            if (logoutButton) {
                logoutButton.classList.add("d-none");
            }
        }

        // Attacher un gestionnaire d'événements pour fermer le modal
        if (closeModalButton) {
            closeModalButton.addEventListener(
                "click",
                function () {
                    loginModal.style.display = "none";
                    loginModal.classList.remove("show");
                    this.resetLoginForm();
                }.bind(this)
            );
        }
    },

    setupLogoutButton: function () {
        if (!logoutButton) {
            console.log("Bouton de déconnexion non trouvé");
            return;
        }

        // Déterminer l'état de connexion pour afficher ou masquer le bouton de déconnexion
        if (isUserLoggedIn) {
            logoutButton.classList.remove("d-none");
        } else {
            logoutButton.classList.add("d-none");
        }

        // Attacher un gestionnaire d'événements pour le bouton de déconnexion
        logoutButton.addEventListener("click", function () {
            console.log("Bouton de déconnexion cliqué");
            localStorage.setItem("isUserLoggedIn", "false");
            alert("Vous êtes maintenant déconnecté");
            window.location.reload(); // Recharger la page pour refléter l'état déconnecté
        });
    },
};

var navbarManager = {
    includeNavbar: function () {
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
                    <button type="button" class="btn btn-danger my-2" id="logoutButton">Se déconnecter</button>
                </form>
                <div class="modal-footer">
            <div style="width: 100%; text-align: center;">
                <button type="button" class="btn btn-success" onclick="location.href='mon-compte.html'">Mon Compte</button>
                <a class="dropdown-item" href="#">Forgot password?</a>
            </div>
    `;
        // Ajout du modal à la fin du body
        document.body.appendChild(loginModal);
    },
    closeNavbar: function () {
        let navbarToggler = document.querySelector(".navbar-toggler");
        let navbarCollapse = document.querySelector(".navbar-collapse");

        if (navbarCollapse.classList.contains("show")) {
            navbarToggler.click();
        }
    },
    // Autres fonctions liées à la gestion de la navbar
};

var footerManager = {
    includeFooter: function () {
        // Créez un nouvel élément <footer> pour contenir le pied de page
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
        // Ajoutez le pied de page à cet élément
        footerContainer.appendChild(footer);
    },
};

var storageManager = {
    // Méthodes pour interagir avec localStorage
    getItem: function (key) {
        let value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    },
    setItem: function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: function (key) {
        localStorage.removeItem(key);
    },
    // Méthodes pour gérer les formulaires
    setupAccountForm: function () {
        if (!accountForm) {
            console.log("Formulaire de compte '#accountForm' non trouvé sur cette page.");
            return;
        }
        if (isUserLoggedIn && storedUserData) {
            console.log("Données utilisateur actuelles dans localStorage:", storedUserData);
            // Remplir le formulaire avec les données de l'utilisateur
            // ...
        } else {
            console.log("Aucune donnée utilisateur ou utilisateur non connecté");
        }
        accountForm.addEventListener("submit", function (event) {
                event.preventDefault();
                if (!this.validateForm()) {
                    console.log("Validation du formulaire échouée");
                    return;
                }
                var user = {
                    fullName: document.querySelector("#fullName").value,
                    email: document.querySelector("#eMail").value,
                    identifiant: document.querySelector("#identifiant").value,
                    phone: document.querySelector("#phone").value,
                    password: document.querySelector("#password").value,
                };

                this.setItem("user", user);
                this.setItem("isUserLoggedIn", true);
                alert("Votre compte est créé");
                window.location.href = "mon-compte.html";
            }.bind(this)
        );
    },

    setupDeleteAccountButton: function () {
        if (!deleteAccountButton) {
            console.log("Bouton de suppression de compte non trouvé sur cette page.");
            return;
        }

        deleteAccountButton.addEventListener(
            "click",
            function () {
                this.removeItem("user");
                this.setItem("isUserLoggedIn", false);
                alert("Votre compte vient d'être supprimé");
                window.location.href = "index.html";
            }.bind(this)
        );
    }
};

var formValidator = {
    validateForm: function () {
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
    },
  
    // Ajouter d'autres méthodes de validation ici si nécessaire
  };
  
  // Utilisation de l'objet formValidator
  document.querySelector("#formId").addEventListener("submit", function (event) {
    event.preventDefault();
    if (formValidator.validateForm()) {
      // Logique à exécuter si le formulaire est valide
    }
  });
  
