const agendaData = [
    {
        dia: 'Segunda', data: '02/02', 
        img: 'https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?q=80&w=1920', // Soja
        eventos: [
            { h: '09:15', t: 'Audiência de Conciliação', d: 'Rafael Zanini x Antonio Mendes' },
            { h: '15:30', t: 'Realização de defesa prévia', d: 'TRANSPORTE BRAGA BORGES' },
            { h: '16:30', t: 'Impugnar Cumprimento de Sentença', d: 'TAUILE x SANNA' }
        ]
    },
    {
        dia: 'Quarta', data: '04/02', 
        img: 'https://images.unsplash.com/photo-1554306274-f230f2832876?q=80&w=1920', // Milho
        eventos: [{ h: '07:00', t: 'Reunião BNI Jalapão', d: 'Networking e Parcerias' }]
    },
    {
        dia: 'Sexta', data: '06/02', 
        img: 'https://images.unsplash.com/photo-1594488425046-601e3895e96a?q=80&w=1920', // Fazenda/Silos
        eventos: [
            { h: 'Inteiro', t: 'Inauguração - Escritório AUBE', d: 'Evento Institucional BSC' },
            { h: '08:30', t: 'Informar novo endereço', d: 'Rafael Zanini x Antonio Carlos' }
        ]
    },
    {
        dia: 'Sábado', data: '07/02', 
        img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1920', // Campo/Grãos
        eventos: [{ h: 'Inteiro', t: 'Dia de Campo - OILEMA', d: 'Consultoria Setor Agro' }]
    }
];

function init() {
    const nav = document.getElementById('navAgenda');
    agendaData.forEach((item, i) => {
        const btn = document.createElement('div');
        btn.className = `btn-dia ${i === 0 ? 'active' : ''}`;
        btn.innerHTML = `<span>${item.data}</span><br><strong>${item.dia}</strong>`;
        btn.onclick = () => updateView(item, btn);
        nav.appendChild(btn);
    });
    updateView(agendaData[0]);
    setInterval(() => {
        document.getElementById('clock').innerText = new Date().toLocaleTimeString('pt-BR');
    }, 1000);
}

function updateView(data, btn) {
    document.getElementById('dynamicBg').style.backgroundImage = `url('${data.img}')`;
    if(btn) {
        document.querySelectorAll('.btn-dia').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
    const panel = document.getElementById('panelEvents');
    panel.innerHTML = data.eventos.map(e => `
        <div class="row-evento">
            <div class="time">${e.h}</div>
            <div class="info-evento">
                <h4>${e.t}</h4>
                <p>${e.d}</p>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', init);
