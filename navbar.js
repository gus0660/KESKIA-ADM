function includeNavbar() {
    // Créez un nouvel élément <nav> pour contenir la barre de navigation
    var navbar = document.createElement('nav');
    navbar.classList.add('navbar');
    navbar.classList.add('navbar-expand-lg');
    navbar.classList.add('navbar-light');
    navbar.classList.add('fixed-top');
  
    // Définissez le contenu de la barre de navigation
    navbar.innerHTML = `
      <!-- Contenu de votre barre de navigation -->
    `;
  
    // Trouvez l'élément sur la page où vous souhaitez inclure la barre de navigation
    var navbarContainer = document.querySelector('#navbar-container');
  
    // Ajoutez la barre de navigation à cet élément
    navbarContainer.appendChild(navbar);
  }