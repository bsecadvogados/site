document.addEventListener('DOMContentLoaded', () => {
    // Dados dos parceiros
    const partnersData = [
        {
            state: "Tocantins (Matriz)",
            cities: [
                { name: "Palmas", partners: ["Equipe BSC Sede"] },
                { name: "Arraias", partners: ["Parceiro Local"] }
            ]
        },
        {
            state: "Rio Grande do Sul",
            cities: [
                { name: "Porto Alegre", partners: ["Representação Capital"] },
                { name: "Ibirubá", partners: ["Dr. João da Silva"] }
            ]
        },
        {
            state: "Bahia",
            cities: [
                { name: "Salvador", partners: ["Consultor Associado"] },
                { name: "Luís Eduardo Magalhães", partners: ["Especialista Soja/Algodão"] }
            ]
        },
        {
            state: "Mato Grosso",
            cities: [
                { name: "Sinop", partners: ["Base Norte"] },
                { name: "Rondonópolis", partners: ["Base Sul"] },
                { name: "Confresa", partners: ["Base Xingu"] }
            ]
        },
        {
            state: "Mato Grosso do Sul",
            cities: [
                { name: "Sonora", partners: ["Escritório Associado MS"] }
            ]
        },
        {
            state: "Distrito Federal",
            cities: [
                { name: "Brasília", partners: ["Tribunais Superiores (STJ/STF)"] }
            ]
        },
        {
            state: "Minas Gerais",
            cities: [
                { name: "Belo Horizonte", partners: ["Atuação Estratégica"] }
            ]
        },
        {
            state: "Santa Catarina",
            cities: [
                { name: "Joinville", partners: ["Atuação Estratégica"] }
            ]
        },
        {
            state: "Estados Unidos",
            cities: [
                { name: "Orlando, FL", partners: ["International Desk"] }
            ]
        }
    ];

    const gridContainer = document.getElementById('networkGrid');

    partnersData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'state-card';

        const citiesHtml = item.cities.map(city => {
            const partnerListHtml = city.partners.map(p => 
                `<div class="partner-name"><i class="fas fa-user-tie"></i> ${p}</div>`
            ).join('');

            return `
                <div class="city-block">
                    <span class="city-name">${city.name}</span>
                    ${partnerListHtml}
                </div>
            `;
        }).join('');

        card.innerHTML = `
            <div class="state-header">
                <span class="state-name">${item.state}</span>
                <i class="fas fa-chevron-down toggle-icon"></i>
            </div>
            <div class="state-content">
                ${citiesHtml}
            </div>
        `;

        const header = card.querySelector('.state-header');
        const content = card.querySelector('.state-content');

        header.addEventListener('click', () => {
            card.classList.toggle('active');
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });

        gridContainer.appendChild(card);
    });
});
