document.addEventListener('DOMContentLoaded', () => {
    
    // ================= DADOS DA REDE =================
    // Estes dados preenchem os cartões do organograma automaticamente
    
    const brazilNodes = [
        { state: "TO", city: "Palmas (Matriz)", partner: "Equipe BSC" },
        { state: "TO", city: "Arraias", partner: "Parceiro Local" },
        { state: "RS", city: "Porto Alegre", partner: "Rep. Capital" },
        { state: "RS", city: "Ibirubá", partner: "Dr. João Silva" },
        { state: "BA", city: "L.E. Magalhães", partner: "Esp. Agro" },
        { state: "BA", city: "Salvador", partner: "Consultoria" },
        { state: "MT", city: "Sinop", partner: "Base Norte" },
        { state: "MT", city: "Rondonópolis", partner: "Base Sul" },
        { state: "MS", city: "Sonora", partner: "Assoc. MS" },
        { state: "DF", city: "Brasília", partner: "Tribunais Sup." },
        { state: "MG", city: "Belo Horizonte", partner: "Estratégico" },
        { state: "SC", city: "Joinville", partner: "Estratégico" }
    ];

    const usaNodes = [
        { state: "Flórida", city: "Orlando", partner: "Intl. Desk" }
    ];

    // ================= RENDERIZAÇÃO DO ORGANOGRAMA VISUAL =================
    function renderTreeNodes(data, containerId) {
        const container = document.getElementById(containerId);
        
        data.forEach(item => {
            // Cria o elemento do cartão (nó)
            const nodeCard = document.createElement('div');
            nodeCard.className = 'node-card glow-hover';
            
            // Monta o HTML interno
            nodeCard.innerHTML = `
                <div class="node-header">${item.state}</div>
                <div class="node-body">
                    <span class="city-name">${item.city}</span>
                    <span class="partner-name">${item.partner}</span>
                </div>
            `;
            container.appendChild(nodeCard);
        });
    }

    // Chama a função para desenhar os dois ramos da árvore
    renderTreeNodes(brazilNodes, 'brazil-tree-grid');
    renderTreeNodes(usaNodes, 'usa-tree-grid');

    // ================= ANIMAÇÃO AO ROLAR (FADE IN) =================
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
