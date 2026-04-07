class EstacionamentoControle {

    calcularValor(estacionamento) {
        let tempo = Number(estacionamento.tempo);
        let valor = 0;

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

        if (estacionamento.tipo) {
            valor *= 1.25;
        }

        if (estacionamento.cliente) {
            valor *= 0.95;
        }

        return valor;
    }
}


