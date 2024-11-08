function iniciarSesion() {
    // Obtener el valor del correo electrónico y la contraseña
    var email = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    // Verificar si ambos campos están completos
    if (email && password) {
        // Si ambos campos están llenos, redirigir a la página de destino
        window.location.href = './inicio-placeart/html/prueba.html'; 
    } else {
        // Si alguno de los campos está vacío, mostrar una alerta
        alert("Por favor, completa tanto el correo electrónico como la contraseña.");
    }
}


 // Función para la validación al hacer clic en "Crear cuenta" dentro del modal
 function crearCuenta() {
    // Obtener los valores de los campos de correo electrónico y contraseña
    var email = document.getElementById('new-email').value;
    var password = document.getElementById('new-password').value;
    
    // Verificar si ambos campos están completos
    if (email && password) {
        // Si ambos campos están llenos, redirigir a la página de destino (ajusta la URL según necesites)
        window.location.href = './inicio-placeart/html/prueba.html'; 
    } else {
        // Si alguno de los campos está vacío, mostrar una alerta
        alert("Por favor, completa tanto el correo electrónico como la contraseña.");
    }
}