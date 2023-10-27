class Game{
    constructor(canvas, size, imgj1, imgj2){
        this.size = size;
        this.imgj1 = imgj1;
        this.imgj2 = imgj2;
        this.canvas = canvas;
        this.context = canvas.getContext('2d', this.size);
        this.board = new Board(this.context, this.size);
        this.player1 = new Player(this.context, 'Jugador 1', 1);
        this.player2 = new Player (this.context, 'Jugador 2', 2);
        this.tokens = [];
        this.turn = 1;
        this.currentToken = null;
        this.initialPositionX;
        this.initialPositionY;
        this.clickedToken = false;
        this.finishedGame = false;
        this.totalTokens = 42;
        this.drawInitialTokens();
        this.startGame();
    }

    drawInitialTokens(){
        let InitialPosXJ1 = 10
        let InitialPosXJ2 = 860
        this.drawPlayerToken(InitialPosXJ1, 'p', this.player1, this.imgj1);
        this.drawPlayerToken(InitialPosXJ2, 'p', this.player2, this.imgj2);
    }

    drawPlayerToken(x, param, jugador, img) {
        let diferenciaX = 56;
        let diferenciaY = (600/12);
        let fxInit = x+diferenciaX-25;
        let fy = 600-25;
        let contador = 0;
        let fila = 0;
        let column;
        while (contador<((this.size+2)*(this.size+1)/2) && fila<12) {
            let fx = fxInit;
            column = 0;
            while (contador<(((this.size+2)*(this.size+1))/2) && column<4) {
                let token = new Token(fx, fy, param, jugador, img);
                token.setContext(this.context)
                this.tokens.push(token)
                fx += diferenciaX;
                column++;
                contador++;
            }
            fy -= diferenciaY;
            fila++
        }
    }

    startGame() {
        this.board.drawBoard();       
    }

    prepareGame(){        
        this.board.drawBoard();       
        this.setTokens();
        // this.checkCurrentTurn();
    }

    setTokens() {
        for (let i = 0; i < this.tokens.length; i++){
            this.tokens[i].draw();
        }
    }

    // checkCurrentTurn() {
    //     if (this.turn === 1){
    //         document.querySelector('#J1').classList.add('current-shift');
    //         document.querySelector('#J2').classList.remove('current-shift');
    //     }
    //     else if(this.turn === 2) {
    //         document.querySelector('#J2').classList.add('current-shift');
    //         document.querySelector('#J1').classList.remove('current-shift');
    //     }
    //     else{
    //         document.querySelector('#J1').classList.remove('current-shift');
    //         document.querySelector('#J2').classList.remove('current-shift');
    //     }
    // }

    isClickedToken(x, y) {       
        for (let i=0; i<this.tokens.length; i++) {
                let fichaTmp = this.tokens[i];
            if (fichaTmp.isClicked(x, y) && fichaTmp.getPlayer() === this.turn && fichaTmp.getStatus() !== 'inactiva' && !this.finishedGame) {
                this.currentToken = fichaTmp;
                this.clickedToken = true;
                this.tokens.splice(i,1);     
                this.initialPositionX = this.currentToken.x;
                this.initialPositionY = this.currentToken.y;    
                return true;
            }                
        }
    }

    haveClickedToken() {
        return this.clickedToken;
    }

    moveToken(x, y) {
        this.currentToken.x = x;
        this.currentToken.y = y;
        this.tokens.push(this.currentToken);
        this.prepareGame();
    }

    resetclickedToken() {
        this.currentToken = null;
        this.clickedToken = false;
    }

    insertToken(x, y){

        if(this.board.couldInsertToken(x, y, this.currentToken)){
            this.totalTokens--;
            if (this.isWinner()) {
                let winnerMessage = document.getElementById('winner-info');
                if(this.turn === 1)
                    winnerMessage.innerHTML = 'Winner PLAYER 1';
                else
                    winnerMessage.innerHTML = 'Winner PLAYER 2';
                winnerMessage.classList.remove('hide');
                this.finishedGame = true;
            }
            else if(this.totalTokens === 0){
                this.finishedGame = true;
                let alert = document.getElementById('draw-info');
                alert.classList.remove('hide');
            }
            else
                this.turn = (this.turn === 1) ? 2:1;
        }
        else{
            this.currentToken.x = this.initialPositionX;
            this.currentToken.y = this.initialPositionY;
            this.tokens.push(this.currentToken);
        }
        this.resetclickedToken();
        this.prepareGame();
    }

    isWinner(){
        let isWinner = false;
        if(this.board.checkVertical() || this.board.checkHorizontal() /*||
        this.board.checkHorizontal() || this.board.checkDiagonal()*/) 
            isWinner = true;
        return isWinner;
    }
}