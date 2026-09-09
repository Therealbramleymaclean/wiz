/* Workshop — combine (with batch quantity) and transmute. */
function pageWork() {
  if (!roomsWith('work').length) {
    return `<h1>No workshop</h1><p class="sub">Set one of your rooms to be a workshop and come back.
      Until then there is nowhere to put anything down.</p>`;
  }

  const N = combineN();
  const allStacks = Object.keys(S.shelf).filter(id => S.shelf[id] >= N && parseId(id).p < 5);
  const filt = S.workFilter;
  const stacks = allStacks
    .filter(id => filt === 'all' || ('t' + parseId(id).p) === filt)
    .sort((a, b) => parseId(b).p - parseId(a).p);
  const tierSet = [...new Set(allStacks.map(id => parseId(id).p))].sort();

  let h = `<h1>The workshop</h1>
    <h2>Combine &mdash; ${N} of the same into one better</h2>
    <p class="note-p">What comes out keeps everything it was and gains one more property. When the input
    still has properties you haven\u2019t worked out, combining reveals them.</p>`;

  if (tierSet.length > 1) {
    h += '<div class="filt"><span style="font-family:var(--sans);font-size:11px;color:var(--dim);padding:5px 3px">Show</span>';
    h += `<button class="${filt==='all'?'on':''}" onclick="setFilt('all')">all</button>`;
    tierSet.forEach(t => {
      h += `<button class="${filt==='t'+t?'on':''}" onclick="setFilt('t${t}')">${POT[t].lab}</button>`;
    });
    h += '</div>';
  }

  h += stacks.length ? stacks.map(id => {
    const it = item(id), { b, p } = parseId(id), out = item(b + '@' + (p + 1));
    const gain = extraTags(b, p + 1).slice(-1)[0];
    const have = S.shelf[id], maxBatches = Math.floor(have / N);
    return `<div class="stack" data-id="${id}">
      <div class="l">${cap(it.name)} <small>you have ${have} \u00b7 unknowns will reveal</small></div>
      <div class="arrow">${N} &rarr;</div>
      <div class="l" style="color:var(${out.col})">${cap(out.name)} <small>gains ${gain}</small></div>
      <div class="qbox">
        <button onclick="qty('${id}',-1)">\u2212</button>
        <input id="q_${id}" type="number" min="1" max="${maxBatches}" value="1" onchange="qtySet('${id}',this.value)">
        <button onclick="qty('${id}',1)">+</button>
        ${maxBatches > 1 ? `<button style="font-size:10px" onclick="qtyMax('${id}')">max</button>` : ''}
      </div>
      <button class="go" onclick="doCombine('${id}')">Combine</button></div>`;
  }).join('') : '<p class="empty-txt">Nothing you have ' + N + ' of yet.</p>';

  h += `<h2>Transmute &mdash; four different things into one other thing</h2>
    <p class="note-p">The result shares a property with what you fed in. Which one it turns out to be
    is not up to you. ${S.transSel.length}/4 chosen.</p>`;
  h += `<div class="shelf">${
    Object.keys(S.shelf).filter(i => S.shelf[i] > 0).map(id => {
      const it = item(id), on = S.transSel.includes(id);
      return `<button class="mat ${on?'sel':''}" style="border-left-color:var(${it.col})" onclick="toggleTrans('${id}')">
        ${cap(it.name)} <span class="n">${S.shelf[id]}</span><span class="tags">${tagStr(id)}</span></button>`;
    }).join('') || '<span class="empty-txt">Nothing to work with.</span>'
  }</div>
  <div style="margin-top:14px">
    <button class="go" onclick="doTrans()" ${S.transSel.length===4?'':'disabled'}>Transmute</button>
    ${S.transSel.length ? '<button class="ghost" onclick="clearTrans()">Clear</button>' : ''}
  </div>`;
  return h;
}
