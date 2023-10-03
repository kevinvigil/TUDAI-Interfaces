
const carga = document.querySelector("#cargando");
const pantalla = document.querySelector("#pantalla-carga");
const numero = document.querySelector("#numero");

carga.addEventListener("click", () => {
        pantalla.classList.add("visible");
        event.preventDefault();
        
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
        }, 5000);
    
    }
    
)