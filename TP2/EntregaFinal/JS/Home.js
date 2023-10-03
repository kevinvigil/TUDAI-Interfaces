const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");

abrir.addEventListener("click", () => {
    event.stopPropagation();
    nav.classList.add("visible");

});

window.onclick = function name(e) {
    nav.classList.remove("visible");
}
