const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
let flechaIzq = document.querySelectorAll("img.flechaIzq");
let flechaDer = document.querySelectorAll("img.flechaDer");
let carrucel = document.querySelector(".carrucel");

abrir.addEventListener("click", () => {
    event.stopPropagation();
    nav.classList.add("visible");

});

window.onclick = function name(e) {
    nav.classList.remove("visible");
}

function carrucelMove(cant){
    flechaDer.forEach(f => {
        f.addEventListener('click', function(params) {
            f.previousElementSibling.scrollLeft += cant;
        })
    })

    flechaIzq.forEach(f => {
        f.addEventListener('click', function(params) {
            f.nextElementSibling.scrollLeft -=cant;
        })
    })

}
if(window.innerWidth < 400){
    carrucelMove(200);
} else {
    carrucelMove(350);
}
