// LOCais fixos (Estados / Cidades do organograma + Orlando)
const locaisInicial = [
  // Brasil – nível Brasil (para referência)
  {
    cidade: "Brasil",
    estado: "Brasil",
    pais: "Brasil",
    lat: -14.235,
    lng: -51.9253,
    responsavel: "BSC Advogados",
    tipo: "País"
  },
  // Rio Grande do Sul
  {
    cidade: "Porto Alegre",
    estado: "Rio Grande do Sul",
    pais: "Brasil",
    lat: -30.0346,
    lng: -51.2177,
    responsavel: "Parceiro Local",
    tipo: "Capital / Escritório parceiro"
  },
  {
    cidade: "Ibirubá",
    estado: "Rio Grande do Sul",
    pais: "Brasil",
    lat: -28.6306,
    lng: -53.0965,
    responsavel: "Parceiro Local",
    tipo: "Cidade"
  },
  // Mato Grosso do Sul
  {
    cidade: "Sonora",
    estado: "Mato Grosso do Sul",
    pais: "Brasil",
    lat: -17.5694,
    lng: -54.7555,
    responsavel: "Parceiro Local",
    tipo: "Cidade"
  },
  // Tocantins
  {
    cidade: "Palmas",
    estado: "Tocantins",
    pais: "Brasil",
    lat: -10.184,
    lng: -48.3336,
    responsavel: "Dr. Giovani",
    tipo: "Escritório sede"
  },
  {
    cidade: "Arraias",
    estado: "Tocantins",
    pais: "Brasil",
    lat: -12.935,
    lng: -46.9356,
    responsavel: "Parceiro Local",
    tipo: "Cidade"
  },
  // Bahia
  {
    cidade: "Salvador",
    estado: "Bahia",
    pais: "Brasil",
    lat: -12.9777,
    lng: -38.5016,
    responsavel: "Parceiro Local",
    tipo: "Capital"
  },
  {
    cidade: "Luís Eduardo Magalhães",
    estado: "Bahia",
    pais: "Brasil",
    lat: -12.0959,
    lng: -45.7866,
    responsavel: "Parceiro Local",
    tipo: "Cidade"
  },
  // Mato Grosso
  {
    cidade: "Sinop",
    estado: "Mato Grosso",
    pais: "Brasil",
    lat: -11.855,
    lng: -55.506, // Sinop [web:158]
    responsavel: "Parceiro Local",
    tipo: "Cidade"
  },
  {
    cidade: "Rondonópolis",
    estado: "Mato Grosso",
    pais: "Brasil",
    lat: -16.4673,
    lng: -54.6372,
    responsavel: "Parceiro Local",
    tipo: "Cidade"
  },
  {
    cidade: "Comodoro",
    estado: "Mato Grosso",
    pais: "Brasil",
    lat: -13.6591,
    lng: -59.7848,
    responsavel: "Parceiro Local",
    tipo: "Cidade"
  },
  // Distrito Federal
  {
    cidade: "Brasília",
    estado: "Distrito Federal",
    pais: "Brasil",
    lat: -15.7939,
    lng: -47.8828,
    responsavel: "Parceiro Local",
    tipo: "Capital"
  },
  // Minas Gerais
  {
    cidade: "Belo Horizonte",
    estado: "Minas Gerais",
    pais: "Brasil",
    lat: -19.9167,
    lng: -43.9345,
    responsavel: "Parceiro Local",
    tipo: "Capital"
  },
  // Santa Catarina
  {
    cidade: "Joinville",
    estado: "Santa Catarina",
    pais: "Brasil",
    lat: -26.3045,
    lng: -48.8487,
    responsavel: "Parceiro Local",
    tipo: "Cidade"
  },
  // Estados Unidos
  {
    cidade: "Orlando",
    estado: "Flórida",
    pais: "Estados Unidos",
    lat: 28.5384,
    lng: -81.3789,
    responsavel: "Parceiro Internacional",
    tipo: "Ponto de apoio internacional"
  }
];

let mapa;
let marcadores = [];
let locais = [...locaisInicial];
let geocoder;

// Inicializa mapa
function initMap() {
  mapa = L.map("map").setView([-15.8, -47.9], 4);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(mapa);

  if (L.Control.Geocoder) {
    geocoder = L.Control.Geocoder.nominatim();
    L.Control.geocoder({
      collapsed: true,
      defaultMarkGeocode: false,
      geocoder
    })
      .on("markgeocode", function (e) {
        const center = e.geocode.center;
        mapa.setView(center, 7);
      })
      .addTo(mapa);
  }

  renderLocais();
}

// Renderiza marcadores e lista
function renderLocais() {
  marcadores.forEach((m) => mapa.removeLayer(m));
  marcadores = [];

  const listEl = document.getElementById("parceirosList");
  listEl.innerHTML = "";

  const paises = new Set();

  locais.forEach((loc) => {
    paises.add(loc.pais.trim().toLowerCase());

    const marker = L.marker([loc.lat, loc.lng]).addTo(mapa);
    marker.bindPopup(
      `<div class="popup-title">${loc.cidade} – ${loc.estado}</div>
       <div class="popup-estado">${loc.pais}</div>
       <div class="popup-text">
          <strong>Responsável:</strong> ${loc.responsavel}<br/>
          <strong>Tipo:</strong> ${loc.tipo || "Parceiro"}
       </div>`
    );
    marcadores.push(marker);

    const item = document.createElement("div");
    item.className = "parceiro-item";
    item.onclick = () => {
      mapa.setView([loc.lat, loc.lng], 7);
      marker.openPopup();
    };

    item.innerHTML = `
      <div class="parceiro-top">
        <h4>${loc.cidade}</h4>
        <span class="parceiro-estado">${loc.estado} · ${loc.pais}</span>
      </div>
      <div class="parceiro-meta">
        <span><i class="fa-solid fa-user-tie"></i> ${loc.responsavel}</span>
        <span><i class="fa-solid fa-diagram-project"></i> ${loc.tipo || "Parceiro"}</span>
      </div>
    `;
    listEl.appendChild(item);
  });

  document.getElementById("totalLocais").textContent = locais.length.toString();
  document.getElementById("totalPaises").textContent = paises.size.toString();
}

// Modal
function openModal() {
  document.getElementById("parceiroModal").classList.add("active");
}
function closeModal() {
  document.getElementById("parceiroModal").classList.remove("active");
  document.getElementById("parceiroForm").reset();
  document.getElementById("outroResponsavelGroup").style.display = "none";
}
function toggleOutroResponsavel() {
  const resp = document.getElementById("responsavel").value;
  document.getElementById("outroResponsavelGroup").style.display =
    resp === "outro" ? "block" : "none";
}

// Geocodificação por texto
function geocodificarEndereco(pais, estado, cidade, complemento) {
  return new Promise((resolve, reject) => {
    if (!geocoder) {
      reject("Geocoder não disponível.");
      return;
    }
    const consulta = [cidade, estado, pais, complemento].filter(Boolean).join(", ");
    geocoder.geocode(consulta, (results) => {
      if (results && results.length > 0) {
        const c = results[0].center;
        resolve({ lat: c.lat, lng: c.lng });
      } else {
        reject("Local não encontrado.");
      }
    });
  });
}

// Adiciona novo local
async function addParceiro(event) {
  event.preventDefault();

  const cidade = document.getElementById("cidade").value.trim();
  const estado = document.getElementById("estado").value.trim();
  const pais = document.getElementById("pais").value.trim();
  const enderecoBusca = document.getElementById("enderecoBusca").value.trim();
  const respSelect = document.getElementById("responsavel").value;
  const outroResp = document.getElementById("outroResponsavel").value.trim();

  let responsavel = respSelect;
  if (respSelect === "outro" && outroResp) {
    responsavel = outroResp;
  }

  if (!cidade || !estado || !pais || !responsavel) {
    alert("Preencha corretamente todos os campos obrigatórios.");
    return;
  }

  try {
    const { lat, lng } = await geocodificarEndereco(pais, estado, cidade, enderecoBusca);

    locais.push({
      cidade,
      estado,
      pais,
      lat,
      lng,
      responsavel,
      tipo: "Parceiro cadastrado"
    });

    renderLocais();
    closeModal();
  } catch (e) {
    alert("Não foi possível localizar o endereço no mapa. Tente detalhar cidade, estado e país.");
    console.error(e);
  }
}

window.addEventListener("load", initMap);
