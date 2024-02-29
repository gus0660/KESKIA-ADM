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
        <li class="nav-item">
          <div class="nav-content">
            <a class="nav-link" id="navbDdMenu" href="#">MON COMPTE</a>
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
                </form>
                <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="mon-compte.html">New around here? Sign up</a>
                  <a class="dropdown-item" href="#">Forgot password?</a>
                </div>
        </div>
    `;
    // Ajout du modal à la fin du body
    document.body.appendChild(loginModal);

    // Ajout d'un écouteur d'événements pour afficher le modal lors du clic sur "MON COMPTE"
    var accountButton = document.getElementById('navbDdMenu');
    accountButton.addEventListener('click', function(event) {
        event.preventDefault(); // Empêche la navigation par défaut
        loginModal.style.display = 'block'; // Affiche le modal
        loginModal.classList.add('show'); // Ajoutez la classe 'show' pour afficher le modal
    });

    // Ajout d'un écouteur d'événements pour fermer le modal
var closeModalButton = document.getElementById('closeModal');
closeModalButton.addEventListener('click', function() {
    loginModal.style.display = 'none';
    loginModal.classList.remove('show');
    resetLoginForm(); // Appelle la fonction de réinitialisation
});

  // Trouvez l'élément sur la page où vous souhaitez inclure la barre de navigation
  var navbarContainer = document.querySelector("#navbar-container");
}

function resetLoginForm() {
  var emailInput = document.getElementById('email');
  var passwordInput = document.getElementById('password');
  
  emailInput.value = '';
  passwordInput.value = '';
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
  var footerContainer = document.querySelector("#footer-container");

  // Ajoutez le pied de page à cet élément
  footerContainer.appendChild(footer);
}
