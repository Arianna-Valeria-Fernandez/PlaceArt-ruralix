//importar firebase
import './firebase.js';
import { auth } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
// INICIAR SESION CON GOOGLE 

let google = document.getElementById("google");
google.addEventListener("click", function () {

    const provier = new GoogleAuthProvider();

    signInWithPopup(auth, provier)
        .then((result) => {
            // Colocar que es lo que quieres que haga cuando inicias sesion
            console.log("iniciaste con Google");
            window.location.href = "inicio-placeart/html/prueba.html";

        })
        .catch((error) => {
            // En caso haya error, se muestra por la consola
            console.log(error);
        })
})