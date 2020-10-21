class TabuleiroView {
    
    constructor(canvas) {
        this._canvas = canvas
        this._ctx = canvas.getContext('2d');
    }
    
    draw(model) {
        this._limparTela();
        const dimensao = model.dimensao;
        const lado = model.quadroTamanho;
        
        for(let i = 0; i < dimensao; i++) {
            for(let j = 0; j < dimensao; j++) {
                const cor = model.getCor(i, j);
                this._drawQuadro(cor, i, j, lado);
            }
        }
        
        const ponto = model.getQuadroSelecionado();
        this._drawPonto(ponto[0], ponto[1], lado);
    }
    
    _drawQuadro(cor, x, y, lado) {
        this._ctx.lineWidth = 1;
        this._ctx.fillStyle = cor;
        this._ctx.fillRect(x * lado, y * lado, lado, lado);
        
        this._ctx.strokeStyle = "gray";
        this._ctx.strokeRect(x * lado, y * lado, lado, lado);
    }
    
    _drawPonto(x, y, lado) {
        this._ctx.lineWidth = 4;
        this._ctx.strokeStyle = "#FFA500";
        this._ctx.strokeRect(x * lado, y * lado, lado, lado);
    }
    
    _limparTela() {
        const w = this._canvas.width;
        const h = this._canvas.height;
        this._ctx.clearRect(0, 0, w, h);
    }
}
