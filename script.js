// ==========================================
// DADOS DA REDE DE ATUAÇÃO E PARCEIROS
// ==========================================
// Edite este objeto para adicionar/remover parceiros
const partnersData = [
    {
        uf: "TO",
        state: "Tocantins (Matriz)",
        cities: [
            { name: "Palmas", partners: ["Equipe BSC Sede"] },
            { name: "Arraias", partners: ["Parceiro Local"] }
        ]
    },
    {
        uf: "RS",
        state: "Rio Grande do Sul",
        cities: [
            { name: "Porto Alegre", partners: ["Representação Capital"] },
            { name: "Ibirubá", partners: ["Dr. João da Silva"] }
        ]
    },
    {
        uf: "BA",
        state: "Bahia",
        cities: [
            { name: "Salvador", partners: ["Consultor Associado"] },
            { name: "Luís Eduardo Magalhães", partners: ["Especialista Soja/Algodão"] }
        ]
    },
    {
        uf: "MT",
        state: "Mato Grosso",
        cities: [
            { name: "Sinop", partners: ["Base Norte"] },
            { name: "Rondonópolis", partners: ["Base Sul"] },
            { name: "Confresa", partners: ["Base Xingu"] }
        ]
    },
    {
        uf: "MS",
        state: "Mato Grosso do Sul",
        cities: [
            { name: "Sonora", partners: ["Escritório Associado MS"] }
        ]
    },
    {
        uf: "DF",
        state: "Distrito Federal",
        cities: [
            { name: "Brasília", partners: ["Tribunais Superiores (STJ/STF)"] }
        ]
    },
    {
        uf: "MG",
        state: "Minas Gerais",
        cities: [
            { name: "Belo Horizonte", partners: ["Atuação Estratégica"] }
        ]
    },
    {
        uf: "SC",
        state: "Santa Catarina",
        cities: [
            { name: "Joinville", partners: ["Atuação Estratégica"] }
        ]
    },
    {
        uf: "USA",
        state: "Estados Unidos",
        cities: [
            { name: "Orlando, FL", partners: ["International Desk"] }
        ]
    }
];

// ==========================================
// LÓGICA DE RENDERIZAÇÃO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('networkGrid');

    partnersData.forEach(item => {
        // 1. Criar o Card do Estado
        const card = document.createElement('div');
        card.className = 'state-card';

        // 2. Gerar HTML interno das cidades
        // Se não houver parceiro definido, mostra mensagem padrão
        const citiesHtml = item.cities.map(city => {
            const partnerListHtml = city.partners.length > 0 
                ? city.partners.map(p => `<div class="partner-name"><i class="fas fa-user-tie"></i> ${p}</div>`).join('')
                : `<div class="partner-name" style="color:#aaa; font-style:italic">Oportunidade de Parceria</div>`;

            return `
                <div class="city-block">
                    <span class="city-name">${city.name}</span>
                    ${partnerListHtml}
                </div>
            `;
        }).join('');

        // 3. Montar o HTML do Card
        card.innerHTML = `
            <div class="state-header">
                <span class="state-name">${item.state}</span>
                <i class="fas fa-chevron-down toggle-icon"></i>
            </div>
            <div class="state-content">
                ${citiesHtml}
            </div>
        `;

        // 4. Adicionar Evento de Clique (Accordion)
        const header = card.querySelector('.state-header');
        const content = card.querySelector('.state-content');

        header.addEventListener('click', () => {
            // Fecha todos os outros (Opcional - se quiser que só fique um aberto por vez)
            document.querySelectorAll('.state-card').forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('active')) {
                    otherCard.classList.remove('active');
                    otherCard.querySelector('.state-content').style.maxHeight = null;
                }
            });

            // Alterna o estado do atual
            card.classList.toggle('active');

            // Lógica de altura para animação suave
            if (content.style.maxHeight) {
                content.style.maxHeight = null; // Fecha
            } else {
                content.style.maxHeight = content.scrollHeight + "px"; // Abre conforme o tamanho do conteúdo
            }
        });

        // Adiciona ao grid principal
        gridContainer.appendChild(card);
    });
});
