class Game{
    constructor(canvas, size, imgj1, imgj2){
        this.canvas = canvas;
        this.size = size;
        this.imgj1 = imgj1;
        this.imgj2 = imgj2;
        this.context = canvas.getContext('2d');
        this.board = new Board(this.context, this.size);
        this.player1 = new Player(this.context, 'MESSI', 1);
        this.player2 = new Player (this.context, 'RONALDO', 2);
        this.tokens = [];
        this.turn = Math.floor(Math.random() * 2) + 1;;
        this.currentToken = null;
        this.initialPositionX;
        this.initialPositionY;
        this.clickedToken = false;
        this.finishedGame = false;
        this.totalTokens = (this.size+2)*(this.size+1);
        this.drawInitialTokens();
        this.startGame();
    }

    drawInitialTokens(){
        let InitialPosXJ1 = 40
        let InitialPosXJ2 = 1050
        this.drawPlayerToken(InitialPosXJ1, 'p', this.player1, this.imgj1);
        this.drawPlayerToken(InitialPosXJ2, 'p', this.player2, this.imgj2);
    }

    drawPlayerToken(x, param, jugador, img) {
        let diferenciaX = 70;
        let diferenciaY = (750/12);
        let fxInit = x+diferenciaX-25;
        let fy = 750-25;
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
    }

    setTokens() {
        for (let i = 0; i < this.tokens.length; i++){
            this.tokens[i].draw();
        }
    }

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
            let winnerMessage = document.querySelector('#ganador');
            if (this.isWinner()) {
                if(this.turn === 1){
                    winnerMessage.classList.remove("noVisible");
                    winnerMessage.innerHTML = "<h1> The Winner is MESSI </h1>";
                } else {
                    winnerMessage.classList.remove("noVisible");
                    winnerMessage.innerHTML = "<h1> The Winner is RONALDO </h1>";
                }
                this.finishedGame = true;
            }
            else if(this.totalTokens === 0){
                this.finishedGame = true;
                winnerMessage.classList.remove("noVisible");
                winnerMessage.innerHTML = "<h1> It is a TIE </h1>";
                return true;
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
        return this.isWinner();
    }

    isWinner(){
        let isWinner = false;
        if(this.board.checkVertical() || this.board.checkHorizontal() || this.board.checkDiagonal()) 
            isWinner = true;
        return isWinner;
    }

    

}

