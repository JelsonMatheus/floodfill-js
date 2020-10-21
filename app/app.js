const controller = new TabuleiroController();

document.querySelector('#botao-gera')
	.addEventListener('click', controller.geraGrid.bind(controller));

document.querySelector('#botao-start')
	.addEventListener('click', controller.iniciar.bind(controller));

document.querySelector('#input-linha')
    .addEventListener('change', controller.setQuadroSelecionado.bind(controller));

document.querySelector('#input-coluna')
    .addEventListener('chance', controller.setQuadroSelecionado.bind(controller));

document.querySelector('#canvas')
    .addEventListener('click', controller.setQuadroSelecionado.bind(controller));
