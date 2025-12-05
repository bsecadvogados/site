// Dados dos Locais e Parceiros
const locationsData = [
    {
        id: "TO",
        name: "Tocantins",
        cities: [
            { name: "Palmas (Sede)", partners: ["Equipe BSC Sede"] },
            { name: "Arraias", partners: ["Parceiro Local 1"] }
        ]
    },
    {
        id: "RS",
        name: "Rio Grande do Sul",
        cities: [
            { name: "Porto Alegre", partners: ["Disponível para Parceria"] },
            { name: "Ibirubá", partners: ["Dr. João da Silva"] }
        ]
    },
    {
        id: "MS",
        name: "Mato Grosso do Sul",
        cities: [
            { name: "Sonora", partners: ["Escritório Associado MS"] }
        ]
    },
    {
        id: "BA",
        name: "Bahia",
        cities: [
            { name: "Salvador", partners: ["Consultor Regional"] },
            { name: "Luís Eduardo Magalhães", partners: ["Especialista em Soja"] }
        ]
    },
    {
        id: "MT",
        name: "Mato Grosso",
        cities: [
            { name: "Sinop", partners: [] },
            { name: "Rondonópolis", partners: [] },
            { name: "Confresa", partners: [] }
        ]
    },
    {
        id: "DF",
        name: "Distrito Federal",
        cities: [
            { name: "Brasília", partners: ["Atuação nos Tribunais Superiores"] }
        ]
    },
    {
        id: "MG",
        name: "Minas Gerais",
        cities: [
            { name: "Belo Horizonte", partners: [] }
        ]
    },
    {
        id: "SC",
        name: "Santa Catarina",
        cities: [
            { name: "Joinville", partners: [] }
        ]
    },
    {
        id: "USA",
        name: "Estados Unidos",
        cities: [
            { name: "Orlando, FL", partners: ["Consultoria Internacional"] }
        ]
    }
];

// Função para carregar a lista de estados
function loadStates() {
    const listElement = document.getElementById('statesList');
    
    locationsData.forEach(state => {
        const item = document.createElement('div');
        item.className = 'state-item';
        item.innerHTML = `<span>${state.name}</span> <i class="fas fa-chevron-right"></i>`;
        
        item.addEventListener('click', () => {
            // Remove classe active de todos
            document.querySelectorAll('.state-item').forEach(i => i.classList.remove('active'));
            // Adiciona no clicado
            item.classList.add('active');
            // Carrega detalhes
            showDetails(state);
        });
        
        listElement.appendChild(item);
    });
}

// Função para mostrar os detalhes do estado clicado
function showDetails(stateData) {
    const detailsElement = document.getElementById('locationDetails');
    
    let citiesHTML = '';
    
    stateData.cities.forEach(city => {
        // Verifica se há parceiros listados
        const partnersList = city.partners.length > 0 
            ? city.partners.map(p => `<span class="partner-badge"><i class="fas fa-user-tie"></i> ${p}</span>`).join('') 
            : '<span style="font-style:italic; color:#999; font-size:0.9rem">Oportunidade de Parceria Aberta</span>';

        citiesHTML += `
            <div class="city-group">
                <div class="city-name">${city.name}</div>
                <div class="partner-name">
                    ${partnersList}
                </div>
            </div>
        `;
    });

    detailsElement.innerHTML = `
        <h3 style="color:var(--primary-green); margin-bottom:20px; border-bottom:1px solid #ddd; padding-bottom:10px;">
            Atuação em: ${stateData.name}
        </h3>
        ${citiesHTML}
        <div style="margin-top:30px;">
            <a href="https://wa.me/5563992699118?text=Olá, tenho interesse na parceria em ${stateData.name}" target="_blank" class="btn-primary" style="font-size:0.9rem">
                Quero ser parceiro nesta região
            </a>
        </div>
    `;
}

// Inicializa
document.addEventListener('DOMContentLoaded', loadStates);
