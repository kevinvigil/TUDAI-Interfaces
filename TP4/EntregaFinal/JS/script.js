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

document.addEventListener("scroll", () => {
  function clean() {
    document.querySelectorAll(".imgS6").forEach((s) => {
      s.classList.remove("showImgS6");
    });
    document.querySelectorAll(".textosS6").forEach((s) => {
      s.classList.remove("showTextoS6");
    });
  }
  if (window.scrollY < 4080) {
    clean();
    document.querySelector("#imgS6-1").classList.add("showImgS6");
    document.querySelector("#textS6-1").classList.add("showTextoS6");
  }
  if (window.scrollY > 4080 && window.screenY < 4450) {
    clean();
    document.querySelector("#imgS6-2").classList.add("showImgS6");
    document.querySelector("#textS6-2").classList.add("showTextoS6");
  }
  if (window.scrollY > 4450 && window.screenY < 4950) {
    clean();
    document.querySelector("#imgS6-3").classList.add("showImgS6");
    document.querySelector("#textS6-3").classList.add("showTextoS6");
  }
  if (window.scrollY > 4950) {
    clean();
    document.querySelector("#imgS6-4").classList.add("showImgS6");
    document.querySelector("#textS6-4").classList.add("showTextoS6");
  }
});