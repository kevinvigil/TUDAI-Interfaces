const header = document.querySelector("header");
const logo = document.querySelector("header img");

document.addEventListener("scroll", () => {
  if (window.scrollY > 120) {
    header.classList.add("scroll");
    logo.classList.add("visible")
  }
  if (window.scrollY < 120) {
    header.classList.remove("scroll");
    logo.classList.remove("visible");
  }
});

const duendeVerde = document.querySelector("#img-duende");
window.addEventListener("scroll", function () {
  const pos = duendeVerde.getBoundingClientRect(); 
  const desplazamiento = window.scrollY;
  console.log(pos)
  if (pos.top < window.innerHeight && pos.bottom > 0) {
    duendeVerde.style.transform = `translateY(${
      (desplazamiento - pos.top) * -0.03
    }px)`;
  }
});

document.addEventListener("scroll", () => {
  function clean() {
    document.querySelectorAll(".img").forEach((s) => {
      s.classList.remove("mostrar");
    });
    document.querySelectorAll(".texto").forEach((s) => {
      s.classList.remove("mostrar");
    });
  }
  if (window.scrollY < 4080) {
    clean();
    document.querySelector("#img1").classList.add("mostrar");
    document.querySelector("#text1").classList.add("mostrar");
  }
  if (window.scrollY > 4080 && window.screenY < 4450) {
    clean();
    document.querySelector("#img2").classList.add("mostrar");
    document.querySelector("#text2").classList.add("mostrar");
  }
  if (window.scrollY > 4450 && window.screenY < 4950) {
    clean();
    document.querySelector("#img3").classList.add("mostrar");
    document.querySelector("#text3").classList.add("mostrar");
  }
  if (window.scrollY > 4950) {
    clean();
    document.querySelector("#img4").classList.add("mostrar");
    document.querySelector("#text4").classList.add("mostrar");
  }
});