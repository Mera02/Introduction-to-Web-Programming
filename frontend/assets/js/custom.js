$(document).ready(function() {
    $("main#spapp > section").height($(document).height() - 60);
  
    var app = $.spapp({
      defaultView: "#homepage",
      templateDir: "./pages/",
      pageNotFound: "error_404"
    });

    
    app.route({
        view: 'homepage',
        load: '../pages/homepage.html',
        onReady: function() {
            document.getElementById('viewMoreBtn').addEventListener('click', function() {
                window.location.hash = '#porcije';
            });
        }
    });

  
app.route({
    view: 'porcije',
    load: '../pages/porcije.html',
    onReady: function () {
      $.ajax({
        url: 'data/products.json',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
         
          const productList = $('#productList');
          productList.empty();
          const porcije = data.filter(item => item.category === "porcije");
  
          porcije.forEach(product => {
            productList.append(`
              <div class="col-md-6 mb-4">
                <div class="jelo">
                  <div class="jeloslika">
                    <img src="${product.image}" alt="${product.name}" />
                  </div>
                  <div class="cijene">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p><b>${product.price.toFixed(2)} KM</b></p>
                    <button class="add-to-cart btn btn-success"
                            data-id="${product.id}"
                            data-name="${product.name}"
                            data-price="${product.price}"
                            data-quantity="1">
                      Dodaj u korpu
                    </button>
                  </div>
                </div>
              </div>
            `);
          });
  
          
          const comboList = $('#comboList');
          comboList.empty();
          const kombinacije = data.filter(item => item.category === 'kombinacije');
  
          kombinacije.forEach(product => {
            comboList.append(`
              <div class="col-md-6 kombinacija-box">
                <div class="kombinacija">
                  <div class="kombinacija-slika">
                    <img src="${product.image}" alt="${product.name}">
                  </div>
                  <div class="kombinacija-info">
                    <h4>${product.name}</h4>
                    <p class="eng">${product.description}</p>
                    <p class="cijena">${product.price.toFixed(2)} KM</p>
                    <button class="add-to-cart btn btn-outline-success btn-sm mt-2"
                            data-id="${product.id}"
                            data-name="${product.name}"
                            data-price="${product.price}"
                            data-quantity="1">
                      Dodaj u korpu
                    </button>
                  </div>
                </div>
              </div>
            `);
          });
  
         
          const plateList = $('#plateList');
          plateList.empty();
          const plate = data.filter(item => item.category === 'plate');
  
          plate.forEach(product => {
            plateList.append(`
              <div class="plata-item d-flex justify-content-between align-items-center mb-2">
                <span>${product.name}</span>
                <div class="d-flex align-items-center gap-3">
                  <span class="plata-cijena">${product.price.toFixed(2)} KM</span>
                  <button class="add-to-cart btn btn-outline-success btn-sm"
                          data-id="${product.id}"
                          data-name="${product.name}"
                          data-price="${product.price}"
                          data-quantity="1">
                    Dodaj u korpu
                  </button>
                </div>
              </div>
            `);
          });
  
          
          setupCartButtons();
        },
        error: function () {
          console.error("Greška prilikom učitavanja products.json fajla");
        }
      });
    }
  });
  
      
    

    
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

            
            $("#registerLink").on("click", function() {
                window.location.hash = "#register";
            });

        }
    });

    
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

            
            $("#loginLink").on("click", function() {
                window.location.hash = "#forma";
            });
        }
    });

    

app.route({
    view: 'salate',
    load: '../pages/salate.html',
    onReady: function () {
      $.ajax({
        url: 'data/products.json',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
          
          const salataList = $('#salataList');
          salataList.empty();
  
          data.filter(item => item.category === 'salate').forEach(product => {
            salataList.append(`
              <div class="salata-item d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded">
                <div class="fw-bold">${product.name}</div>
                <div class="d-flex align-items-center gap-3">
                  <span class="text-success fw-bold mb-0">${product.price.toFixed(2)} KM</span>
                  <button class="btn btn-outline-success btn-sm add-to-cart"
                    data-id="${product.id}"
                    data-name="${product.name}"
                    data-price="${product.price}"
                    data-quantity="1">
                    Dodaj u korpu
                  </button>
                </div>
              </div>
            `);
          });
  
          
          const mlijecniList = $('#mlijecniList');
          mlijecniList.empty();
  
          data.filter(item => item.category === 'mlijecni').forEach(product => {
            mlijecniList.append(`
              <div class="col-md-6 mb-4">
                <div class="mlijecni-jelo d-flex p-3 bg-light rounded align-items-center">
                  <div class="jeloslika me-3">
                    <img src="${product.image}" alt="${product.name}" class="img-fluid rounded-circle" style="width: 100px; height: 100px; object-fit: cover;">
                  </div>
                  <div class="mlijecni-cijene flex-grow-1">
                    <h5 class="mb-1">${product.name}</h5>
                    <p class="text-success fw-bold mb-2">${product.price.toFixed(2)} KM</p>
                    <button class="btn btn-outline-success btn-sm add-to-cart"
                      data-id="${product.id}"
                      data-name="${product.name}"
                      data-price="${product.price}"
                      data-quantity="1">
                      Dodaj u korpu
                    </button>
                  </div>
                </div>
              </div>
            `);
          });
  
          
          const picaList = $('#picaList');
          picaList.empty();
  
          data.filter(item => item.category === 'pice').forEach(product => {
            picaList.append(`
              <div class="pice-item d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded">
                <div class="fw-bold">${product.name}</div>
                <div class="d-flex align-items-center gap-3">
                  <span class="text-success fw-bold mb-0">${product.price.toFixed(2)} KM</span>
                  <button class="btn btn-outline-success btn-sm add-to-cart"
                    data-id="${product.id}"
                    data-name="${product.name}"
                    data-price="${product.price}"
                    data-quantity="1">
                    Dodaj u korpu
                  </button>
                </div>
              </div>
            `);
          });
  
          
          const kafaLista = $('.kafa-lista');
          kafaLista.empty();
  
          data.filter(item => item.category === 'kafa').forEach(product => {
            kafaLista.append(`
              <div class="kafa-item d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded">
                <div class="fw-bold">${product.name}</div>
                <div class="d-flex align-items-center gap-3">
                  <span class="text-success fw-bold mb-0">${product.price.toFixed(2)} KM</span>
                  <button class="btn btn-outline-success btn-sm add-to-cart"
                    data-id="${product.id}"
                    data-name="${product.name}"
                    data-price="${product.price}"
                    data-quantity="1">
                    Dodaj u korpu
                  </button>
                </div>
              </div>
            `);
          });
  
         
          const dezertLista = $('.dezert-lista');
          dezertLista.empty();
  
          data.filter(item => item.category === 'dezert').forEach(product => {
            dezertLista.append(`
              <div class="dezert-stavka d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded">
                <div class="fw-bold">${product.name}</div>
                <div class="d-flex align-items-center gap-3">
                  <span class="text-success fw-bold mb-0">${product.price.toFixed(2)} KM</span>
                  <button class="btn btn-outline-success btn-sm add-to-cart"
                    data-id="${product.id}"
                    data-name="${product.name}"
                    data-price="${product.price}"
                    data-quantity="1">
                    Dodaj u korpu
                  </button>
                </div>
              </div>
            `);
          });
  
          setupCartButtons();
        },
        error: function () {
          console.error('Greška prilikom učitavanja menija.');
        }
      });
    }
  });
  
  
  
      
      


    
    app.route({
      view: 'zaposlise',
      load: '../pages/zaposlise.html',
      onReady: function() {
          console.log("Zaposli se forma učitana");
      }
    });

// Ruta za Galeriju
    app.route({
        view: 'galerija',
        load: '../pages/galerija.html',
        onReady: function() {
            console.log("Galerija je učitana");
        }
      });
    
    app.route({
        view: 'cart',
        load: '../pages/cart.html',
        onReady: function () {
            console.log("🛒 Cart stranica učitana");

           
            renderCart();

            
            $('#checkout-btn').off('click').on('click', function () {
                sendOrder();
            });
        }
    });

  
  

    
    app.route({
        view: 'profil',
        load: '../pages/profil.html',
        onReady: function () {
            const user = JSON.parse(localStorage.getItem('user'));

            if (!user) {
                window.location.hash = "#forma";
                return;
            }

            
            $('#profile-name').text(user.first_name);
            $('#profile-email').text(user.email);
            $('#profile-phone').text(user.phone);
            $('#profile-role').text(user.role);

            
            $('#editProfileBtn').on('click', function () {
                $('#editFirstName').val(user.first_name);
                $('#editPhone').val(user.phone);
                $('#editProfileModal').modal('show');
            });

            
            $('#editProfileForm').on('submit', function (e) {
                e.preventDefault();

                const updatedName = $('#editFirstName').val();
                const updatedPhone = $('#editPhone').val();

                const updatedData = {
                    first_name: updatedName,
                    phone: updatedPhone
                };

                $.ajax({
                    url: backendUrl + `/users/${user.id}/profile`,
                    method: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(updatedData),
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    success: function (response) {
                        toastr.success('Profil ažuriran!');
                        
                        
                        user.first_name = updatedName;
                        user.phone = updatedPhone;
                        localStorage.setItem('user', JSON.stringify(user));
                
                        
                        $('#profile-name').text(updatedName);
                        $('#profile-phone').text(updatedPhone);
                
                        $('#editProfileModal').modal('hide');
                    },
                    error: function () {
                        toastr.error('Došlo je do greške prilikom ažuriranja.');
                    }
                });                
            });
        }
    });



    
    app.route({
        view: 'admin',
        load: '../pages/admin.html',
        onReady: function () {
            console.log("🔒 Admin panel učitan");

            const user = JSON.parse(localStorage.getItem('user'));
            if (!user || user.role !== 'admin') {
                toastr.error("Pristup dozvoljen samo adminima.");
                window.location.hash = "#homepage";
            }
        }
    });



    app.route({
    view: 'orders',
    load: '../pages/orders.html',
    onReady: function () {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || user.role !== 'admin') {
        window.location.hash = "#homepage";
        return;
      }

      $.ajax({
        url: backendUrl + "/orders",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        success: function (orders) {
          console.log("📦 ORDERS:", orders);

          const tbody = $('#orders-body');
          tbody.empty();

          orders.forEach(order => {
            const artikli = order.items && order.items.length > 0
              ? order.items.map(i => `${i.name} x${i.quantity}`).join(", ")
              : "Nema artikala";

            tbody.append(`
              <tr>
                <td>${order.id}</td>
                <td>${order.user_email || 'Nepoznato'}</td>
                <td>${new Date(order.created_at).toLocaleString()}</td>
                <td>${parseFloat(order.total || 0).toFixed(2)}</td>
                <td>${artikli}</td>
              </tr>
            `);
          });
        },
        error: function () {
          toastr.error("Greška pri učitavanju narudžbi.");
        }
      });
    }
  });



      app.route({
      view: 'admin-products',
      load: '../pages/admin-products.html',
      onReady: function () {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.role !== 'admin') {
          window.location.hash = "#homepage";
          return;
        }

        
        function loadProducts() {
          $.ajax({
            url: backendUrl + '/products',
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            success: function (response) {
              const products = response["All products"];
              const tbody = $('#admin-product-list');
              tbody.empty();

              products.forEach(product => {
                tbody.append(`
                  <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.description || ''}</td>
                    <td>${parseFloat(product.price).toFixed(2)} KM</td>
                    <td>${product.category_id || '—'}</td>
                    <td>
                      <button class="btn btn-sm btn-warning">Uredi</button>
                      <button class="btn btn-sm btn-danger">Obriši</button>
                    </td>
                  </tr>
                `);
              });
            },
            error: function () {
              toastr.error("Greška prilikom učitavanja proizvoda.");
            }
          });
        }

        loadProducts();

        
        $('#addProductBtn').off('click').on('click', function () {
          $('#addProductModal').modal('show');
        });

        
        $('#addProductForm').off('submit').on('submit', function (e) {
          e.preventDefault();

          const newProduct = {
            name: $('#productName').val(),
            description: $('#productDescription').val(),
            price: parseFloat($('#productPrice').val()),
            category_id: parseInt($('#productCategory').val())
          };

          $.ajax({
            url: backendUrl + '/products',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newProduct),
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            success: function () {
              toastr.success("Proizvod dodan!");
              $('#addProductModal').modal('hide');
              $('#addProductForm')[0].reset();
              loadProducts();
            },
            error: function () {
              toastr.error("Greška prilikom dodavanja.");
            }
          });
        });
      }
    });


      app.route({
      view: 'admin-users',
      load: '../pages/admin-users.html',
      onReady: function () {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.role !== 'admin') {
          window.location.hash = "#homepage";
          return;
        }

        $.ajax({
          url: backendUrl + '/users',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          success: function (users) {
            const tbody = $('#admin-user-list');
            tbody.empty();

            users.forEach(user => {
              tbody.append(`
                <tr>
                  <td>${user.id}</td>
                  <td>${user.first_name}</td>
                  <td>${user.email}</td>
                  <td>${user.phone || '-'}</td>
                  <td>${user.role}</td>
                </tr>
              `);
            });
          },
          error: function () {
            toastr.error("Greška pri učitavanju korisnika.");
          }
        });
      }
    });


      // Ruta za Cart
    app.route({
        view: 'cart',
        load: '../pages/cart.html',
        onReady: function() {
            console.log("Cart stranica učitana");
            
        }
    });

    app.run();
  });



/* FUNKCIJA ZA LOGIN */
function loginUser(email, password) {
    $.ajax({
      url: backendUrl + '/auth/login',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ email, password }),
      success: function (response) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        updateNavbar();
        alert('Login uspješan!');
        window.location.href = '#homepage'; // preusmjeri na početnu
      },
      error: function (xhr) {
        alert('Greška: ' + xhr.responseText);
      }
    });
  }
  
  /* FUNKCIJA ZA LOGOUT */
  function logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    updateNavbar();
    alert('Odjavljen si.');
  
    
    window.location.hash = '#homepage';
    window.location.reload();
  }
  
  
  
  
function updateNavbar() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        $('#nav-login').hide();
        $('#nav-register').hide();
        $('#nav-welcome').hide();
        $('#nav-logout-li').show();
        $('#nav-profile').show();

        
        if (user.role === 'admin') {
            $('#nav-admin').show();
        } else {
            $('#nav-admin').hide();
        }

    } else {
        $('#nav-login').show();
        $('#nav-register').show();
        $('#nav-welcome').hide();
        $('#nav-logout-li').hide();
        $('#nav-profile').hide();
        $('#nav-admin').hide();
    }
}

  
  
  
  /* FUNKCIJA ZA REGISTRACIJU */
  function registerUser() {
    const firstName = $('#firstName').val().trim();
    const lastName = $('#lastName').val().trim();
    const email = $('#email').val().trim();
    const phone = $('#phone').val().trim();
    const password = $('#password').val();
    const confirmPassword = $('#confirmPassword').val();
  
    // Validacija šifri
    if (password.trim() !== confirmPassword.trim()) {
      alert("Šifre se ne poklapaju.");
      return;
    }
  
    $.ajax({
      url: backendUrl + '/auth/register',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        password: password,
        role: 'user' 
      }),
      success: function (response) {
        alert("Registracija uspješna! Možete se sada prijaviti.");
        window.location.href = '#forma';
      },
      error: function (xhr) {
        alert("Greška prilikom registracije: " + xhr.responseText);
      }
    });
  }
  
  /* KADA SE STRANICA UCITA, UPDATE NAVIGACIJE */
  $(document).ready(function () {
    updateNavbar();
  });
  

/* SUBMIT LOGIN*/

  function submitLogin() {
    const email = $('#loginEmail').val();
    const password = $('#loginPassword').val();
  
    if (!email || !password) {
      alert('Molimo unesite email i šifru.');
      return;
    }
  
    loginUser(email, password); 
  }
  




  /*DODAJ U KORPU*/

  function setupCartButtons() {
    
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.replaceWith(button.cloneNode(true));
    });

    
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const id = parseInt(this.dataset.id);
            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price);
            const quantity = parseInt(this.dataset.quantity);

            console.log(`✅ Dodano: ${name} | ID: ${id} | ${price} KM x ${quantity}`);

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            const existing = cart.find(item =>
                item.product_id === id && item.price === price
            );

            if (existing) {
                existing.quantity += quantity;
            } else {
                cart.push({
                    product_id: id,
                    name,
                    price,
                    quantity
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            toastr.success(`${name} dodano u korpu!`);
        });
    });
}


  



  /*UBACIVANJE U KORPU*/

  function renderCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const tbody = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    tbody.innerHTML = "";

    let total = 0;

    cartItems.forEach((item, index) => {
        const row = document.createElement('tr');

        const totalRowPrice = (item.price * item.quantity).toFixed(2);
        total += parseFloat(totalRowPrice);

        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price.toFixed(2)} KM</td>
            <td>${totalRowPrice} KM</td>
            <td><button class="btn btn-danger btn-sm remove-btn" data-index="${index}">Ukloni</button></td>
        `;

        tbody.appendChild(row);
    });

    totalAmount.textContent = `Ukupno: ${total.toFixed(2)} KM`;

    
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function () {
            const index = parseInt(this.dataset.index);
            cartItems.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cartItems));
            renderCart(); 
        });
    });
}



/*ZAVRSI NARUDZBU*/


let orderSent = false;

function sendOrder() {
    if (orderSent) return;
    orderSent = true;

    const user = JSON.parse(localStorage.getItem('user'));
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!user || !user.id) {
        toastr.error("Morate biti prijavljeni da završite narudžbu.");
        orderSent = false;
        return;
    }

    if (cart.length === 0) {
        toastr.warning("Vaša korpa je prazna.");
        orderSent = false;
        return;
    }

    const orderData = {
        user_id: user.id,
        items: cart
    };

    $.ajax({
        url: backendUrl + '/orders',
        method: 'POST',
        contentType: 'application/json',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        data: JSON.stringify(orderData),
        success: function () {
            toastr.success("Narudžba uspješno poslata!");
            localStorage.removeItem('cart');
            updateCartDisplay();
            setTimeout(() => {
                window.location.hash = "#homepage";
            }, 1000);
        },
        error: function (xhr) {
            toastr.error("Greška: " + xhr.responseText);
        },
        complete: function () {
            orderSent = false;
        }
    });
}

  

  
  /*UPDATE CART*/

  function updateCartDisplay() {
    $('#cart-items').empty();
    $('#total-amount').text("Ukupno: 0.00 KM");
  }
  


  /* remove from cart*/

  function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload(); 
  }
  





  function renderExtraProducts(data) {
    const comboContainer = document.querySelector("#komb .row");
    const plateContainer = document.querySelector(".plata-stavke");

    data.forEach(product => {
        // KOMBINACIJE
        if (product.category === "kombinacije") {
            const html = `
                <div class="col-md-6 kombinacija-box">
                    <div class="kombinacija">
                        <div class="kombinacija-slika">
                            <img src="${product.image}" alt="">
                        </div>
                        <div class="kombinacija-info">
                            <h4>${product.name}</h4>
                            <p class="eng">${product.description}</p>
                            <p class="cijena">${product.price.toFixed(2)} KM</p>
                        </div>
                    </div>
                </div>
            `;
            comboContainer.innerHTML += html;
        }

        // PLATE
        if (product.category === "plate") {
            const html = `
                <div class="plata-item">
                    <span>${product.name}</span>
                    <span class="plata-cijena">${product.price.toFixed(2)} KM</span>
                </div>
            `;
            plateContainer.innerHTML += html;
        }
    });
}
