document.addEventListener('DOMContentLoaded', () => {
    
    // ================= DADOS DO ORGANOGRAMA =================
    // Basta adicionar ou remover itens aqui para atualizar o site.
    
    const brazilData = [
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

    const intlData = [
        { state: "EUA", city: "Orlando, FL", partner: "International Desk" }
    ];

    // ================= FUNÇÃO DE RENDERIZAÇÃO =================
    function renderNetworkCards(data, containerId) {
        const container = document.getElementById(containerId);
        
        data.forEach(item => {
            // Cria o elemento do cartão (nó)
            const nodeCard = document.createElement('div');
            nodeCard.className = 'node-card';
            
            // Monta o HTML interno
            nodeCard.innerHTML = `
                <div class="node-state-header">${item.state}</div>
                <div class="node-body">
                    <span class="city-name">${item.city}</span>
                    <span class="partner-name">${item.partner}</span>
                </div>
            `;
            container.appendChild(nodeCard);
        });
    }

    // Executa a função para os dois grupos
    renderNetworkCards(brazilData, 'brazil-grid');
    renderNetworkCards(intlData, 'intl-grid');

    // Animação simples de entrada do Hero
    setTimeout(() => {
        document.querySelector('.hero-content').classList.add('active');
    }, 200);
});
