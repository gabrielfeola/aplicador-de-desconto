document.getElementById('valorParcelamentoCheck').addEventListener('change', function() {
    document.getElementById('valorParcelamento').disabled = !this.checked;
});

document.getElementById('startButton').addEventListener('click', function() {
    if (validateForm1()) {
        document.getElementById('form1').classList.add('hidden');
        document.getElementById('form2').classList.remove('hidden');
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
});


document.getElementById('consultarButton').addEventListener('click', function() {
    if (validateForm2()) {
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const valorSemDesconto = parseFloat(document.getElementById('valorSemDesconto').value);
        const maxDesconto = parseFloat(document.getElementById('maxDesconto').value);

        const desconto = (valorSemDesconto * (1 - maxDesconto / 100)).toFixed(2);

        const parcerias = Array.from(document.querySelectorAll('#form2 input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value)
            .join(', ');

        document.getElementById('resNome').innerText = nome;
        document.getElementById('resCPF').innerText = cpf;
        console.log(valorSemDesconto)
        console.log(desconto)
        console.log(maxDesconto)
        document.getElementById('resOriginal').innerText = `${valorSemDesconto}.00`;
        document.getElementById('resDesconto').innerText = desconto;
        document.getElementById('resPercentual').innerText = maxDesconto;
        if(parcerias != '') {
            const parceriasElement = document.createElement('p');
            parceriasElement.className = 'parcerias';
            parceriasElement.innerHTML = `<b>Parceria</b>: <span id="resParcerias">${parcerias}</span>`;
            document.getElementById('dynamicContent').appendChild(parceriasElement);
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
    const fields = ['valorSemDesconto', 'maxDesconto'];
    return fields.every(id => document.getElementById(id).value.trim() !== '');
}

function validateForm2() {
    const fields = ['nome', 'cpf', 'whatsapp'];
    return fields.every(id => document.getElementById(id).value.trim() !== '');
}
