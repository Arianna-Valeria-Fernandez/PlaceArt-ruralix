document.getElementById('followers').innerText = followers;
 document.getElementById('following').innerText = following;
 document.getElementById('posts').innerText = posts;
    likeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const likeCount = event.target.nextElementSibling;
            let count = parseInt(likeCount.textContent);
            if (button.classList.toggle('liked')) {
                count++;
            } else {
                count--;
            }
            likeCount.textContent = count;
        });
    });
    commentButtons.forEach(button => {
        button.addEventListener('click', () => {
            const comment = prompt("Escribe tu comentario:");
            if (comment) {
                alert(`Comentario agregado: ${comment}`);
                // Aquí puedes agregar la lógica para mostrar el comentario en la publicación
            }
        });
    });


