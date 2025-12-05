/* assets/script.js
   Funcionalidade:
   - Inicializa mapa (Leaflet)
   - Gerencia lista de parceiros (CRUD) com localStorage
   - Filtra marcadores por responsável (clicando no organograma)
   - Export/Import JSON
   - Modal para adicionar/editar parceiros
   - Acessibilidade e pequenas validações
*/

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Configurações iniciais ----------
  const STORAGE_KEY = 'bsc_parceiros_v1';
  const defaultParceiros = [
    { id: genId(), nome: 'BSC - Palmas', cidade: 'Palmas', estado: 'Tocantins', pais: 'Brasil', lat: -10.1840, lng: -48.3336, responsavel: 'Dr. Giovani de Góuvani', obs: 'Escritório parceiro - plantão' },
    { id: genId(), nome: 'BSC - Goiânia', cidade: 'Goiânia', estado: 'Goiás', pais: 'Brasil', lat: -16.6869, lng: -49.2648, responsavel: 'Dra. Pamella', obs: 'Atendimento contratos' },
    { id: genId(), nome: 'BSC - Imperatriz', cidade: 'Imperatriz', estado: 'Maranhão', pais: 'Brasil', lat: -5.5189, lng: -47.4777, responsavel: 'Dr. Abimael', obs: 'Consultoria local' }
  ];

  // Elements
  const parceirosListEl = document.getElementById('parceirosList');
  const totalLocaisEl = document.getElementById('totalLocais');
  const totalPaisesEl = document.getElementById('totalPaises');
  const uiLocais = document.getElementById('ui-locais');
  const uiPaises = document.getElementById('ui-paises');

  // Modal elements
  const modal = document.getElementById('parceiroModal');
  const modalTitle = document.getElementById('modalTitle');
  const closeModalBtn = document.getElementById('closeModal');
  const openAddModalBtn = document.getElementById('openAddModal');
  const parceiroForm = document.getElementById('parceiroForm');
  const parceiroIdInput = document.getElementById('parceiroId');
  const cidadeInput = document.getElementById('cidade');
  const estadoInput = document.getElementById('estado');
  const paisInput = document.getElementById('pais');
  const latInput = document.getElementById('latitude');
  const lngInput = document.getElementById('longitude');
  const responsavelSelect = document.getElementById('responsavel');
  const outroGroup = document.getElementById('outroGroup');
  const outroResponsavelInput = document.getElementById('outroResponsavel');
  const observacoesInput = document.getElementById('observacoes');
  const cancelBtn = document.getElementById('cancelBtn');
  const saveBtn = document.getElementById('saveBtn');

  // Export/Import
  const exportBtn = document.getElementById('exportBtn');
  const importBtn = document.getElementById('importBtn');
  const importFileInput = document.getElementById('importFile');

  // Org chart filters
  const orgNodes = document.querySelectorAll('.org-node');

  // Reset filter
  const resetFilterBtn = document.getElementById('resetFilter');

  // Map initialization
  const map = L.map('map', { zoomControl: true }).setView([-14.2350, -51.9253], 4);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
  let markers = {};

  // Load parceiros
  let parceiros = load() || defaultParceiros.slice();
  save(); // persist sample if empty

  // Render initial
  renderParceiros();
  fitMapBounds();

  // UI year
  document.getElementById('year').textContent = new Date().getFullYear();

  // ---------- Helper functions ----------
  function genId(){ return Math.random().toString(36).slice(2,10); }

  function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(parceiros)); }
  function load(){
    try{
      const s = localStorage.getItem(STORAGE_KEY);
      return s ? JSON.parse(s) : null;
    }catch(e){ console.error(e); return null; }
  }

  function renderParceiros(){
    // clear
    parceirosListEl.innerHTML = '';
    Object.values(markers).forEach(m => map.removeLayer(m));
    markers = {};

    const paises = new Set();

    parceiros.forEach(p => {
      paises.add(p.pais || 'Brasil');

      const item = document.createElement('div');
      item.className = 'parceiro-item';
      item.innerHTML = `
        <h5>${escapeHtml(p.nome || (p.cidade + ' — ' + p.estado))}</h5>
        <p class="estado">${escapeHtml(p.estado)} — ${escapeHtml(p.pais)}</p>
        <p>Responsável: <strong>${escapeHtml(p.responsavel)}</strong></p>
        <p class="muted">${escapeHtml(p.obs || '')}</p>
        <div class="parceiro-actions">
          <button class="btn btn-ghost" data-action="ver" data-id="${p.id}">Ver no mapa</button>
          <button class="btn btn-outline" data-action="editar" data-id="${p.id}">Editar</button>
          <button class="btn btn-ghost" data-action="remover" data-id="${p.id}" style="color:#b00">Remover</button>
        </div>
      `;
      parceirosListEl.appendChild(item);

      // marker
      try {
        if (isFinite(p.lat) && isFinite(p.lng)) {
          const m = L.marker([Number(p.lat), Number(p.lng)], { title: p.nome || p.cidade }).addTo(map)
            .bindPopup(`<strong>${escapeHtml(p.nome || p.cidade)}</strong><br>${escapeHtml(p.estado)} — ${escapeHtml(p.pais)}<br><em>Responsável: ${escapeHtml(p.responsavel)}</em>`);
          markers[p.id] = m;
        }
      } catch(e){ console.warn('marker error', e); }
    });

    // stats
    totalLocaisEl.textContent = parceiros.length;
    totalPaisesEl.textContent = paises.size;
    if (uiLocais) uiLocais.textContent = parceiros.length;
    if (uiPaises) uiPaises.textContent = paises.size;
  }

  function fitMapBounds(){
    const coords = parceiros.map(p => [Number(p.lat), Number(p.lng)]).filter(c => c.every(x => isFinite(x)));
    if (coords.length) {
      const bounds = L.latLngBounds(coords);
      map.fitBounds(bounds.pad(0.5));
    }
  }

  // escape for safety in innerHTML building
  function escapeHtml(s){ if (!s && s !== 0) return ''; return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  // ---------- Event delegation for partner actions ----------
  parceirosListEl.addEventListener('click', (ev) => {
    const btn = ev.target.closest('button');
    if (!btn) return;
    const action = btn.dataset.action;
    const id = btn.dataset.id;
    if (action === 'ver') {
      const p = parceiros.find(x => x.id === id);
      if (p && markers[id]) { map.setView([p.lat, p.lng], 13, {animate:true}); markers[id].openPopup(); }
    } else if (action === 'editar') {
      openEditModal(id);
    } else if (action === 'remover') {
      if (confirm('Remover este local parceiro?')) {
        parceiros = parceiros.filter(x => x.id !== id);
        save();
        renderParceiros();
      }
    }
  });

  // ---------- Modal controls ----------
  function openModal(){
    modal.setAttribute('aria-hidden','false');
    modal.classList.add('show');
  }
  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    modal.classList.remove('show');
    parceiroForm.reset();
    parceiroIdInput.value = '';
    outroGroup.style.display = 'none';
    saveBtn.textContent = 'Adicionar';
  }

  openAddModalBtn.addEventListener('click', () => {
    modalTitle.textContent = 'Adicionar Local Parceiro';
    saveBtn.textContent = 'Adicionar';
    openModal();
  });

  closeModalBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);

  // responsavel select show/hide
  responsavelSelect.addEventListener('change', () => {
    outroGroup.style.display = (responsavelSelect.value === 'Outro') ? 'block' : 'none';
  });

  // Add/Edit submit
  parceiroForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = parceiroIdInput.value;
    const nome = (cidadeInput.value || '').trim();
    const estado = (estadoInput.value || '').trim();
    const pais = (paisInput.value || 'Brasil').trim();
    const lat = Number(latInput.value);
    const lng = Number(lngInput.value);
    let responsavel = responsavelSelect.value;
    if (responsavel === 'Outro') responsavel = (outroResponsavelInput.value || 'Outro').trim();
    const obs = (observacoesInput.value || '').trim();

    if (!nome || !estado || !pais || !isFinite(lat) || !isFinite(lng) || !responsavel) {
      alert('Preencha todos os campos obrigatórios corretamente.');
      return;
    }

    if (id) {
      // editar
      const p = parceiros.find(x => x.id === id);
      if (p) {
        p.nome = nome;
        p.cidade = nome;
        p.estado = estado;
        p.pais = pais;
        p.lat = lat;
        p.lng = lng;
        p.responsavel = responsavel;
        p.obs = obs;
      }
    } else {
      // novo
      const novo = { id: genId(), nome, cidade: nome, estado, pais, lat, lng, responsavel, obs };
      parceiros.push(novo);
    }

    save();
    renderParceiros();
    fitMapBounds();
    closeModal();
  });

  function openEditModal(id){
    const p = parceiros.find(x => x.id === id);
    if (!p) return;
    modalTitle.textContent = 'Editar Local Parceiro';
    parceiroIdInput.value = p.id;
    cidadeInput.value = p.nome || p.cidade || '';
    estadoInput.value = p.estado || '';
    paisInput.value = p.pais || 'Brasil';
    latInput.value = p.lat;
    lngInput.value = p.lng;
    if (['Dr. Giovani de Góuvani','Dra. Pamella','Dr. Abimael'].includes(p.responsavel)) {
      responsavelSelect.value = p.responsavel;
      outroGroup.style.display = 'none';
      outroResponsavelInput.value = '';
    } else {
      responsavelSelect.value = 'Outro';
      outroGroup.style.display = 'block';
      outroResponsavelInput.value = p.responsavel;
    }
    observacoesInput.value = p.obs || '';
    saveBtn.textContent = 'Salvar';
    openModal();
  }

  // ---------- Export / Import ----------
  exportBtn.addEventListener('click', () => {
    const dataStr = JSON.stringify(parceiros, null, 2);
    const blob = new Blob([dataStr], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bsc_parceiros_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  });

  importBtn.addEventListener('click', () => importFileInput.click());
  importFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!Array.isArray(data)) throw new Error('JSON inválido: array esperado.');
        // Validate minimal fields
        const ok = data.every(d => d.id && d.lat && d.lng && (d.nome || d.cidade));
        if (!ok) throw new Error('Formato do JSON não corresponde ao esperado.');
        parceiros = data;
        save();
        renderParceiros();
        fitMapBounds();
        alert('Importação concluída.');
      } catch(err){
        alert('Erro ao importar: ' + err.message);
      }
    };
    reader.readAsText(file);
  });

  // ---------- Org chart filtering ----------
  orgNodes.forEach(node => {
    node.addEventListener('click', () => {
      const name = node.dataset.name;
      filterByResponsavel(name);
    });
  });

  resetFilterBtn.addEventListener('click', () => {
    renderParceiros();
    fitMapBounds();
  });

  function filterByResponsavel(name) {
    // hide markers not matching
    Object.keys(markers).forEach(id => {
      const p = parceiros.find(x => x.id === id);
      if (!p) return;
      const keep = (p.responsavel === name) || (p.responsavel.startsWith(name));
      if (keep) {
        markers[id].addTo(map);
      } else {
        map.removeLayer(markers[id]);
      }
    });
    // update list UI
    Array.from(parceirosListEl.children).forEach((el,i) => {
      const p = parceiros[i];
      if (!p) return;
      el.style.display = (p.responsavel === name || p.responsavel.startsWith(name)) ? '' : 'none';
    });
  }

  // ---------- small helper ----------
  function isFinite(n){ return Number.isFinite(n); }

});
