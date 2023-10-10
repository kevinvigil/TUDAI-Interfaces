window.onload

const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");

const envarAmigos= document.querySelector("#envarAmigos");
const compartir= document.querySelector("#compartir");

const irAPagar= document.querySelector("#irAPagar");
const iconoCarrito= document.querySelector("#iconoCarrito");

envarAmigos.addEventListener("click", () => {
    compartir.classList.add("visible");
});

abrir.addEventListener("click", () => {
    nav.classList.add("visible");

});

iconoCarrito.addEventListener('click', () => {
    event.stopPropagation();
    if (irAPagar.classList.contains("visible")) {
        irAPagar.classList.remove("visible");
    } else {
        irAPagar.classList.add("visible");
    }
});

window.onclick = function name(e) {
    nav.classList.remove("visible");
    irAPagar.classList.remove("visible");
    compartir.classList.remove("visible");
}
