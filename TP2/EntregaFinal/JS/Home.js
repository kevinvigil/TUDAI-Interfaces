const nav = document.querySelector("#nav");
const body = document.querySelector("#body");
const abrir = document.querySelector("#abrir");
j = false;

abrir.addEventListener("click", () => {
    event.stopPropagation();
    nav.classList.add("visible");

});

window.onclick = function name(e) {
    nav.classList.remove("visible");
}
