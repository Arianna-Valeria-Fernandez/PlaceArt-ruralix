let mediaUrls = [];
let mediaTypes = [];

// Cargar las publicaciones guardadas en el localStorage
window.addEventListener('load', function() {
    cargarPublicaciones();
});

// Cargar las publicaciones del localStorage
function cargarPublicaciones() {
    const publicacionesLista = document.getElementById('publicaciones-lista');
    const publicaciones = JSON.parse(localStorage.getItem('publicaciones')) || [];

    publicaciones.forEach(publicacion => {
        const nuevaPublicacion = document.createElement('article');
        nuevaPublicacion.classList.add('publicacion', 'p-3', 'mb-3');
        nuevaPublicacion.style.backgroundColor = 'rgba(210, 180, 140, 0.5)';
        nuevaPublicacion.style.border = '2px solid white'; // Bordes blancos

        let mediaContent = publicacion.mediaUrls.map((url, index) => {
            return publicacion.mediaTypes[index].startsWith('image/') ? 
                `<img src="${url}" class="img-fluid" alt="Media subida">` : 
                `<video controls class="img-fluid"><source src="${url}" type="${publicacion.mediaTypes[index]}">Tu navegador no soporta video.</video>`;
        }).join('');

        nuevaPublicacion.innerHTML = `
            <h3>Usuario</h3>
            <p>${publicacion.texto}</p>
            ${mediaContent}
            <footer>
                <span>${publicacion.fecha}</span>
                <button class="me-gusta-btn btn btn-link" data-id="${publicacion.id}">
                    <i class="fas fa-heart" style="color: red;"></i>
                    <span class="me-gusta-count">${publicacion.meGustaCount}</span>
                </button>
                <button class="responder-btn btn btn-link" data-id="${publicacion.id}">
                    <i class="fas fa-comment-dots"></i> Responder
                </button>
                ${publicacion.mediaUrls.length > 0 ? 
                `<button class="descargar-btn btn btn-link" data-url="${publicacion.mediaUrls.join(',')}">
                    <i class="fas fa-download"></i> Descargar
                </button>
                <button class="compartir-btn btn btn-link" data-url="${publicacion.mediaUrls.join(',')}">
                    <i class="fas fa-share-alt"></i> Compartir
                </button>` : ''}
                <button class="editar-publicacion-btn btn btn-link" data-id="${publicacion.id}">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="eliminar-publicacion-btn btn btn-link" data-id="${publicacion.id}">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
                <div class="comentarios"></div>
            </footer>
        `;

        publicacionesLista.prepend(nuevaPublicacion);

        // Agregar eventos a los botones de la publicación
        agregarEventListeners(nuevaPublicacion, publicacion.id, publicacion.meGustaCount);
    });
}

document.getElementById('media-input').addEventListener('change', function() {
    const files = this.files;
    const mediaPreview = document.getElementById('media-preview');
    mediaPreview.innerHTML = ''; // Limpiar vista previa anterior
    mediaUrls = []; // Reiniciar la lista de URLs
    mediaTypes = []; // Reiniciar la lista de tipos

    for (let i = 0; i < files.length && i < 2; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = function(e) {
            mediaUrls.push(e.target.result);
            mediaTypes.push(file.type);

            if (file.type.startsWith('image/')) {
                mediaPreview.innerHTML += `<img src="${e.target.result}" class="img-fluid" alt="Imagen subida">`;
            } else if (file.type.startsWith('video/')) {
                mediaPreview.innerHTML += `<video controls class="img-fluid"><source src="${e.target.result}" type="${file.type}">Tu navegador no soporta video.</video>`;
            }
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('publicar-btn').addEventListener('click', function() {
    const textoPublicacion = document.getElementById('publicacion-texto').value;
    if (textoPublicacion.trim() !== '' || mediaUrls.length > 0) {
        const publicacionesLista = document.getElementById('publicaciones-lista');
        const nuevaPublicacion = document.createElement('article');
        nuevaPublicacion.classList.add('publicacion', 'p-3', 'mb-3');
        
        const publicacionId = Date.now();
        let meGustaCount = 0;
        const fecha = new Date().toLocaleString();

        nuevaPublicacion.style.backgroundColor = 'rgba(210, 180, 140, 0.5)';
        nuevaPublicacion.style.border = '2px solid white';

        const meGustaKey = `meGusta_${publicacionId}_${localStorage.getItem('usuarioId') || 'usuario1'}`;
        if (localStorage.getItem(meGustaKey)) {
            meGustaCount = 1; 
        }

        let mediaContent = mediaUrls.map((url, index) => {
            return mediaTypes[index].startsWith('image/') ? 
                `<img src="${url}" class="img-fluid" alt="Media subida">` : 
                `<video controls class="img-fluid"><source src="${url}" type="${mediaTypes[index]}">Tu navegador no soporta video.</video>`;
        }).join('');

        nuevaPublicacion.innerHTML = `
            <h3>Usuario</h3>
            <p>${textoPublicacion}</p>
            ${mediaContent}
            <footer>
                <span>${fecha}</span>
                <button class="me-gusta-btn btn btn-link" data-id="${publicacionId}">
                    <i class="fas fa-heart" style="color: red;"></i>
                    <span class="me-gusta-count">${meGustaCount}</span>
                </button>
                <button class="responder-btn btn btn-link" data-id="${publicacionId}">
                    <i class="fas fa-comment-dots"></i> Responder
                </button>
                ${mediaUrls.length > 0 ? 
                `<button class="descargar-btn btn btn-link" data-url="${mediaUrls.join(',')}">
                    <i class="fas fa-download"></i> Descargar
                </button>
                <button class="compartir-btn btn btn-link" data-url="${mediaUrls.join(',')}">
                    <i class="fas fa-share-alt"></i> Compartir
                </button>` : ''}
                <button class="editar-publicacion-btn btn btn-link" data-id="${publicacionId}">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="eliminar-publicacion-btn btn btn-link" data-id="${publicacionId}">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
                <div class="comentarios"></div>
            </footer>
        `;

        publicacionesLista.prepend(nuevaPublicacion);

        // Guardar publicación en el localStorage
        const publicaciones = JSON.parse(localStorage.getItem('publicaciones')) || [];
        publicaciones.push({
            id: publicacionId,
            texto: textoPublicacion,
            mediaUrls: mediaUrls,
            mediaTypes: mediaTypes,
            fecha: fecha,
            meGustaCount: meGustaCount
        });
        localStorage.setItem('publicaciones', JSON.stringify(publicaciones));

        // Limpiar los campos de entrada
        document.getElementById('publicacion-texto').value = ''; 
        mediaUrls = []; 
        mediaTypes = []; 
        document.getElementById('media-preview').innerHTML = ''; 

        agregarEventListeners(nuevaPublicacion, publicacionId, meGustaCount);
    } else {
        alert('Por favor, escribe algo o sube una imagen/video antes de publicar.');
    }
});

// Función para agregar event listeners a los botones
function agregarEventListeners(nuevaPublicacion, publicacionId, meGustaCount) {
    nuevaPublicacion.querySelector('.me-gusta-btn').addEventListener('click', function() {
        const buttonId = this.getAttribute('data-id');
        const currentUserKey = `meGusta_${buttonId}_${localStorage.getItem('usuarioId') || 'usuario1'}`;

        if (!localStorage.getItem(currentUserKey)) {
            meGustaCount++;
            localStorage.setItem(currentUserKey, 'true');
        } else {
            meGustaCount--;
            localStorage.removeItem(currentUserKey);
        }
        nuevaPublicacion.querySelector('.me-gusta-count').innerText = meGustaCount;

        // Actualizar el localStorage con el nuevo número de "me gusta"
        let publicaciones = JSON.parse(localStorage.getItem('publicaciones'));
        publicaciones = publicaciones.map(publicacion => {
            if (publicacion.id == publicacionId) {
                publicacion.meGustaCount = meGustaCount;
            }
            return publicacion;
        });
        localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
    });

    nuevaPublicacion.querySelector('.responder-btn').addEventListener('click', function() {
        const modal = $('#modal-comentario');
        modal.modal('show');
        const publicacionId = this.getAttribute('data-id');
        modal.attr('data-id', publicacionId);
    });

    nuevaPublicacion.querySelector('.eliminar-publicacion-btn').addEventListener('click', function() {
        const confirmacion = confirm('¿Estás seguro de eliminar esta publicación?');
        if (confirmacion) {
            nuevaPublicacion.remove();

            // Eliminar la publicación del localStorage
            let publicaciones = JSON.parse(localStorage.getItem('publicaciones'));
            publicaciones = publicaciones.filter(publicacion => publicacion.id != publicacionId);
            localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
        }
    });

    nuevaPublicacion.querySelector('.editar-publicacion-btn').addEventListener('click', function() {
        const textoActual = nuevaPublicacion.querySelector('p').innerText;
        const nuevoTexto = prompt('Edita tu publicación:', textoActual);
        if (nuevoTexto !== null && nuevoTexto.trim() !== '') {
            nuevaPublicacion.querySelector('p').innerText = nuevoTexto;

            // Actualizar el texto en el localStorage
            let publicaciones = JSON.parse(localStorage.getItem('publicaciones'));
            publicaciones = publicaciones.map(publicacion => {
                if (publicacion.id == publicacionId) {
                    publicacion.texto = nuevoTexto;
                }
                return publicacion;
            });
            localStorage.setItem('publicaciones', JSON.stringify(publicaciones));
        }
    });
}
