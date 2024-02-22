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
          <img src="images/logoKESKIADM.webp" class="navbar-logo d-none d-md-block" alt="Logo" width="201" height="90" style="margin-right: auto; margin-left: auto; margin-right: 30px;">
        </a>
        <li class="nav-item">
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
    
      </ul>
      <button class="btn btn-secondary d-block d-sm-none" id="back-button">
        <a href="index.html" style="text-decoration: none; color: white;">Retour</a>
      </button>
    </div>
  </div>
    `;

  // Trouvez l'élément sur la page où vous souhaitez inclure la barre de navigation
  var navbarContainer = document.querySelector("#navbar-container");

  // Ajoutez la barre de navigation à cet élément
  navbarContainer.appendChild(navbar);
}

// function includeFooter() {
//   // Créez un nouvel élément <footer> pour contenir le footer
//   var footer = document.createElement("footer");
//   footer.classList.add("footer");

//   // Définissez le contenu du footer
//   footer.innerHTML = `
//   <div class="container">
//   <button
//     class="navbar-toggler"
//     id="menu-toggler"
//     type="button"
//     data-bs-toggle="collapse"
//     data-bs-target="#navbarNav"
//     aria-controls="navbarNav"
//     aria-expanded="false"
//     aria-label="Toggle navigation"
//   >
//     <span class="navbar-toggler-icon"></span>
//   </button>
//   <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
//     <ul class="footer-menu">
//       <li class="nav-item">
//         <div class="nav-content">
//           <a class="nav-link" href="destination.html">DESTINATION</a>
//           <span class="nav-subtext">Carte - Trajet</span>
//         </div>
//       </li>
//       <li class="nav-item">
//         <div class="nav-content">
//           <a class="nav-link" href="decouvrir.html">DECOUVRIR</a>
//           <span class="nav-subtext">Explorez</span>
//         </div>
//       </li>
//       <li class="nav-item">
//         <div class="nav-content">
//           <a class="nav-link" href="organisation.html">ORGANISATION</a>
//           <span class="nav-subtext">De votre séjour</span>
//         </div>
//       </li>
  
//     </ul>
//     <button class="btn btn-secondary d-block d-sm-none" id="back-button">
//       <a href="index.html" style="text-decoration: none; color: white;">Retour</a>
//     </button>
//   </div>
// </div>
//   `;

//   // Trouvez l'élément sur la page où vous souhaitez inclure le footer
//   var footerContainer = document.querySelector("#footer-container");

//   // Ajoutez le footer à cet élément
//   footerContainer.appendChild(footer);
// }

// document.addEventListener("DOMContentLoaded", function () {
//   var menuToggler = document.querySelector("#menu-toggler");
//   var backButton = document.querySelector("#back-button");

//   menuToggler.addEventListener("click", function () {
//     if (menuToggler.getAttribute("aria-expanded") === "true") {
//       backButton.style.display = "block";
//     } else {
//       backButton.style.display = "none";
//     }
//   });
// });
