document.addEventListener('DOMContentLoaded', () => {
    
    // Dados Brasil
    const brazilData = [
        { state: "Tocantins (Matriz)", cities: [{name: "Palmas", p: "Equipe BSC Sede"}, {name: "Arraias", p: "Parceiro Local"}] },
        { state: "Rio Grande do Sul", cities: [{name: "Porto Alegre", p: "Representação Capital"}, {name: "Ibirubá", p: "Dr. João da Silva"}] },
        { state: "Mato Grosso", cities: [{name: "Sinop", p: "Base Norte"}, {name: "Rondonópolis", p: "Base Sul"}] },
        { state: "Bahia", cities: [{name: "Salvador", p: "Consultor Associado"}, {name: "LEM", p: "Especialista Agro"}] },
        { state: "Distrito Federal", cities: [{name: "Brasília", p: "Tribunais Superiores"}] }
    ];

    // Dados EUA
    const usaData = [
        { state: "Flórida", cities: [{name: "Orlando", p: "International Desk"}] }
    ];

    function renderGrid(data, containerId) {
        const container = document.getElementById(containerId);
        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'location-item';
            
            const citiesHtml = item.cities.map(c => `
                <div class="city-row">
                    <span class="city-label">${c.name}</span>
                    <span class="partner-val"><i class="fas fa-check"></i> ${c.p}</span>
                </div>
            `).join('');

            div.innerHTML = `
                <div class="location-header">
                    <span class="loc-name">${item.state}</span>
                    <i class="fas fa-chevron-down loc-icon"></i>
                </div>
                <div class="location-body">${citiesHtml}</div>
            `;

            const header = div.querySelector('.location-header');
            const body = div.querySelector('.location-body');

            header.addEventListener('click', () => {
                div.classList.toggle('active');
                if(body.style.maxHeight) body.style.maxHeight = null;
                else body.style.maxHeight = body.scrollHeight + "px";
            });

            container.appendChild(div);
        });
    }

    renderGrid(brazilData, 'brazilGrid');
    renderGrid(usaData, 'usaGrid');

    // Fade Animation
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.js-scroll-fade').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });
});
