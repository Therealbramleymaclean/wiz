/* The Door page — receive a caller, put things on the bench, answer.
   The consume is rendered as a distinct scene: no bench, no actions, just the choice. */
function pageDoor() {
  let h = '';

  if (!S.supplicant) {
    h += `<div class="door quiet"><p class="asks">The stair is empty. Somebody will come.</p></div>`;
  } else if (S.supplicant.trouble === 'consume') {
    /* The consume scene. */
    const sp = S.supplicant;
    h += `<div class="door" style="border-color:var(--candle)">
      <div class="who">${sp.who}</div>
      <p class="asks">${sp.ask}</p>
      <p class="asks" style="margin-top:8px;opacity:.7">${sp.when}</p>
    </div>
    <div class="acts" style="margin-top:14px">
      <button class="go" onclick="doConsume()">The consume</button>
      <button class="ghost" onclick="sendBack()">Send them back</button>
    </div>`;
    h += `<h2>What has been happening</h2><div class="logbox">
      <ol>${S.log.slice(0, 12).map(l => `<li>${l}</li>`).join('')}</ol></div>`;
    return h;
  } else {
    const sp = S.supplicant, mx = maxActions(), mod = [2,1,0,-1][S.used];
    const say = [
      'You have not kept them waiting.',
      'Brisk.',
      'Thorough.',
      'They have been here half the afternoon.',
    ][S.used];
    h += `<div class="door"><div class="who">${sp.who}</div><p class="asks">${sp.ask}</p></div>
      <div class="clock"><span class="pips">${
        Array.from({ length: mx }, (_, i) =>
          `<span class="pip ${i < S.used ? 'spent' : ''} ${i === 3 ? 'bonus' : ''}</span>`
        ).join('')
      }</span>
        <span>${leftAct()} of ${mx} left</span>
        <span class="judged ${mod < 0 ? 'bad' : ''}">${say}${mod ? ' (' + (mod > 0 ? '+' : '') + mod + ')' : ''}</span></div>`;

    const rev = revealed(), tags = benchTags();
    h += '<div class="needs">' + needsOf().map(n =>
      !rev.includes(n)
        ? '<span class="need hidden">?</span>'
        : `<span class="need ${tags.has(n) ? 'met' : 'known'}">${n}</span>`
    ).join('') + '</div>';

    const spent = q => S.asked.includes(q);
    const none = leftAct() <= 0;
    const unk = needsOf().some(n => !rev.includes(n));
    h += `<div class="acts">
      <button class="q" onclick="ask('n0')"     ${spent('n0')||none?'disabled':''}>&ldquo;When is it worst?&rdquo;</button>
      <button class="q" onclick="ask('n1')"     ${spent('n1')||none?'disabled':''}>&ldquo;Let me look at you.&rdquo;</button>
      <button class="q" onclick="ask('tried')"  ${spent('tried')||none?'disabled':''}>&ldquo;What have you tried?&rdquo;</button>
      ${S.kit.lhand==='orb' ? `<button class="q free" onclick="orb()" ${S.orbUsed||!unk?'disabled':''}>Look into the orb (free)</button>` : ''}
      <button class="q insight" onclick="intuit()" ${S.insight<INTUIT_COST||!unk?'disabled':''}>Simply know it (${INTUIT_COST}i, free)</button>
      <button class="q turn"    onclick="turnAway()">Turn them away &mdash; ${S.rep > 0 ? '&minus;1 renown' : 'they will remember it'}</button></div>`;
    h += S.said.map(s => `<p class="said">${s}</p>`).join('');
  }

  h += `<h2>On the bench</h2><div class="bench">`;
  const bc = benchCap();
  for (let i = 0; i < bc; i++) {
    const id = S.bench[i];
    h += id
      ? `<button class="slot full" style="border-left:3px solid var(${item(id).col})" onclick="unplace(${i})">${
          cap(item(id).name)}<span class="tags">${tagStr(id)}</span></button>`
      : '<div class="slot">empty</div>';
  }
  h += '</div>';

  const n = S.bench.length, ready = n >= 1 && S.supplicant;
  h += `<div>
    <button class="go" onclick="answer()" ${ready ? '' : 'disabled'}>Give them what you have made${
      n === 1 ? ' \u2014 one thing (+2)' : n === 2 ? ' \u2014 two things (+1)' : ''}</button>
    <button class="ghost" onclick="autofill()" ${S.supplicant ? '' : 'disabled'}>Reach for the obvious things</button>
    ${n ? '<button class="ghost" onclick="clearBench()">Put it back</button>' : ''}
  </div>`;

  h += '<div id="outcomeWrap">' + outcomeHTML() + '</div>';
  h += '<h2>Things you have to hand</h2>' + shelfHTML(id => `place('${id}')`, S.bench.length >= benchCap());
  h += `<h2>What has been happening</h2><div class="logbox">
    <button class="ghost" style="margin:0 0 6px 0" onclick="clearLog()">Clear</button>
    <ol>${S.log.map(l => `<li>${l}</li>`).join('')}</ol></div>`;
  return h;
}
