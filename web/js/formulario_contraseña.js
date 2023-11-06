function iniciarSesion() {
    var usuario = document.getElementById("usuario").value;
    var contrasena = document.getElementById("contrasena").value;

    // Aquí puedes agregar tu lógica de autenticación

    if (usuario === "admin" && contrasena === "password") {
        window.location.href = "envivo.html";
    } else {
        alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    }
}
