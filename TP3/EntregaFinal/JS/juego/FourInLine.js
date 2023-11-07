document.addEventListener("DOMContentLoaded", function(event) {

    const canvas = document.querySelector('#board');
    const form = document.querySelector('#formGame');
    const startGame = document.querySelector('#start-game');
    const timer = document.querySelector('#timer');
    const restart = document.querySelector('#Restart-game');
    const winnerMessage = document.querySelector('#ganador');
    let totalTime;
    let interval;
    
    let game = new Game(canvas, 4);

    const playGame = ()  => {
        cutInterval(interval);
        let Messi = document.getElementsByName('Messi');
        Messi.forEach(e => {
            if (e.checked) {
                Messi = e.value;
                
            }
        })

        let Ronaldo = document.getElementsByName('Ronaldo');
        Ronaldo.forEach(e => {
            if (e.checked) {
                Ronaldo = e.value;
            }
        })

        let size = document.getElementsByName('Cantidad');
        size.forEach(e => {
            if (e.checked) {
                size = Number(e.value) 
            }
        })
        if (!winnerMessage.classList.contains("noVisible")) {
            winnerMessage.classList.add("noVisible")
        }
        if (timer.classList.contains("noVisible")) {
            timer.classList.remove("noVisible")
        }
        form.classList.add("noVisible");
        restart.classList.remove("noVisible")
        game = new Game(canvas, size, Messi, Ronaldo);
        game.prepareGame();
        totalTime = 5 * 60;
        interval = setInterval(countDown, 1000);
    }

    const restartGame = e => {
        cutInterval(interval);
        restart.classList.add("noVisible");
        form.classList.remove("noVisible")
    }
    const onMouseDown = e => {
        let x = e.layerX - e.currentTarget.offsetLeft;
        let y = e.layerY - e.currentTarget.offsetTop;            
        game.isClickedToken(x, y);
    }
    const onMouseMove = e => {
        let x = e.layerX - e.currentTarget.offsetLeft;
        let y = e.layerY - e.currentTarget.offsetTop;   
        if (game.haveClickedToken() && totalTime > 0)
            game.moveToken(x, y);
    }
    const onMouseUp = e => {
        let x = e.layerX - e.currentTarget.offsetLeft;
        let y = e.layerY - e.currentTarget.offsetTop;
        if (game.haveClickedToken()){
            if (game.insertToken(x,y)) {
                timer.classList.add("noVisible")
                cutInterval();
            }
              
        }
    }
    
    restart.addEventListener('click', restartGame, false);
    startGame.addEventListener('click', playGame, false);
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mousemove', onMouseMove, false);
    canvas.addEventListener('mouseup', onMouseUp, false);

    function empate () {
        winnerMessage.classList.remove("noVisible");
        winnerMessage.innerHTML = "<h1> It is a TIE </h1>";
    }

    function countDown() {
        let minutes = Math.floor(totalTime/60);
        let seconds = totalTime % 60;

        seconds = seconds < 10 ? '0'+seconds :seconds;
        timer.innerHTML=`${minutes}:${seconds}`;
        totalTime--;

        console.log("pase");
        if (totalTime < 0) {
            clearInterval(interval);
            empate();
        }
    }

    function cutInterval(){
        clearInterval(interval);
    }

});

