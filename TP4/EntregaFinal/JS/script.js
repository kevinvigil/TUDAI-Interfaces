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

const section4 = document.querySelector("#ghostspider");
const c1 = document.querySelector("#race1");
const c2 = document.querySelector("#race2");
const c3 = document.querySelector("#race3");
window.addEventListener("scroll", function () {
  const pos = section4.getBoundingClientRect(); //devuelve la posicion
  const desplazamiento = window.scrollY;
  if (pos.top < window.innerHeight && pos.bottom > 0) {
    c1.style.transform = `translateY(${
      (desplazamiento - pos.top) * 0.03
    }px) rotate(-13.078deg)`;
    c2.style.transform = `translateY(${
      (desplazamiento - pos.top) * 0.03
    }px) rotate(-26.474deg)`;
    c3.style.transform = `translateY(${
      (desplazamiento - pos.top) * 0.01
    }px) rotate(-36.016deg)`;
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