document.addEventListener('DOMContentLoaded', () => {
    
    // ================= DADOS =================
    const brazilData = [
        { state: "Tocantins", city: "Palmas (Matriz)", partner: "Equipe BSC Sede" },
        { state: "Tocantins", city: "Arraias", partner: "Parceiro Local" },
        { state: "Rio Grande do Sul", city: "Porto Alegre", partner: "Representação Capital" },
        { state: "Rio Grande do Sul", city: "Ibirubá", partner: "Dr. João da Silva" },
        { state: "Bahia", city: "Luís Eduardo Magalhães", partner: "Especialista Soja/Algodão" },
        { state: "Bahia", city: "Salvador", partner: "Consultoria Jurídica" },
        { state: "Mato Grosso", city: "Sinop", partner: "Base Norte" },
        { state: "Mato Grosso", city: "Rondonópolis", partner: "Base Sul" },
        { state: "Mato Grosso do Sul", city: "Sonora", partner: "Escritório Associado MS" },
        { state: "Distrito Federal", city: "Brasília", partner: "Tribunais Superiores" },
        { state: "Minas Gerais", city: "Belo Horizonte", partner: "Atuação Estratégica" },
        { state: "Santa Catarina", city: "Joinville", partner: "Atuação Estratégica" }
    ];

    const usaData = [
        { state: "Flórida", city: "Orlando", partner: "International Desk" }
    ];

    // ================= RENDERIZAÇÃO =================
    function renderLocations(data, containerId) {
        const container = document.getElementById(containerId);
        
        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'location-item';
            
            div.innerHTML = `
                <span class="loc-state">${item.state}</span>
                <span class="loc-city">${item.city}</span>
                <div class="loc-partner">
                    <i class="fas fa-user-check"></i> ${item.partner}
                </div>
            `;
            container.appendChild(div);
        });
    }

    renderLocations(brazilData, 'brazilGrid');
    renderLocations(usaData, 'usaGrid');

    // ================= ANIMAÇÃO AO ROLAR =================
    const fadeElements = document.querySelectorAll('.js-scroll-fade');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
});
