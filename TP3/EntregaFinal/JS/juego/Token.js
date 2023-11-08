class Token{
    constructor(x, y, param, player, img){
        this.x = x;
        this.y = y;
        this.radio = 25;
        this.player = player;
        this.status = '';
        // this.highlighted = false;
        this.image = new Image();
        if(param === 'p')
            this.image.src = img
    }

    getPlayer(){
        if (this.player === 0)
            return this.player;
        else 
            return this.player.getPlayerNumber();
    }

    getName() {
        return this.player.getName();
    }

    getStatus() {
        return this.status;
    }

    setStatus(status) {
        this.status = status;
    }
    
    setContext(context){
        this.context = context;
    }
    setHighlighted(value) {
        this.highlighted = value;
    }
    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    

    isClicked(x, y) {
        var xLayer = x - this.x;
        var yLayer = y - this.y;
        return Math.sqrt(xLayer*xLayer + yLayer*yLayer) < this.radio;
    }

    draw(){
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radio, 0, Math.PI*2);
        this.context.fillStyle = '#ffffff';
        this.context.fill();
        this.context.drawImage(this.image, this.x - this.radio - 6, this.y - this.radio - 6, 63, 62);
        this.context.closePath();
        this.image.onload = () => {
        };
    }
}
	