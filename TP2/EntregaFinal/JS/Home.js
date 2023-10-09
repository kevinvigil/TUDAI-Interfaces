const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");

const precio = document.querySelectorAll("main section div ul li div.precioJuego")

const irAPagar= document.querySelector("#irAPagar");
const iconoCarrito= document.querySelector("#iconoCarrito");

let flechaIzq = document.querySelectorAll("img.flechaIzq");
let flechaDer = document.querySelectorAll("img.flechaDer");
let carrucel = document.querySelector(".carrucel");


abrir.addEventListener("click", () => {
    event.stopPropagation();
    if (nav.classList.contains("visible")) {
        nav.classList.remove("visible");
    } else {
        nav.classList.add("visible");
    }
});

iconoCarrito.addEventListener("click", () => {
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
