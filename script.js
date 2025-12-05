// Dados iniciais de locais/parceiros
const locaisInicial = [
  {
    cidade: "Palmas",
    estado: "Tocantins",
    pais: "Brasil",
    lat: -10.184,
    lng: -48.3336,
    responsavel: "Dr. Giovani de Góuvani",
    tipo: "Escritório sede"
  },
  {
    cidade: "Porto Alegre",
    estado: "Rio Grande do Sul",
    pais: "Brasil",
    lat: -30.0346,
    lng: -51.2177,
    responsavel: "Parceiro Local",
    tipo: "Parceiro regional"
  },
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
        mapa.setView(center, 8);
      })
      .addTo(mapa);
  }

  renderLocais();
}

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
