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