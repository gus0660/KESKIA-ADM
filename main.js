
function includeNavbar() {
    // Créez un nouvel élément <nav> pour contenir la barre de navigation
    var navbar = document.createElement('nav');
    navbar.classList.add('navbar');
    navbar.classList.add('navbar-expand-lg');
    navbar.classList.add('navbar-light');
    navbar.classList.add('fixed-top');
  
    // Définissez le contenu de la barre de navigation
    navbar.innerHTML = `
    <div class="container">
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
      <ul class="navbar-nav">
        <a href="index.html">
          <img src="images/logoKESKIADM.webp" class="navbar-logo d-none d-md-block" alt="Logo" width="201" height="90" style="margin-right: auto; margin-left: auto; margin-right: 40px;">
        </a>
        <li class="nav-item">
          <a class="nav-link" href="destination.html">DESTINATION</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="organisation.html">ORGANISATION</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="decouvrir.html">DECOUVRIR</a>
        </li>
      </ul>
      <button class="btn btn-secondary d-block d-sm-none" id="back-button">Retour</button>
    </div>
  </div>
    `;
  
    // Trouvez l'élément sur la page où vous souhaitez inclure la barre de navigation
    var navbarContainer = document.querySelector('#navbar-container');
  
    // Ajoutez la barre de navigation à cet élément
    navbarContainer.appendChild(navbar);
  }
  document.addEventListener('DOMContentLoaded', function () {
    var menuToggler = document.getElementById('menu-toggler');
    var backButton = document.getElementById('back-button');
  
    menuToggler.addEventListener('click', function () {
      if (menuToggler.getAttribute('aria-expanded') === 'true') {
        backButton.style.display = 'block';
      } else {
        backButton.style.display = 'none';
      }
    });
  });
