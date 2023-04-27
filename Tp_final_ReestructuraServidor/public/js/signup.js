//  Validación del formulario
// (function () {
//     "use strict";
//     // Obtener el formulario
//     var form = document.getElementById("signup-form");
//     // Obtener los campos del formulario
//     var name = form.elements.name;
//     var lastname = form.elements.lastname;
//     var username = form.elements.username;
//     var email = form.elements.email;
//     var password = form.elements.password;
//     var confirmPassword = form.elements["confirm-password"];

//     // Agregar evento de envío del formulario
//     form.addEventListener("submit", function (event) {
//       // Validar los campos del formulario
//       if (!form.checkValidity()) {
//         event.preventDefault();
//         event.stopPropagation();
//       }
//       form.classList.add("was-validated");
//     });

//     // Agregar evento de cambio de campo
//     name.addEventListener("change", function () {
//       validateName();
//     });

//     lastname.addEventListener("change", function () {
//       validateLastname();
//     });

//     username.addEventListener("change", function () {
//       validateUsername();
//     });

//     email.addEventListener("change", function () {
//       validateEmail();
//     });

//     password.addEventListener("change", function () {
//       validatePassword();
//     });

//     confirmPassword.addEventListener("change", function () {
//       validateConfirmPassword();
//     });

//     // Funciones de validación de campos
//     function validateName() {
//       if (name.value.length < 3) {
//         name.setCustomValidity("El nombre debe tener al menos 3 caracteres");
//       } else {
//         name.setCustomValidity("");
//       }
//     }

//     function validateLastname() {
//       if (lastname.value.length < 3) {
//         lastname.setCustomValidity("El apellido debe tener al menos 3 caracteres");
//       } else {
//         lastname.setCustomValidity("");
//       }
//     }

//     function validateUsername() {
//       if (username.value.length < 3) {
//         username.setCustomValidity("El nombre de usuario debe tener al menos 3 caracteres");
//       } else {
//         username.setCustomValidity("");
//       }
//     }

//     function validateEmail() {
//       if (!/\S+@\S+\.\S+/.test(email.value)) {
//         email.setCustomValidity("Ingrese un correo electrónico válido");
//       } else {
//         email.setCustomValidity("");
//       }
//     }

//     function validatePassword() {
//       if (password.value.length < 8) {
//         password.setCustomValidity("La contraseña debe tener al menos 8 caracteres");
//       } else {
//         password.setCustomValidity("");
//       }
//     }

//     function validateConfirmPassword() {
//       if (confirmPassword.value !== password.value) {
//         confirmPassword.setCustomValidity("Las contraseñas no coinciden");
//       } else {
//         confirmPassword.setCustomValidity("");
//       }
//     }
//   })();


// Validar el formulario cuando se envía
document.getElementById("signup-form").addEventListener("submit", function (event) {
  // Detener el envío del formulario
  event.preventDefault();


  // Validar el formulario
  if (!this.checkValidity()) {
    event.stopPropagation();
    this.classList.add("was-validated");
    return;
  }

  // Crear objeto con los datos del formulario
  const formData = {
    name: document.getElementById("name").value.trim(),
    lastname: document.getElementById("lastname").value.trim(),
    username: document.getElementById("username").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value.trim(),
  };

  // Enviar formulario a la API
  fetch("http://localhost:8080/api/user/", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // Mostrar mensaje de éxito
      swal({
        text: "Registro exitoso!",
        type: "success"
      });
      // Reiniciar el formulario
      document.getElementById("signup-form").reset();
      document.getElementById("signup-form").classList.remove("was-validated");
    })
    .catch(function (error) {
      // console.log(error)
      // if (error.errorMessage.includes("duplicate")) {
      //   swal({
      //     text: "Usuario o email erroneos",
      //     type: "warning"
      //   })
      // } else {
        console.log(error);
        // Mostrar mensaje de error
        swal({
          text: "Ha ocurrido un error. Intente nuevamente.",
          type: "error",
          icon:"error"
        });
      // }

    });
});
