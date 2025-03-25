$(document).ready(function() {
    $("main#spapp > section").height($(document).height() - 60);
  
    var app = $.spapp({
      defaultView: "#homepage",
      templateDir: "./pages/",
      pageNotFound: "error_404"
    });
  
    // Ruta za Homepage
    app.route({
        view: 'homepage',
        load: '../pages/homepage.html',
        onReady: function() {
            document.getElementById('viewMoreBtn').addEventListener('click', function() {
                window.location.hash = '#porcije';
            });
        }
    });
  
    // Ruta za Porcije
    app.route({
      view: 'porcije',
      load: '../pages/porcije.html',
      onReady: function() {
          $.ajax({
              url: 'data/products.json',
              method: 'GET',
              dataType: 'json',
              success: function(data) {
                  var productList = $('#productList');
                  productList.empty();
                  data.forEach(function(product) {
                      productList.append('<div class="product-item"><h3>' + product.name + '</h3><p>' + product.description + '</p><p><b>' + product.price + '</b></p></div>');
                  });
              }
          });
      }
    });
  
    // Ruta za Login (Forma)
    app.route({
        view: 'forma',
        load: '../pages/forma.html',
        onReady: function() {
            $('#contactForm').validate({
                rules: {
                    prvoime: "required",
                    lastnejm: "required",
                    email: {
                        required: true,
                        email: true
                    },
                    password: {
                        required: true,
                        minlength: 6
                    }
                },
                messages: {
                    prvoime: "Please enter your first name",
                    lastnejm: "Please enter your last name",
                    email: "Please enter a valid email address",
                    password: {
                        required: "Please provide a password",
                        minlength: "Your password must be at least 6 characters long"
                    }
                },
                submitHandler: function(form) {
                    setTimeout(function() {
                        toastr.success('Login successful!');
                        $('#contactForm')[0].reset();
                        window.location.hash = "#homepage";
                    }, 500);
                }
            });
  
            // Prebaci na registraciju
            $("#registerLink").on("click", function() {
                window.location.hash = "#register";
            });
  
        }
    });
  
    // Ruta za Registraciju
    app.route({
        view: 'register',
        load: '../pages/register.html',
        onReady: function() {
            $('#registerForm').validate({
                rules: {
                    newName: "required",
                    newEmail: {
                        required: true,
                        email: true
                    },
                    newPassword: {
                        required: true,
                        minlength: 6
                    }
                },
                messages: {
                    newName: "Please enter your name",
                    newEmail: "Please enter a valid email",
                    newPassword: {
                        required: "Please provide a password",
                        minlength: "Your password must be at least 6 characters long"
                    }
                },
                submitHandler: function(form) {
                    setTimeout(function() {
                        toastr.success('Registration successful! Redirecting to login...');
                        $('#registerForm')[0].reset();
                        window.location.hash = "#forma";
                    }, 500);
                }
            });
  
            // Prebaci na login ako ima nalog
            $("#loginLink").on("click", function() {
                window.location.hash = "#forma";
            });
        }
    });
  
    // Ruta za Pitanja (FAQ)
    app.route({
        view: 'pitanja',
        load: '../pages/faq.html',
        onReady: function() {
            const accordionItems = document.querySelectorAll('.accordion-item');
            accordionItems.forEach(item => {
                item.querySelector('.accordion-item-header').addEventListener('click', function() {
                    this.nextElementSibling.classList.toggle('active');
                });
            });
        }
    });
  
    // Ruta za Salate
    app.route({
      view: 'salate',
      load: '../pages/salate.html',
      onReady: function() {
          console.log("Stranica Salate je učitana!");
      }
    });
  
    app.run();
  });
  