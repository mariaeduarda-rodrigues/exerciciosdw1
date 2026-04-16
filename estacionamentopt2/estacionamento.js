class EstacionamentoControle {

    calcularValor(estacionamento) {
        let tempo = Number(estacionamento.tempo);
        let valor = 0;

        // TARIFA BASE
        if (tempo < 24) {
            if (tempo <= 1) {
                valor = 5;
            } else {
                valor = 5 + (tempo - 1) * 2.5;
            }
        } else {
            let dias = Math.floor(tempo / 24);
            let horasRestantes = tempo % 24;

            valor = dias * 60;

            if (horasRestantes > 0) {
                if (horasRestantes <= 1) {
                    valor += 5;
                } else {
                    valor += 5 + (horasRestantes - 1) * 2.5;
                }
            }
        }

        // CARRO GRANDE (+25%)
        if (estacionamento.tipo) {
            valor *= 1.25;
        }

        // CLIENTE FREQUENTE (-5%)
        if (estacionamento.cliente) {
            valor *= 0.95;
        }

        return valor;
    }
}


// 🔥 FUNÇÃO PRINCIPAL
function calcular() {

    console.log("clicou"); // 🔥 teste 1

    let entrada = document.getElementById("inputEntrada").value;
    let saida = document.getElementById("inputSaida").value;

    console.log("entrada:", entrada);
    console.log("saida:", saida);

    let tipo = document.getElementById("inputTipo").checked;
    let cliente = document.getElementById("inputCliente").checked;

    // validação
    if (!entrada || !saida) {
        alert("Preencha as datas!");
        return;
    }

    let dataEntrada = new Date(entrada);
    let dataSaida = new Date(saida);

    console.log("dataEntrada:", dataEntrada);
    console.log("dataSaida:", dataSaida);

    if (dataSaida <= dataEntrada) {
        alert("A saída deve ser depois da entrada!");
        return;
    }

    // cálculo
    let diferenca = dataSaida - dataEntrada;

    console.log("dif ms:", diferenca);

    let horas = diferenca / (1000 * 60 * 60);
    horas = Math.ceil(horas);

    console.log("horas:", horas);

    let estacionamento = new Estacionamento(horas, tipo, cliente);
    let controle = new EstacionamentoControle();

    let valorFinal = controle.calcularValor(estacionamento);

    console.log("valor:", valorFinal);

    document.getElementById("resultado").innerText =
        "Tempo: " + horas + "h | Valor: R$ " + valorFinal.toFixed(2);
}