class FloodFill {

    constructor() {
        this._isRun = false;
    }

    async start(screen, newColor) {
        const [x, y] = screen.getQuadroSelecionado();
        const targetColor = screen.getCor(x, y);
        
        this._isRun = true;
        await this._floodFill(screen,x, y, targetColor, newColor);
    }
    
    finalizar() {
        this._isRun = false;
    }
    
    //Algorito Flood fill
    async _floodFill(screen,x, y, targetColor, newColor) {
        if(this._isRun === false) return;
       
        if(x < 0 || x >= screen.dimensao || y < 0 || y >= screen.dimensao)
            return;
        
        if(screen.getCor(x, y) !== targetColor || screen.getCor(x, y) === newColor)
            return;
            
        screen.setCor(x, y, newColor);
        
        await this._sleep(10); //não faz parte do algoritmo
        
        await this._floodFill(screen,x + 1, y, targetColor, newColor);
        await this._floodFill(screen,x - 1, y, targetColor, newColor);
        await this._floodFill(screen,x, y + 1, targetColor, newColor);
        await this._floodFill(screen,x, y - 1, targetColor, newColor);
    }
    //Fim do algoritmo
    
    async _sleep(ms) {
        let time = 0;
        do {
           await new Promise(r => setTimeout(r, 1));
           time += 1;
        } while(this._isRun && time < ms);
    }
}
