/*milestone 2 forma*/


document.getElementById("togglePassword").addEventListener("click", function() {
  var passwordInput = document.getElementById("password");
  var icon = this.querySelector("i");
  if (passwordInput.type === "password") {
      passwordInput.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
  } else {
      passwordInput.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
  }
});




/*Prikazi vise sekcija na homepageu*/

function toggleContactInfo() {
  const content = document.getElementById("hiddenContact");
  content.classList.toggle("collapse");
  content.classList.toggle("show");
}



/*milestone 2 navbar*/

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
          new bootstrap.Collapse(navbarCollapse).toggle();
      }
  });
});


