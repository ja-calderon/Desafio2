var formulario = document.getElementById("formulario");
var inputs = document.querySelectorAll("#formulario input");
var palabra = false;
var palabras = ["AMARILLO", "VERDE", "OCEANO", "CIELO", "RELOJ", "NUBE"];
var palabra_random;
var totaldeletras;
var divisiones;
var contenedordeletras = document.getElementById("contenedordeletras");
var letrasutilizada;
var contenedorletrasutilizadas = [];
var letrasacertadas;
const input = document.querySelector("#contenedorusadas input");
const juego = document.querySelector("#juego");
var log;
var fallidas = 0;
var pizarra = document.querySelector("canvas");
var pincel = pizarra.getContext("2d");
document.getElementById("inicio").style.display = "";
document.getElementById("carga").style.display = "none";
document.getElementById("juego").style.display = "none";

function escribir(texto){
  document.getElementById('mensajeJuego').innerHTML = texto;
}

function dibujarlinea(x, y, largo, alto, color) {
  pincel.fillStyle = color;
  pincel.fillRect(x, y, largo, alto);
}

function dibujarhorca() {
  dibujarlinea(450, 750, 100, 10, "#0A3871");
  dibujarlinea(550, 750, 100, 10, "#0A3871");
  dibujarlinea(650, 750, 100, 10, "#0A3871");
  dibujarlinea(600, 250, 10, 100, "#0A3871");
  dibujarlinea(600, 350, 10, 100, "#0A3871");
  dibujarlinea(600, 450, 10, 100, "#0A3871");
  dibujarlinea(600, 550, 10, 100, "#0A3871");
  dibujarlinea(600, 650, 10, 100, "#0A3871");
  dibujarlinea(600, 100, 10, 150, "#0A3871");
  dibujarlinea(600, 100, 100, 10, "#0A3871");
  dibujarlinea(700, 100, 100, 10, "#0A3871");
  dibujarlinea(795, 100, 10, 100, "#0A3871");
}
function dibujarcirculo() {
  pincel.fillStyle = "#0A3871";
  pincel.beginPath();
  pincel.arc(800, 225, 40, 0, 2 * 3.14);
  pincel.fill();
}
function dibujarcuerpo() {
  dibujarlinea(795, 260, 10, 150, "#0A3871");
}
function dibujarextremidades(mx, my, lx, ly, colorlinea) {
  pincel.beginPath();
  pincel.strokeStyle = colorlinea;
  pincel.lineWidth = 10;
  pincel.moveTo(mx, my);
  pincel.lineTo(lx, ly);
  pincel.stroke();
}

function sorteo() {
  var orden_randon = Math.floor(Math.random() * palabras.length);
  palabra_random = palabras[orden_randon];
  console.log(palabra_random);
}

function largo(sorteo) {
  totaldeletras = palabra_random.length;
  console.log("la palabra tiene " + totaldeletras + " caracteres");
}

function dividirPalabra(sorteo, largo) {
  divisiones = palabra_random.split("", totaldeletras);
  console.log("las letras son: " + divisiones);
}
const palabraenjuego = () => {
  divisiones.forEach((caracter) => {
    const letra = document.createElement("span");
    letra.innerHTML = caracter;
    letra.classList.add("letra");
    letra.classList.add("oculta");
    contenedordeletras.appendChild(letra);
  });
};
function controlaciertos() {
  if (divisiones.length === letrasacertadas) {
    input.removeEventListener("input", guardar);
    input.classList.add("invisible");
    input.disabled = true;
    document.getElementById('mensajeJuego').classList.add('grupocorrecto');
    escribir("Ganaste, Felicidades!");
  }
}
function letracorrecta() {
  var letrascorrectas = document.querySelectorAll("#contenedordeletras > span");
  for (var i = 0; i < letrascorrectas.length; i++) {
    if (letrascorrectas[i].innerHTML === letrasutilizada) {
      console.log(
        letrascorrectas[i].tagName + " " + letrascorrectas[i].textContent
      );
      letrascorrectas[i].classList.toggle("visible");
      letrasacertadas++;
    }
  }
  controlaciertos();
}

function mostrarcontenedor() {
  document.getElementById("letrasusadas").innerHTML =
    contenedorletrasutilizadas;
}

input.addEventListener("input", guardar);

function guardar(e) {
  letrasutilizada = e.srcElement.value.toUpperCase();
  console.log("letras utilizada es " + letrasutilizada);
  document.querySelector("#contenedorusadas input").value = "";
  validacionletra(letrasutilizada);
}

function agregarletra() {
  contenedorletrasutilizadas.push(letrasutilizada);
  if (divisiones.includes(letrasutilizada)) {
    letracorrecta();
    console.log(
      "la letra " + letrasutilizada + " es parte de la palabra secreta"
    );
    mostrarcontenedor();
    letrasutilizada = "";
  } else {
    mostrarcontenedor();

    switch (fallidas) {
      case 0:
        dibujarhorca();
        fallidas++;
        console.log("1 fallida" + fallidas);
        break;
      case 1:
        console.log("2 fallida");
        dibujarcirculo();
        fallidas++;
        break;
      case 2:
        console.log("3 fallida");
        dibujarcuerpo();
        fallidas++;
        break;
      case 3:
        console.log("4 fallida");
        dibujarextremidades(800, 300, 700, 350, "#0A3871");
        fallidas++;
        break;
      case 4:
        console.log("5 fallida");
        dibujarextremidades(800, 300, 900, 350, "#0A3871");
        fallidas++;
        break;
      case 5:
        console.log("6 fallida");
        dibujarextremidades(800, 400, 700, 475, "#0A3871");
        fallidas++;
        break;
      case 6:
        console.log("6 fallida");
        dibujarextremidades(800, 400, 900, 475, "#0A3871");
        fallidas++;
        break;
      case 7:
        document.getElementById('mensajeJuego').classList.add('grupoincorrecto');
        escribir('Ud perdio');  
        fallidas = 8;
        input.disabled = true;
        desistir();
        break;
      default:
        fallidas = 0;
        dibujarhorca();
        break;
    }
  }
}

function validacionletra(letrasutilizada) {
  if (
    /^[A-ZÑ]$/.test(letrasutilizada) &&
    !contenedorletrasutilizadas.includes(letrasutilizada)
  ) {
    console.log("letra autorizada");
    agregarletra();
  } else {
    alert(letrasutilizada + " ya fue utilizada o no es una letra");
    juego.addEventListener("click", function () {
      document.getElementById("inputjuego").focus();
    });
  }
}
const validarFormulario = (e) => {
  var palabraevaluada = e.target.value;
  if (/^[A-Z]{1,8}$/.test(palabraevaluada)) {
    document.getElementById("grupoinput").classList.remove("grupoincorrecto");
    document.getElementById("grupoinput").classList.add("grupocorrecto");
    document
      .querySelector(".formulario-grupoinput i")
      .classList.add("fa-check-circle");
    document
      .querySelector(".formulario-grupoinput i")
      .classList.remove("fa-times-circle");
    document
      .querySelector(".formulario-error")
      .classList.remove("formulario-error-activo");
    palabra = true;
  } else {
    document.getElementById("grupoinput").classList.add("grupoincorrecto");
    document.getElementById("grupoinput").classList.remove("grupocorrecto");
    document
      .querySelector(".formulario-grupoinput i")
      .classList.add("fa-times-circle");
    document
      .querySelector(".formulario-grupoinput i")
      .classList.remove("fa-check-circle");
    document
      .querySelector(".formulario-error")
      .classList.add("formulario-error-activo");
    palabra = false;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
});
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  contenedordeletras.innerHTML = "";
  if (palabra) {
    palabras.push(entrada.value);
    console.log(palabras);
    document.getElementById("carga").style.display = "none";
    iniciojuego(palabras);
  } else {
    alert("Utilice solo Mayusculas (Max. 8 dígitos)");
  }
});
function iniciojuego(palabras) {
  fallidas = 0;
  document.getElementById('mensajeJuego').classList.remove('grupoincorrecto');
  document.getElementById('mensajeJuego').classList.remove('grupocorrecto');
  pincel.clearRect(0, 0, pizarra.width, pizarra.height);
  input.disabled = false;
  formulario.removeEventListener("keyup", validarFormulario);
  document.getElementById("inicio").style.display = "none";
  document.getElementById("juego").style.display = "";
  letrasacertadas = 0;
  contenedorletrasutilizadas = [];
  letrasusadas.innerHTML = "";
  contenedordeletras.innerHTML = "";
  document.getElementById("inputjuego").value = "";
  sorteo();
  largo();
  dividirPalabra();
  palabraenjuego();
  document
    .querySelector("#contenedorusadas input")
    .classList.remove("invisible");
  input.addEventListener("input", guardar);
  document.getElementById("inputjuego").focus();
  escribir('');
}
function desistir() {
  var letrascorrectas = document.querySelectorAll("#contenedordeletras > span");
  for (var i = 0; i < letrascorrectas.length; i++) {
    letrascorrectas[i].classList.add("visible");
    document
      .querySelector("#contenedorusadas input")
      .classList.add("invisible");
  }
}
function botonagregarpalabra() {
  document.getElementById("inicio").style.display = "none";
  document.getElementById("carga").style.display = "";
  document.querySelector("#formulario").reset();
}
function botoncancelar() {
  document.getElementById("inicio").style.display = "";
  document.getElementById("juego").style.display = "none";
  document.getElementById("carga").style.display = "none";
}
