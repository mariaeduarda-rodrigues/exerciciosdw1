function calcularPreco() {
            const formulario = document.getElementById('pedidoForm');
            const cqSelecionado = document.querySelector('input[name="cq"]:checked');
            const refSelecionados = document.querySelectorAll('input[name="refrigerante"]:checked');
            const erroDiv = document.getElementById('erro');
            const resultadoDiv = document.getElementById('resultado');
            const resumoDiv = document.getElementById('resumo');
            const totalSpan = document.getElementById('total');

            // Limpar mensagens de erro
            erroDiv.classList.remove('mostrar');
            erroDiv.textContent = '';

            // Validar se cachorro quente foi selecionado
            if (!cqSelecionado) {
                erroDiv.textContent = '⚠️ Por favor, selecione um cachorro quente!';
                erroDiv.classList.add('mostrar');
                resultadoDiv.classList.remove('mostrar');
                return;
            }

            let total = parseFloat(cqSelecionado.value);
            let resumoHTML = `<p><strong>Cachorro Quente:</strong> ${cqSelecionado.parentElement.querySelector('span').textContent} - R$ ${parseFloat(cqSelecionado.value).toFixed(2)}</p>`;

            // Processar refrigerantes selecionados
            if (refSelecionados.length > 0) {
                resumoHTML += '<p><strong>Refrigerantes:</strong></p>';
                refSelecionados.forEach(ref => {
                    const preco = parseFloat(ref.value);
                    const label = ref.parentElement.querySelector('span').textContent;
                    resumoHTML += `<p style="margin-left: 20px;">• ${label} - R$ ${preco.toFixed(2)}</p>`;
                    total += preco;
                });
            } else {
                resumoHTML += '<p style="color: #999; font-style: italic;">Sem refrigerante</p>';
            }

            // Atualizar resultado
            resumoDiv.innerHTML = resumoHTML;
            totalSpan.textContent = total.toFixed(2);
            resultadoDiv.classList.add('mostrar');
        }

        // Permitir calcular com Enter
        document.getElementById('pedidoForm').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                calcularPreco();
            }
        });