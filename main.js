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
    <!-- le bouton qui suit sert à la transformation de la navBar en menu Burger -->
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
        <li class="nav-item">
          <a class="nav-link" href="destination.html">DESTINATION</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="organisation.html">ORGANISATION</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="suivez-nous.html">SUIVEZ-NOUS</a>
        </li>
      </ul>
    </div>
  </div>
    `;
  
    // Trouvez l'élément sur la page où vous souhaitez inclure la barre de navigation
    var navbarContainer = document.querySelector('#navbar-container');
  
    // Ajoutez la barre de navigation à cet élément
    navbarContainer.appendChild(navbar);
  }