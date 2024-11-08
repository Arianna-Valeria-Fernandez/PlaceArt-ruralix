// Variables para controlar el estado del carrusel
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-item");
const totalSlides = slides.length;

// Mover el carrusel automáticamente cada 3 segundos
let autoSlide = setInterval(() => {
  moveSlide(1);
}, 3000); // Cambia de slide cada 3 segundos

// Función para mover el carrusel
function moveSlide(step) {
  currentSlide += step;

  // Aseguramos que el índice no se salga del rango de los slides
  if (currentSlide >= totalSlides) {
    currentSlide = 0;
  } else if (currentSlide < 0) {
    currentSlide = totalSlides - 1;
  }

  // Cambiamos la posición del carrusel
  const carousel = document.querySelector(".carousel");
  carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  // Reiniciar el temporizador si el usuario usa las flechas manualmente
  clearInterval(autoSlide);
  autoSlide = setInterval(() => {
    moveSlide(1);
  }, 3000);
}

// Inicializamos el carrusel con la primera imagen visible
moveSlide(0);





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



