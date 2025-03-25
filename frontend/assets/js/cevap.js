
//LOGIN VALIDACIJA I PASSWORD STRENGTH

$(document).ready(function() {
    $('#registerButton').on('click', function(event) {
        let valid = true;

        // First Name validation
        if ($('#prvoime').val().trim().length < 2) {
            valid = false;
            $('#firstnameError').css({'color': 'red', 'font-size': '12px'}).text('Please enter a valid first name');
        } else {
            $('#firstnameError').text('');
        }

        // Last Name validation
        if ($('#lastnejm').val().trim().length < 2) {
            valid = false;
            $('#lastnameError').css({'color': 'red', 'font-size': '12px'}).text('Please enter a valid last name');
        } else {
            $('#lastnameError').text('');
        }

        // Email validation
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test($('#email').val().trim())) {
            valid = false;
            $('#emailError').css({'color': 'red', 'font-size': '12px'}).text('Please enter a valid email address');
        } else {
            $('#emailError').text('');
        }

        // Password validation
        const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
        if (!passwordPattern.test($('#subject').val().trim())) {
            valid = false;
            $('#passwordError').css({'color': 'red', 'font-size': '12px'}).text('Please enter a valid password (at least 6 characters with both letters and numbers)');
        } else {
            $('#passwordError').text('');
        }


        // prikaz success poruke
        if (valid) {
            toastr.success('Form submitted successfully!'); // OVO JE TOASTR PORUKA
            $('#prvoime').val('');
            $('#lastnejm').val('');
            $('#email').val('');
            $('#subject').val('');
        }    
        
    });
});

// password strength

document.getElementById("subject").addEventListener("input", function () {
    const strengthIndicator = document.getElementById("password-strength");
    const password = this.value;
    let strength = 0;
  
    if (password.match(/[a-z]/)) {
      strength += 1;
    }
    if (password.match(/[A-Z]/)) {
      strength += 1;
    }
    if (password.match(/[0-9]/)) {
      strength += 1;
    }
    if (password.match(/[$@#!%*?&]/)) {
      strength += 1;
    }
  
    strengthIndicator.style.width = strength * 25 + "%";
  
    if (strength === 0) {
      strengthIndicator.className = "";
      strengthIndicator.style.width = "0%";
    } else if (strength === 1) {
      strengthIndicator.className = "strength-weak";
    } else if (strength === 2) {
      strengthIndicator.className = "strength-medium";
    } else if (strength >= 3) {
      strengthIndicator.className = "strength-strong";
    }
  });




/*NOVA FORMA*/


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




//Theme switcher
function switchTheme() {
  var body = document.body;
  var navbar = document.querySelector('.navbar');
  var themeSwitcher = document.getElementById('themeSwitcher');

  body.classList.toggle('dark-theme');
  navbar.classList.toggle('dark-theme');

  // Toggle font size if needed
  body.classList.toggle('large-font');

  // Update button text based on the current theme
  if (body.classList.contains('dark-theme')) {
      themeSwitcher.textContent = 'White Mode';
  } else {
      themeSwitcher.textContent = 'Dark Mode';
  }
}




/*  CONTENT TOGGLE */

function toggleContent() {
  var content = document.querySelector('.citat p');
  var button = document.getElementById('toggleButton');

  if (content.style.display === "none") {
      content.style.display = "block";
      button.textContent = "Hide Content";
  } else {
      content.style.display = "none";
      button.textContent = "Show Content";
  }
}

