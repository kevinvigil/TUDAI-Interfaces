let carga = document.querySelectorAll(".cargando");
const pantalla = document.querySelector("#pantalla-carga");
const load = document.querySelector("#girando")
const numero = document.querySelector("#numero");
    


carga.forEach(c => {
    c.addEventListener('click', function loading() {
        load.classList.add("start")
        pantalla.classList.add("visible");
            
        let catidad = 0;
        let tiempo = setInterval(() => {
            catidad += 1;
            console.log(numero)
            if (numero) {
                numero.textContent=catidad;
            }
            if (catidad === 100) {
                clearInterval(tiempo);
            }
        }, 50)
    
        setTimeout(function goHome() {
            location.href="Home.html"
            load.classList.remove("start")
        }, 5000);
    }
    )
})