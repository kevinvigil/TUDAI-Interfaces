window.onload

const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");

const envarAmigos= document.querySelector("#envarAmigos");
const compartir= document.querySelector("#compartirr");

const irAPagar= document.querySelector("#irAPagar");
const iconoCarrito= document.querySelector("#iconoCarrito");

compartir.addEventListener("click", () => {
    event.stopPropagation();
    envarAmigos.classList.add("visible");
});

abrir.addEventListener("click", () => {
    event.stopPropagation();
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
    envarAmigos.classList.remove("visible");
}
