const botoesNumeros = document.querySelectorAll("[data-numeros]");
const botoesOperacoes = document.querySelectorAll("[data-operacao]");
const botaoIgual = document.querySelector("[data-igual]");
const botaoDeletar = document.querySelector("[data-deletar]");
const botaoLimpar = document.querySelector("[data-limpar]");
const areaPreviewTexto = document.querySelector("[data-preview]");
const areaResultadoTexto = document.querySelector("[data-resultado]");

class calculadora {
  constructor(areaPreviewTexto, areaResultadoTexto) {
    this.areaPreviewTexto = areaPreviewTexto;
    this.areaResultadoTexto = areaResultadoTexto;
    this.clear();
  }

  deletar() {
    this.areaResultado = this.areaResultado.toString().slice(0, -1);
  }

  calcular() {
    let resultado;

    const areaPreviewFloat = parseFloat(this.areaPreview);
    const areaResultadoFloat = parseFloat(this.areaResultado);

    if (isNaN(areaPreviewFloat) || isNaN(areaResultadoFloat)) return;

    switch (this.operacao) {
      case "+":
        resultado = areaPreviewFloat + areaResultadoFloat;
        break;
      case "-":
        resultado = areaPreviewFloat - areaResultadoFloat;
        break;
      case "x":
        resultado = areaPreviewFloat * areaResultadoFloat;
        break;
      case "÷":
        resultado = areaPreviewFloat / areaResultadoFloat;
        break;
      case "%":
        resultado = areaPreviewFloat * (areaResultadoFloat / 100);
        break;
      default:
        return;
    }

    this.areaResultado = resultado;
    this.operacao = undefined;
    this.areaPreview = "";
  }

  guardaOperacao(operacao) {
    if (this.areaPreview !== "") {
      this.calcular();
    }

    if (this.areaResultado === "") return;

    this.operacao = operacao;

    this.areaPreview = this.areaResultado;
    this.areaResultado = "";
  }

  adicionarNumero(number) {
    if (this.areaResultado.includes(".") && number === ".") return;

    this.areaResultado = `${this.areaResultado}${number.toString()}`;
  }

  clear() {
    this.areaPreview = "";
    this.areaResultado = "";
    this.operacao = undefined;
  }

  atualizarVisualizacao() {
    this.areaPreviewTexto.innerText = `${this.areaPreview} ${
      this.operacao || ""
    }`;
    this.areaResultadoTexto.innerText = this.areaResultado;
  }
}

const calculo = new calculadora(areaPreviewTexto, areaResultadoTexto);

botaoLimpar.addEventListener("click", () => {
  calculo.clear();
  calculo.atualizarVisualizacao();
});

for (const botaoNumero of botoesNumeros) {
  botaoNumero.addEventListener("click", () => {
    calculo.adicionarNumero(botaoNumero.innerText);
    calculo.atualizarVisualizacao();
  });
}

for (const botaoOperacao of botoesOperacoes) {
  botaoOperacao.addEventListener("click", () => {
    calculo.guardaOperacao(botaoOperacao.innerText);
    calculo.atualizarVisualizacao();
  });
}

botaoIgual.addEventListener("click", () => {
  calculo.calcular();
  calculo.atualizarVisualizacao();
});

botaoDeletar.addEventListener("click", () => {
  calculo.deletar();
  calculo.atualizarVisualizacao();
});
