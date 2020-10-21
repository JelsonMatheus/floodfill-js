class TabuleiroController{
    
    constructor() {
        this._inputGrid = document.querySelector('#input-dimensao');
        this._canvas = document.querySelector('#canvas');
        this._inputLinha = document.querySelector('#input-linha');
        this._inputColuna = document.querySelector('#input-coluna');
        this._inputCor = document.querySelector('#input-cor');
        
        const tabuleiroView = new TabuleiroView(canvas);
        const props = ['setCor', 'criarTabuleiro'];
        
        const handler = {
            get(target, prop) {
                if(props.includes(prop)) {
                    return function() {
                        target[prop].apply(target, arguments);
                        tabuleiroView.draw(target);
                    }
                }
                return target[prop];
            }
        }
      
        this._tabuleiro = new Proxy(new Tabuleiro(350), handler);
        this._floodFill = new FloodFill();
        this.geraGrid();
    }
    
    geraGrid() {
        this._floodFill.finalizar();
        const dimensao = parseInt(this._inputGrid.value);
        const [linha, coluna] = this._getLinhaEColuna();
        this._tabuleiro.criarTabuleiro(dimensao, linha, coluna);
        
        this._setLinhaEColunaInput(...this._tabuleiro.getQuadroSelecionado());
    }
    
    iniciar(event) {
        const cor = this._inputCor.value;
        
        event.target.disabled = true;
        this._floodFill.start(this._tabuleiro, cor).then(() => {
            event.target.disabled = false;
        });
    }
    
    setQuadroSelecionado(event) {
    
        if(event.type === "click") {
            const [l, c] = this._getQuadroClicado(event);
            this._setLinhaEColunaInput(l, c);
        }
        
        const [linha, coluna] = this._getLinhaEColuna();
        
        try {
           this._tabuleiro.setQuadroSelecionado(linha, coluna);
        } catch(e) {
            const dimensao = this._tabuleiro.dimensao - 1;
            this._tabuleiro.setQuadroSelecionado(dimensao, dimensao);
            this._setLinhaEColunaInput(dimensao, dimensao);
        }
        
        //Atulaizar o tabuleiro
        this._tabuleiro.setCor(0, 0, this._tabuleiro.getCor(0, 0));
    }
    
    _getQuadroClicado(event) {
        const rect = event.target.getBoundingClientRect();
        const x = Math.ceil(event.clientX - rect.left);
        const y = Math.ceil(event.clientY - rect.top);
        
        const w = this._tabuleiro.quadroTamanho;
        const d = this._tabuleiro.dimensao;
        const linha = Math.min(Math.floor(x / w), d - 1);
        const coluna = Math.min(Math.floor(y / w), d - 1);
        
        return [linha, coluna];
    }
    
    _getLinhaEColuna() {
        return [parseInt(this._inputLinha.value),
                parseInt(this._inputColuna.value)];
    }
    
    _setLinhaEColunaInput(linha, coluna) {
       this._inputLinha.value = linha;
       this._inputColuna.value = coluna;
    }
}
