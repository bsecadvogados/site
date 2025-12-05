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

function initMap() {
  mapa = L.map("map").setView([-15.8, -47.9], 4);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(mapa);

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

function addParceiro(event) {
  event.preventDefault();

  const cidade = document.getElementById("cidade").value.trim();
  const estado = document.getElementById("estado").value.trim();
  const pais = document.getElementById("pais").value.trim();
  const lat = parseFloat(document.getElementById("latitude").value);
  const lng = parseFloat(document.getElementById("longitude").value);
  const respSelect = document.getElementById("responsavel").value;
  const outroResp = document.getElementById("outroResponsavel").value.trim();

  let responsavel = respSelect;
  if (respSelect === "outro" && outroResp) {
    responsavel = outroResp;
  }

  if (!cidade || !estado || !pais || isNaN(lat) || isNaN(lng) || !responsavel) {
    alert("Preencha corretamente todos os campos.");
    return;
  }

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
}

window.addEventListener("load", initMap);
