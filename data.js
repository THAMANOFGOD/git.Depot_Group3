// data.js
// Données initiales et fonctions utilitaires pour BTP_appGRP3
// Ne modifie que si tu sais ce que tu fais.
// Ce fichier fournit : BTP_getData(), BTP_saveData(data), BTP_newId()



(function(){
  // Données initiales (exemples)
  const initial = {
    materials: [
      { id: 'MAT001', name: 'Ciment 50kg', qty: 120, unit: 'sacs', location: 'Entrepôt A', price: 6500, description: 'Ciment Portland' },
      { id: 'MAT002', name: 'Sable (m³)', qty: 20, unit: 'm3', location: 'Entrepôt B', price: 15000, description: 'Sable grossier' },
      { id: 'MAT003', name: 'Barre acier 12mm', qty: 500, unit: 'm', location: 'Entrepôt A', price: 1200, description: 'Acier T12' }
    ],
    services: [
      { id: 'SRV001', title: 'Terrassement', desc: 'Préparation du terrain et évacuation' },
      { id: 'SRV002', title: 'Coffrage & Ferraillage', desc: 'Coffrage pour fondations et ferraillage' },
      { id: 'SRV003', title: 'Bétonnage', desc: 'Bétonnage structurel' }
    ],
    contacts: [
      { id: 'CT001', name: 'Mme A. Tata', role: 'Responsable Achat', phone: '+237 6 77 00 11 22', email: 'achat@btpgrp3.cm' },
      { id: 'CT002', name: 'M. P. Bedi', role: 'Chef Chantier', phone: '+237 6 77 00 33 44', email: 'chantier@btpgrp3.cm' }
    ]
  };

   // Key localStorage
  const LS_KEY = 'BTP_appGRP3_data_v1';

  // Restore from localStorage or initial
  function load() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) {
        localStorage.setItem(LS_KEY, JSON.stringify(initial));
        return JSON.parse(JSON.stringify(initial));
      }
      return JSON.parse(raw);
    } catch (e) {
      console.error('Erreur lecture storage, fallback to initial', e);
      return JSON.parse(JSON.stringify(initial));
    }
  }

  function save(data) {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
  }

  // Generate new ID for material: MAT + 3-digit increment based on existing
  function newMaterialId(data) {
    const existing = data.materials.map(m => m.id).filter(id => id.startsWith('MAT')).map(id => parseInt(id.slice(3)));
    const maxn = existing.length ? Math.max(...existing) : 0;
    const n = (maxn + 1).toString().padStart(3,'0');
    return 'MAT' + n;
  }

  // Expose to window
  window.BTP_getData = load;
  window.BTP_saveData = save;
  window.BTP_newMaterialId = newMaterialId;

  // Helpful small util
  window.BTP_findMaterialById = function(id) {
    const d = load();
    return d.materials.find(m => m.id === id) || null;
  };
  console.log("Test");

})();
