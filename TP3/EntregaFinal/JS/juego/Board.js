class Board{

    constructor(context, size){
        this.size = size;
        this.context = context;
        this.slot = [];
        this.slotX = [];
        this.slotY = [];
        this.topY = 150;
        this.image = new Image();
        this.image.src = "../IMG/fichas/cancha.png";
        this.initSlot();
    }

    /**
     * Inicializa las posiciones de los tokens dentro del tablero de juego
     */
    initSlot() {
        let diferenciaX = (700-(this.size+2)*50)/(this.size+3) + 50;
        let diferenciaY = (600-(this.size+1)*50)/(this.size+2) + 50;
        let fxInit = 350+diferenciaX - 25
        let fy = 150+diferenciaY - 25
        for (let y = 0; y < this.size+1; y++) {
            let fx = fxInit;
            this.slot[fy+'-row'] = [];
            for (let x = 0; x < this.size+2; x++) {
                let token = new Token (fx, fy, 'slot', 0);
                token.setContext(this.context);  
                this.slot[fy+'-row'][fx+'-col'] = token;
                if (y === 0)
                    this.slotX.push(fx);
                fx += diferenciaX;
            }   
            this.slotY.push(fy);
            fy += diferenciaY;           
        }
    }
    
    /**
     * Dibuja la imajen de fondo, un marco y dibuja
     * los tokens del tablero 
     */
    drawBoard() {
        this.context.drawImage(this.image,0,0,1400,800);
        this.context.beginPath();
        this.context.rect(350, 150, 700, 600);
        this.context.stroke();
        for (let row = 0; row < this.slotX.length; row++) {
            for (let col = 0; col < this.slotY.length; col++) {
               let token = this.slot[this.slotY[col]+'-row'][this.slotX[row]+'-col'];
                token.draw();
            }   
        }
    }

    /**
     * Chequea que el espacio en el que se suelta el token sea apropiado
     */
    couldInsertToken(x, y, currentToken) {
        if (y < this.topY && x > 350 && x < 1050)
            return this.searchSlot(x, currentToken);
        return false;
    } 

    /**
     * Al slotar el token compara con que columna coincide 
     * y despues chequea en que fila
     */
    searchSlot(x, currentToken) {
        for(let i = 0; i < this.slotX.length; i++) {
            if (this.slotX[i] > x - 25 && this.slotX[i] < x + 25){
                return this.insertToken(this.slotX[i], currentToken);
            }                    
        };
        return false;
    }

    /**
     * Recive una posicion en x, con la misma y con el slotY recorre el slot hacia abajo chequeando 
     * si la matris en ese espacio posee una ficha correspondiente a un jugador. 
     * Al terminar si existe un lugar inserta el token en el lugar
     */
    insertToken(x, currentToken) {
        let posTmpY = -1;
        let couldInsert = false;        

        for (let y = 0; y < this.slotY.length; y++) {
            let tmpy = this.slotY[y];
            if (this.slot[tmpy+'-row'][x+'-col'].getPlayer() === 0){
                posTmpY = tmpy;
                couldInsert = true;
            }
        }
        if (posTmpY !== -1) {
            currentToken.setX(x);
            currentToken.setY(posTmpY);
            currentToken.setStatus('inactive');
            this.slot[posTmpY+'-row'][x+'-col'] = currentToken;
        }        
        return couldInsert;  
    }

    /**
     * Recorre todas las columnas chequeando si existen {size}
     * fichas de un jugador seguidas
     */
    checkVertical() {
        let count = 0;
        let player = -1;
        let isWinner = false;
        
        for (let col = 0; col < this.slotX.length; col++) {
            count = 0;
            for (let row = 0; row < this.slotY.length; row++) {
                let token = this.slot[this.slotY[row]+'-row'][this.slotX[col]+'-col'];
                let valor = token.getPlayer();
                if (valor === 0) {
                    count = 0;
                    player = -1;
                }
                else if (valor !== player){
                    player = valor;
                    count = 1;
                }
                else
                    count++;
                
                if (count === this.size){                    
                    isWinner = true;             
                    return isWinner;
                }                
            }
        }
        return isWinner;
    }

    /**
     * Recorre todas las filas chequeando si existen {size}
     * fichas de un jugador seguidas
     */
    checkHorizontal() {
        let count = 0;
        let player = -1;
        let isWinner = false;
        
        for (let row = 0; row < this.slotY.length; row++) {
            count = 0;
            for (let col = 0; col < this.slotX.length; col++) {
                let token = this.slot[this.slotY[row]+'-row'][this.slotX[col]+'-col'];
                let valor = token.getPlayer();
                if (valor === 0) {
                    count = 0;
                    player = -1;
                }
                else if (valor !== player){
                    player = valor;
                    count = 1;
                }
                else
                    count++;
                
                if (count === this.size){
                    isWinner = true;
                    return isWinner;
                }
            }
        }
        return isWinner;
    }

    checkDiagonal(){
        let isWinner = false;
        if (this.checkRightDiagonal() || this.checkLeftDiagonal())
            isWinner = true;
        return isWinner;
    }

    /**
     * Recorre las primeras tres filas {0, 1, 2} y a partir de estas
     * recorre las tres ultimas columnas
     */
    checkRightDiagonal() {
        let isWinner = false;
        let row = 0;
        while (row < 2 && !isWinner) {
            let col = this.size-1;
            while (col <= this.size+1 && !isWinner) {
                let tempX = col;
                let tempY = row;
                let value = this.slot[this.slotY[tempY]+'-row'][this.slotX[tempX]+'-col'].getPlayer();
                if (value !== 0) {
                    let i = 0;
                    let t = true;
                    while (i < this.size-1 && t) {
                        tempX--;
                        tempY++;
                        let tempValue = this.slot[this.slotY[tempY]+'-row'][this.slotX[tempX]+'-col'].getPlayer();
                        if (tempValue !== value) {
                            t = false;
                        } else if (i === this.size-2){
                            isWinner = true;
                        }
                        i++;
                    }
                }
                col++;
            }
            row++;
        }
        return isWinner;
    }

    /**
     * Recorre las primeras tres filas {0, 1, 2} y a partir de estas
     * recorre las tres primeras columnas
     */
    checkLeftDiagonal() {
        let isWinner = false;
        let row = 0;
        while (row < 2 && !isWinner) {
            let col = 0;
            while (col < 3 && !isWinner) {
                let tempX = col;
                let tempY = row;
                let value = this.slot[this.slotY[tempY]+'-row'][this.slotX[tempX]+'-col'].getPlayer();
                if (value !== 0) {
                    let i = 0;
                    let t = true;
                    while (i < this.size-1 && t) {
                        tempX++;
                        tempY++;
                        let tempValue = this.slot[this.slotY[tempY]+'-row'][this.slotX[tempX]+'-col'].getPlayer();
                        if (tempValue !== value) {
                            t = false;
                        } else if (i === this.size-2){
                            isWinner = true;
                        }
                        i++;
                    }
                }
                col++;
            }
            row++;
        }
        return isWinner;
    }
}