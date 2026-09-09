/* Character creator overlay — shown once, on first load. */

let CREATE = {
  name: '',
  location: null,
  kit: { head: 'none', body: 'none', legs: 'none',
         lhand: 'none', rhand: 'none', feet: 'none' },
  curio: null,
};

function drawCreator() {
  const c = CREATE;
  const locChosen = START_LOCATIONS.find(l => l.id === c.location);
  const curioChosen = CURIOS.find(x => x.id === c.curio);
  const madlibLine = locChosen && c.name && curioChosen
    ? `${c.name}, ${kitDescriptor(c.kit, false)}, arriving at ${locChosen.name} with ${curioChosen.name.toLowerCase()}.`
    : 'Fill in the pieces below.';

  let h = `<div class="in">
    <h1>Before we begin</h1>
    <p class="lede">You wake in a shack you do not remember arriving at. Some things are already true of you.</p>

    <h2>Your name</h2>
    <input class="nm" placeholder="What they will call you" value="${c.name.replace(/"/g, '&quot;')}" onblur="createSet('name',this.value)">

    <h2>Where the shack stands</h2>
    ${START_LOCATIONS.map(l => `<button class="loc ${c.location===l.id?'on':''}" onclick="createSet('location','${l.id}')">
      <b>${cap(l.name)}</b>${l.flavour}
      <span>Nearby: ${l.places.map(p => PLACES.find(x => x.id === p).name).join(' \u00b7 ')}</span></button>`).join('')}

    <h2>What you look like</h2>
    <div class="grid2">${Object.keys(KIT).map(k => `<div class="sl"><b>${SLOTNAME[k]}</b>
      <select onchange="createKit('${k}',this.value)">${
        KIT[k].map(([v, n]) =>
          `<option value="${v}" ${c.kit[k]===v?'selected':''}>${n}</option>`
        ).join('')
      }</select></div>`).join('')}</div>

    <h2>You look around the shack and find\u2026</h2>
    ${CURIOS.map(cu => `<button class="loc ${c.curio===cu.id?'on':''}" onclick="createSet('curio','${cu.id}')">
      <b>${cu.name}</b>${cu.desc}</button>`).join('')}

    <div class="summary">${madlibLine}</div>

    <button class="go begin" onclick="beginGame()" ${(c.name && c.location && c.curio) ? '' : 'disabled'}>Open your eyes</button>
  </div>`;
  $('creator-mount').innerHTML = h;
}

window.createSet = (k, v) => { CREATE[k] = v; drawCreator(); };
window.createKit = (k, v) => { CREATE.kit[k] = v; drawCreator(); };
window.beginGame = () => {
  if (!(CREATE.name && CREATE.location && CREATE.curio)) return;
  S.name = CREATE.name.trim();
  S.location = CREATE.location;
  S.kit = { ...CREATE.kit };
  const loc = START_LOCATIONS.find(l => l.id === CREATE.location);
  loc.startShelf.forEach(id => { S.shelf[id] = (S.shelf[id] || 0) + 1; });
  S.lore = { ...loc.startLore };
  const cu = CURIOS.find(c => c.id === CREATE.curio);
  if (cu.kind === 'mat')  { S.shelf[cu.val] = (S.shelf[cu.val] || 0) + 1; S.lore[cu.val] = [...BASE.find(m => m.id === cu.val).tags]; }
  if (cu.kind === 'book') { if (!S.owned.includes(cu.val)) S.owned.push(cu.val); }
  if (cu.kind === 'kit')  { S.kit[cu.slot] = cu.val; }
  S.setup = true;
  S.log = [`You wake at ${loc.name}. A shack with one room. You do not remember arriving.`];
  SHOP_PROC = [makeProcBook(), makeProcBook(), makeProcBook()];
  $('creator-mount').style.display = 'none';
  $('stbar').hidden = false;
  $('page').hidden = false;
  renderAll();
};
