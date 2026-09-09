/* Boot: show the creator or the game, then run the tick. */
function boot() {
  if (!S.setup) {
    drawCreator();
  } else {
    $('creator-mount').style.display = 'none';
    $('stbar').hidden = false;
    $('page').hidden = false;
    renderAll();
  }
  setInterval(() => {
    if (!S.setup) return;
    const n = Date.now();
    simulate(S, n - S.lastUpdate);
    S.lastUpdate = n;
    if (DIRTY) renderAll(); else renderTick();
  }, 500);
}
boot();
