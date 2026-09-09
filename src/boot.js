/* Boot: resume a save or show the creator, then run the tick with autosave. */
function boot() {
  if (!S.setup) loadGame();
  if (!S.setup) {
    drawCreator();
  } else {
    $('creator-mount').style.display = 'none';
    $('stbar').hidden = false;
    $('page').hidden = false;
    renderAll();
  }
  let autosaveIn = 0;
  setInterval(() => {
    if (!S.setup) return;
    const n = Date.now();
    /* Cap catch-up so a long absence doesn't become one giant tick. */
    simulate(S, Math.min(n - S.lastUpdate, OFFLINE_CAP));
    S.lastUpdate = n;
    if (DIRTY) renderAll(); else renderTick();
    if (++autosaveIn >= 10) { autosaveIn = 0; saveGame(); }  /* every 5 s */
  }, 500);
  window.addEventListener('beforeunload', saveGame);
  document.addEventListener('visibilitychange', () => { if (document.hidden) saveGame(); });
}
boot();
