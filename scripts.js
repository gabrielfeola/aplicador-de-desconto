// Máscaras inputs
document.addEventListener('DOMContentLoaded', () => {
    const valorInput = document.getElementById('valorSemDesconto');
    
    valorInput.addEventListener('input', (event) => {
        let input = event.target;
        let valor = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos

        // Adiciona a máscara de valor monetário
        if (valor.length > 2) {
            valor = valor.slice(0, -2) + ',' + valor.slice(-2); // Adiciona a vírgula para centavos
        }
        
        valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Adiciona pontos a cada grupo de 3 dígitos
        
        // Adiciona o prefixo "R$" e limita o total de caracteres
        let valorFormatado = 'R$ ' + valor;
        if (valorFormatado.length > 15) { // Ajuste o valor conforme necessário
            valorFormatado = valorFormatado.slice(0, 15);
        }
        
        input.value = valorFormatado;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const mascaraParcelas = document.getElementById('parcelasCartao');
    const mascaraCarne = document.getElementById('parcelasCarne');
    const mascaraRecorrente = document.getElementById('parcelasRecorrente');
    
    const formatarValor = (event) => {
        let input = event.target;
        let valor = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
        input.value = valor; // Atualiza o valor do input
    };

    mascaraParcelas.addEventListener('input', formatarValor);
    mascaraCarne.addEventListener('input', formatarValor);
    mascaraRecorrente.addEventListener('input', formatarValor);
});

document.addEventListener('DOMContentLoaded', () => {
    const maxDescontoInput = document.getElementById('maxDesconto');
    const maxDescontoCarneInput = document.getElementById('maxDescontoCarne');
    const maxDescontoRecorrenteInput = document.getElementById('maxDescontoRecorrente');

    maxDescontoCarneInput.addEventListener('input', function(e) {
        let valor = e.target.value;

        // Remove todos os caracteres que não são dígitos
        valor = valor.replace(/\D/g, '');

        // Adiciona o símbolo % e formata o valor
        if (valor) {
            valor = parseInt(valor, 10);
            e.target.value = `${valor}%`;
        } else {
            e.target.value = '';
        }
    });

    maxDescontoRecorrenteInput.addEventListener('input', function(e) {
        let valor = e.target.value;

        // Remove todos os caracteres que não são dígitos
        valor = valor.replace(/\D/g, '');

        // Adiciona o símbolo % e formata o valor
        if (valor) {
            valor = parseInt(valor, 10);
            e.target.value = `${valor}%`;
        } else {
            e.target.value = '';
        }
    });

    maxDescontoInput.addEventListener('input', function(e) {
        let valor = e.target.value;

        // Remove todos os caracteres que não são dígitos
        valor = valor.replace(/\D/g, '');

        // Adiciona o símbolo % e formata o valor
        if (valor) {
            valor = parseInt(valor, 10);
            e.target.value = `${valor}%`;
        } else {
            e.target.value = '';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const telefoneInput = document.getElementById('whatsapp');
    
    telefoneInput.addEventListener('input', (event) => {
        let input = event.target;
        let valor = input.value.replace(/\D/g, '');
        if (valor.length > 2) {
            valor = '(' + valor.slice(0, 2) + ') ' + valor.slice(2);
        }
        if (valor.length > 10) {
            valor = valor.slice(0, 10) + '-' + valor.slice(10, 14);
        }
        input.value = valor;
    });
});

 document.addEventListener('DOMContentLoaded', () => {
    const cpfInput = document.getElementById('cpf');
    
    cpfInput.addEventListener('input', (event) => {
        let input = event.target;
        let valor = input.value.replace(/\D/g, '');

        if (valor.length > 11) {
            valor = valor.slice(0, 11);
        }
        
        let valorFormatado = valor;

        if (valor.length > 9) {
            valorFormatado = valor.slice(0, 3) + '.' + valor.slice(3, 6) + '.' + valor.slice(6, 9) + '-' + valor.slice(9);
        } else if (valor.length > 6) {
            valorFormatado = valor.slice(0, 3) + '.' + valor.slice(3, 6) + '.' + valor.slice(6);
        } else if (valor.length > 3) {
            valorFormatado = valor.slice(0, 3) + '.' + valor.slice(3);
        }
        
        input.value = valorFormatado;
    });
});

document.getElementById('addBeneficio').addEventListener('click', function() {
    if (!document.querySelector('#beneficioExtra')) {
        const newDiv = document.createElement('div');
        newDiv.className = 'form-group';

        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.id = 'beneficioExtra';
        newInput.placeholder = 'Benefício extra';

        newDiv.appendChild(newInput);

        document.getElementById('form1').appendChild(newDiv);
    }
});

document.getElementById('startButton').addEventListener('click', function() {
    if (validateForm1()) {
        document.getElementById('form1').classList.add('hidden');
        document.getElementById('form2').classList.remove('hidden');
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const parcelasCartaoInput = document.getElementById('parcelasCartao');
    const parcelasRecorrenteInput = document.getElementById('parcelasRecorrente');
    const parcelasCarneInput = document.getElementById('parcelasCarne');
    const pagamentoSelect = document.getElementById('pagamento');
    const numeroParcelasSelect = document.getElementById('numeroParcelas');
    const numeroParcelasContainer = numeroParcelasSelect.parentElement;
    const valorSemDescontoInput = document.getElementById('valorSemDesconto');
    const maxDescontoInput = document.getElementById('maxDesconto');

    function formatarMoeda(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function atualizarOpcoesParcelas(numParcelas) {
        numeroParcelasSelect.innerHTML = '';
        const valorSemDesconto = parseFloat(valorSemDescontoInput.value.replace('R$', '').replace('.', '').replace(',', '.'));
        const maxDesconto = parseFloat(maxDescontoInput.value.replace('%', ''));
        const desconto = valorSemDesconto * (1 - maxDesconto / 100);

        for (let i = 1; i <= numParcelas; i++) {
            const parcelaValor = (desconto / i).toFixed(2);
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Em ${i}x de ${formatarMoeda(parcelaValor)}`;
            numeroParcelasSelect.appendChild(option);
        }
    }

    function controlarVisibilidade() {
        if (pagamentoSelect.value === 'parcelado') {
            const parcelasCartao = parseInt(parcelasCartaoInput.value, 10) || 0;
            const parcelasRecorrente = parseInt(parcelasRecorrenteInput.value, 10) || 0;
            const parcelasCarne = parseInt(parcelasCarneInput.value, 10) || 0;

            // Encontra o maior número de parcelas
            const numParcelas = Math.max(parcelasCartao, parcelasRecorrente, parcelasCarne);
            
            if (numParcelas > 0) {
                numeroParcelasContainer.classList.remove('hidden');
                atualizarOpcoesParcelas(numParcelas);
            } else {
                numeroParcelasContainer.classList.add('hidden');
                numeroParcelasSelect.innerHTML = '';
            }
        } else {
            numeroParcelasContainer.classList.add('hidden');
            numeroParcelasSelect.innerHTML = '';
        }
    }

    parcelasCartaoInput.addEventListener('input', controlarVisibilidade);
    parcelasRecorrenteInput.addEventListener('input', controlarVisibilidade);
    parcelasCarneInput.addEventListener('input', controlarVisibilidade);
    pagamentoSelect.addEventListener('change', controlarVisibilidade);
    valorSemDescontoInput.addEventListener('input', controlarVisibilidade);
    maxDescontoInput.addEventListener('input', controlarVisibilidade);

    controlarVisibilidade();
});

document.getElementById('consultarButton').addEventListener('click', function() {
    if (validateForm2()) {
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        
        const valorSemDescontoInput = document.getElementById('valorSemDesconto').value;
        const maxDescontoInput = document.getElementById('maxDesconto').value;
        const maxDescontoCarneInput = document.getElementById('maxDescontoCarne').value;
        const maxDescontoRecorrenteInput = document.getElementById('maxDescontoRecorrente').value;
        const valorSemDesconto = parseFloat(valorSemDescontoInput.replace(/[^\d,]/g, '').replace(',', '.'));
        const maxDesconto = parseFloat(maxDescontoInput.replace(/[^\d]/g, ''));
        const maxDescontoCarne = parseFloat(maxDescontoCarneInput.replace(/[^\d]/g, ''));
        const maxDescontoRecorrente = parseFloat(maxDescontoRecorrenteInput.replace(/[^\d]/g, ''));

        if (isNaN(valorSemDesconto) || isNaN(maxDesconto)) {
            alert('Valor inválido em um dos campos.');
            return;
        }

        const desconto = (valorSemDesconto * (1 - maxDesconto / 100)).toFixed(2);
        const descontoCarne = (valorSemDesconto * (1 - maxDescontoCarne / 100)).toFixed(2);
        const descontoRecorrente = (valorSemDesconto * (1 - maxDescontoRecorrente / 100)).toFixed(2);

        const numeroParcelasSelect = document.getElementById('numeroParcelas');
        const parcelaSelecionada = numeroParcelasSelect ? numeroParcelasSelect.value : '';

        const resultadoParcelas = document.querySelector('.resultadoParcelas');
        if (resultadoParcelas) {
            if (parcelaSelecionada) {
                const valorParcela = (desconto / parcelaSelecionada).toFixed(2);
                resultadoParcelas.innerText = `Você optou por ${parcelaSelecionada} parcelas de R$ ${formatarMoeda(valorParcela)}`;
            }
        }

        document.getElementById('resNome').innerText = nome;
        document.getElementById('resCPF').innerText = cpf;
        document.getElementById('resOriginal').innerText = `${valorSemDesconto}`;
        document.getElementById('resDesconto').innerText = desconto;
        document.getElementById('resPercentual').innerText = maxDesconto;

        document.getElementById('resOriginalCarne').innerText = `${valorSemDesconto}`;
        document.getElementById('resDescontoCarne').innerText = descontoCarne;
        document.getElementById('resPercentualCarne').innerText = maxDescontoCarne;

        document.getElementById('resOriginalRecorrente').innerText = `${valorSemDesconto}`;
        document.getElementById('resDescontoRecorrente').innerText = descontoRecorrente;
        document.getElementById('resPercentualRecorrente').innerText = maxDescontoRecorrente;

        const parcerias = Array.from(document.querySelectorAll('#form2 input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value)
            .join(', ');
        if (parcerias !== '') {
            const parceriasElement = document.createElement('p');
            parceriasElement.className = 'parcerias';
            parceriasElement.innerHTML = `<b>Parceria</b>: <span id="resParcerias">${parcerias}</span>`;
            document.getElementById('dynamicContent').appendChild(parceriasElement);
        }

        const beneficioExtraInput = document.querySelector('#beneficioExtra');
        if (beneficioExtraInput) {
            const beneficioExtra = beneficioExtraInput.value;
            if (beneficioExtra.trim() !== '') {
                const beneficioElement = document.createElement('p');
                beneficioElement.className = 'beneficio';
                beneficioElement.innerHTML = `<b>Benefício extra:</b> <span id="beneficios">${beneficioExtra}</span>`;
                const dynamicContent = document.getElementById('dynamicContent2');
                if (dynamicContent) {
                    dynamicContent.appendChild(beneficioElement);
                } 
            } 
        }

        let tempo = 600;
        const tempoElem = document.getElementById('resTempo');
        const interval = setInterval(() => {
            const minutos = String(Math.floor(tempo / 60)).padStart(2, '0');
            const segundos = String(tempo % 60).padStart(2, '0');
            tempoElem.innerText = `${minutos}:${segundos}`;
            if (tempo === 0) {
                clearInterval(interval);
                document.getElementById('oportunidade').classList.add('hidden');
                document.getElementById('tempoEsgotado').classList.remove('hidden');
            } else {
                tempo--;
            }
        }, 1000);

        const blinkInterval = setInterval(() => {
            tempoElem.style.visibility = tempoElem.style.visibility === 'hidden' ? 'visible' : 'hidden';
        }, 500);

        const codigoOferta = cpf.substring(0, 3) + '-' + Math.floor(Math.random() * 9000000 + 1000000);
        document.getElementById('resCodigoOferta').innerText = codigoOferta;

        document.getElementById('form2').classList.add('hidden');
        document.getElementById('loading').classList.remove('hidden');
        setTimeout(() => {
            document.getElementById('loading').classList.add('hidden');
            document.getElementById('oportunidade').classList.remove('hidden');
        }, 4000);
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
});

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

document.getElementById('aproveitarButton').addEventListener('click', function() {
    document.getElementById('finalDesconto').innerText = document.getElementById('resPercentual').innerText;
    document.getElementById('finalCodigo').innerText = document.getElementById('resCodigoOferta').innerText;
    document.getElementById('oportunidade').classList.add('hidden');
    document.getElementById('aproveitar').classList.remove('hidden');
});

document.getElementById('perderButton').addEventListener('click', function() {
    document.getElementById('oportunidade').classList.add('hidden');
    document.getElementById('perder').classList.remove('hidden');
});

function validateForm1() {
    const fields = ['valorSemDesconto', 'maxDesconto', 'maxDescontoCarne', 'maxDescontoRecorrente'];
    return fields.every(id => document.getElementById(id).value.trim() !== '');
}

function validateForm2() {
    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const whatsapp = document.getElementById('whatsapp').value.trim();
    
    const cpfValido = cpf.length === 14;
    const whatsappValido = whatsapp.length === 15;

    if (!cpfValido) {
        alert('O CPF deve ter 14 caracteres (incluindo pontos e hífen).');
        return false;
    }

    if (!whatsappValido) {
        alert('O WhatsApp deve ter 15 caracteres (incluindo parênteses, espaço e hífen).');
        return false;
    }

    return true;
}
