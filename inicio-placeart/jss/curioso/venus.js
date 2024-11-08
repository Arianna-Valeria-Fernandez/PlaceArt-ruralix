
// Seleccionamos la imagen de perfil y el menú de opciones
const profileImagen = document.getElementById("profileImagen");
const profileOptions = document.getElementById("profileOptions");

// Evento de clic para mostrar u ocultar el menú de opciones
profileImage.addEventListener("click", () => {
  // Alternar la clase 'active' para mostrar/ocultar el menú
  profileOptions.classList.toggle("active");
});

// Opcional: Cerrar el menú si se hace clic fuera de la imagen de perfil
document.addEventListener("click", (event) => {
  if (!profileImage.contains(event.target) && !profileOptions.contains(event.target)) {
    profileOptions.classList.remove("active");
  }
});
