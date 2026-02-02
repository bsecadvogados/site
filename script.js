const agendaEscritorio = [
    { data: '02/02', dia: 'Segunda', img: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800', eventos: [
        { hora: '09:15', titulo: 'Audiência de Conciliação', local: 'Fórum Rafael Zanini' },
        { hora: '15:30', titulo: 'Defesa Prévia', local: 'Transporte Braga Borges' }
    ]},
    { data: '04/02', dia: 'Quarta', img: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=800', eventos: [
        { hora: '07:00', titulo: 'Reunião BNI Jalapão', local: 'Auditório Principal' }
    ]},
    { data: '06/02', dia: 'Sexta', img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800', eventos: [
        { hora: 'Dia Inteiro', titulo: 'Inauguração Escritório AUBE', local: 'Sede Nova' }
    ]},
    { data: '07/02', dia: 'Sábado', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800', eventos: [
        { hora: '08:00', titulo: 'Dia de Campo - OILEMA', local: 'Fazenda Experimental' }
    ]}
];

function buildAgenda() {
    const grid = document.getElementById('weeklyGrid');
    
    agendaEscritorio.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = `day-item ${index === 0 ? 'active' : ''}`;
        div.innerHTML = `<span>${item.data}</span><h4>${item.dia}</h4>`;
        div.onclick = () => updateDetail(item, div);
        grid.appendChild(div);
    });

    // Inicia com o primeiro dia
    updateDetail(agendaEscritorio[0]);
}

function updateDetail(item, element) {
    // UI Update
    if(element) {
        document.querySelectorAll('.day-item').forEach(d => d.classList.remove('active'));
        element.classList.add('active');
    }

    // Update Content
    document.getElementById('selectedDayTitle').innerText = `Compromissos: ${item.dia}`;
    document.getElementById('contextImage').src = item.img;
    
    const timeline = document.getElementById('eventTimeline');
    timeline.innerHTML = item.eventos.map(e => `
        <div class="event-entry">
            <strong><i class="fa-regular fa-clock"></i> ${e.hora}</strong>
            <p>${e.titulo}</p>
            <small><i class="fa-solid fa-location-dot"></i> ${e.local}</small>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', buildAgenda);
