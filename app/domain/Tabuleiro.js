class Tabuleiro {
    
    constructor(comprimento) {
        this._comprimento = comprimento;
        this._quadros = [];
        this._qudroSelecionado = [0, 0];
    }
    
    criarTabuleiro(dimensao, linha, coluna) {
        this._quadros = Array(dimensao).fill([])
            .map(e => Array(dimensao));
    
        for(let i = 0; i < dimensao; i++) {
            for(let j = 0; j < dimensao; j++) {
                this._quadros[i][j] = this._gerarCor();
            }
        }
        
        this._qudroSelecionado = [ Math.min(linha, dimensao - 1), 
                    Math.min(coluna, dimensao - 1)];
    }
    
    getCor(x, y) {
        return this._quadros[y][x];
    }
    
    setCor(x, y, cor) {
        return this._quadros[y][x] = cor;
    }
    
    getQuadroSelecionado() {
        return [].concat(this._qudroSelecionado);
    }
    
    setQuadroSelecionado(x, y) {
        const d = this._quadros.length;
        if(x < 0 || x >= d || y < 0 || y >= d) 
            throw new Error(`${x} ou ${y} Fora dos limites do array!`);
     
        this._qudroSelecionado = [x, y];
    }
    
    _gerarCor() {
        const cores = ['#000000', '#FFFFFF'];
        const valor = Math.floor(Math.random() * 11);
        return (valor > 6) ? cores[0] : cores[1];
    }
    
    get dimensao() {
        return this._quadros.length;
    }
    get quadroTamanho() {
        return this._comprimento / this._quadros.length;
    }
    get comprimento() {
        return this._comprimento;
    }
}