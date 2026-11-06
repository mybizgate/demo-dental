/* Dental Clinic — premium-01 behaviour
   Fees, dentists, availability and triage answers all live in the data below,
   so the clinic edits one file instead of answering the same WhatsApp fifty times. */
(() => {
  'use strict';

  const SITE = {
    name: 'Dental Clinic',
    whatsapp: '601158121239',
    storageKey: 'dental_premium_v1',
    hours: { 0: null, 1: [9, 18], 2: [9, 18], 3: [9, 18], 4: [9, 18], 5: [9, 18], 6: [9, 16] }, // Sunday = 0, null = closed
    slotHours: [9, 10, 11, 12, 14, 15, 16, 17]
  };

  const DENTISTS = [
    { name: 'Dr. Hafiz Rahman', role: 'Principal · nervous patients', img: 'images/prem-dentist-portrait.webp', days: [1, 2, 3, 4, 5, 6] },
    { name: 'Dr. Mei Lin Chong', role: 'Children & family', img: 'images/consultation.jpg', days: [1, 2, 3, 5, 6] },
    { name: 'Dr. Priya Nair', role: 'Aligners & smile planning', img: 'images/dental-aligner-planning-v2.webp', days: [2, 3, 4, 5] }
  ];

  const FEES = [
    { cat: 'Check-up & hygiene', ico: '🪥', from: 80, blurb: 'Where every new patient starts.', items: [
      { name: 'New patient check-up', mins: 30, price: 80, desc: 'Full examination, photos on screen, written plan.' },
      { name: 'Scaling & polishing', mins: 45, price: 150, desc: 'Ultrasonic clean, polish, fluoride. Gentle setting available.' },
      { name: 'Digital X-ray (per film)', mins: 10, price: 40, desc: 'Low-dose, shown to you on the screen immediately.' },
      { name: 'Check-up + scaling bundle', mins: 60, price: 200, desc: 'Both in one visit. Most adults choose this twice a year.' }
    ]},
    { cat: 'Children', ico: '🧸', from: 0, blurb: 'Free first look for under-fives.', items: [
      { name: 'Child first visit (under 5)', mins: 20, price: 0, desc: 'Ride the chair, count teeth, pick a sticker. No instruments.' },
      { name: 'Child check-up & polish', mins: 30, price: 70, desc: 'Gentle polish, fluoride varnish, brushing coaching for parents.' },
      { name: 'Fissure sealant (per tooth)', mins: 15, price: 60, desc: 'Painless protective coating for new molars.' },
      { name: 'Child filling (tooth-coloured)', mins: 30, price: 120, desc: 'Numbing gel first, always. Breaks whenever they need.' }
    ]},
    { cat: 'Fillings & repairs', ico: '🩹', from: 150, blurb: 'Tooth-coloured, numbed, narrated.', items: [
      { name: 'Composite filling (small)', mins: 30, price: 150, desc: 'Tooth-coloured. Fee confirmed after examination.' },
      { name: 'Composite filling (large)', mins: 45, price: 250, desc: 'For deeper decay or a replaced old amalgam.' },
      { name: 'Root canal (front tooth)', mins: 90, price: 800, desc: 'Usually two visits. Ceiling screen strongly recommended.' },
      { name: 'Crown (zirconia)', mins: 60, price: 1800, desc: 'Two visits, digital scan, no goopy impressions.' },
      { name: 'Simple extraction', mins: 30, price: 180, desc: 'Numbing gel, then anaesthetic. Aftercare sent on WhatsApp.' }
    ]},
    { cat: 'Whitening & smile', ico: '✨', from: 650, blurb: 'Shown on screen before you decide.', items: [
      { name: 'In-studio whitening', mins: 75, price: 900, desc: 'One visit, sensitivity-managed, take-home top-up kit.' },
      { name: 'Take-home whitening kit', mins: 30, price: 650, desc: 'Custom trays and gel, results in two weeks.' },
      { name: 'Composite bonding (per tooth)', mins: 45, price: 450, desc: 'Chips, gaps and edges reshaped in one visit.' }
    ]},
    { cat: 'Braces & aligners', ico: '😁', from: 4800, blurb: 'Instalments from RM 200 a month.', items: [
      { name: 'Aligner consultation & scan', mins: 45, price: 0, desc: 'Free digital scan with a preview of the end result.' },
      { name: 'Clear aligners (mild)', mins: 30, price: 4800, desc: 'Illustrative from-price. 0% instalments available.' },
      { name: 'Clear aligners (comprehensive)', mins: 30, price: 8800, desc: 'Illustrative from-price. Reviews every 6–8 weeks.' },
      { name: 'Retainers (pair)', mins: 20, price: 450, desc: 'Scanned, not moulded.' }
    ]},
    { cat: 'Emergencies', ico: '🚨', from: 120, blurb: 'Same-day slots held every morning.', items: [
      { name: 'Emergency assessment', mins: 30, price: 120, desc: 'Find the cause, relieve the pain, plan the fix.' },
      { name: 'Temporary filling / dressing', mins: 20, price: 100, desc: 'Settles a broken tooth until the proper repair.' },
      { name: 'Knocked-out tooth re-implant', mins: 60, price: 350, desc: 'Come within 60 minutes. Keep the tooth in milk.' }
    ]}
  ];

  const SYMPTOMS = [
    { key: 'sharp', label: 'Sharp pain when biting', hint: 'or with hot and cold', urgency: 'soon', urgencyText: 'See us within 48 hours', title: 'Likely a crack, deep decay or a lost filling', now: ['Avoid chewing on that side.', 'Rinse with warm salt water after meals.', 'Paracetamol or ibuprofen as directed on the pack.'], avoid: 'Do not put aspirin on the gum. It burns the tissue.' },
    { key: 'swelling', label: 'Swelling or a bad taste', hint: 'face, gum or jaw', urgency: 'today', urgencyText: 'Same-day slot. Message now.', title: 'Possible abscess. This needs antibiotics or drainage today', now: ['Cold compress on the outside of the face, 10 minutes on, 10 off.', 'Keep your head raised, even when resting.', 'Do not squeeze or pop anything.'], avoid: 'If swelling reaches the eye or you struggle to swallow or breathe, go to the nearest emergency department now.' },
    { key: 'broken', label: 'Chipped or broken tooth', hint: 'no bleeding', urgency: 'soon', urgencyText: 'See us within 2–3 days', title: 'Usually repairable with bonding or a dressing', now: ['Keep any fragment in a clean container.', 'Cover sharp edges with sugar-free gum or dental wax.', 'Stick to soft foods.'], avoid: 'Do not file the edge yourself.' },
    { key: 'knocked', label: 'Tooth knocked out', hint: 'adult tooth', urgency: 'today', urgencyText: 'Come within 60 minutes', title: 'Minutes matter. We hold a chair for this', now: ['Hold the tooth by the crown, never the root.', 'Rinse briefly in milk, do not scrub.', 'Put it back in the socket if you can, or keep it in milk.', 'Message us and come straight in.'], avoid: 'Do not let the tooth dry out or wrap it in tissue.' },
    { key: 'bleeding', label: 'Bleeding gums', hint: 'when brushing', urgency: 'routine', urgencyText: 'Book a hygiene visit this month', title: 'Most often early gum disease, very treatable', now: ['Keep brushing the area gently twice a day, bleeding reduces within a week.', 'Floss or use interdental brushes daily.', 'Book scaling & polishing.'], avoid: 'Do not stop brushing the bleeding area. That makes it worse.' },
    { key: 'sensitive', label: 'Sensitive to cold or sweet', hint: 'short, sharp twinge', urgency: 'routine', urgencyText: 'Book a check-up in the next few weeks', title: 'Exposed dentine or early decay', now: ['Switch to a sensitivity toothpaste and do not rinse after brushing.', 'Use a soft brush, light pressure.', 'Note which tooth and what triggers it.'], avoid: 'Avoid whitening products until we have checked.' }
  ];

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const money = (n) => (n === 0 ? 'Free' : `RM ${n.toLocaleString('en-MY')}`);
  const pad = (n) => String(n).padStart(2, '0');
  const isoDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const hourLabel = (h) => `${((h + 11) % 12) + 1}:00 ${h >= 12 ? 'PM' : 'AM'}`;
  const allItems = FEES.flatMap((g) => g.items.map((i) => ({ ...i, cat: g.cat })));

  const toastEl = $('#toast'); let toastTimer;
  const toast = (m) => { toastEl.textContent = m; toastEl.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2400); };

  /* header */
  const header = $('#siteHeader'); const navLinks = $('#navLinks'); const menuToggle = $('#menuToggle');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  menuToggle.addEventListener('click', () => { const open = navLinks.classList.toggle('open'); document.body.classList.toggle('menu-open', open); menuToggle.setAttribute('aria-expanded', String(open)); });
  navLinks.addEventListener('click', (e) => { if (e.target.closest('a')) { navLinks.classList.remove('open'); document.body.classList.remove('menu-open'); menuToggle.setAttribute('aria-expanded', 'false'); } });
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) $$('.nav-links a').forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${en.target.id}`)); }), { rootMargin: '-40% 0px -55% 0px' });
    $$('main section[id]').forEach((s) => spy.observe(s));
  }

  /* fee guide */
  const feeGroups = $('#feeGroups'); const serviceSelect = $('#service');
  feeGroups.innerHTML = FEES.map((g, i) => `
    <details class="fee-group" ${i === 0 ? 'open' : ''}>
      <summary><span class="ico">${g.ico}</span><div><h3>${g.cat}</h3><p>${g.blurb}</p></div><span class="from"><small>from</small>${money(g.from)}</span></summary>
      <div class="fee-rows">${g.items.map((it) => `<div class="fee-row"><strong>${it.name}</strong><p>${it.mins} min · ${it.desc}</p><span class="price">${money(it.price)}<small>${it.price ? 'from' : 'no charge'}</small></span><a class="button button-soft" href="#book" data-select-service="${it.name}">Book</a></div>`).join('')}</div>
    </details>`).join('');
  FEES.forEach((g) => { const og = document.createElement('optgroup'); og.label = g.cat; g.items.forEach((it) => { const o = document.createElement('option'); o.value = it.name; o.textContent = `${it.name} · ${money(it.price)}`; og.append(o); }); serviceSelect.append(og); });
  const extra = document.createElement('optgroup'); extra.label = 'Not sure';
  ['Toothache / emergency', 'Second opinion', 'Just a chat first'].forEach((n) => { const o = document.createElement('option'); o.textContent = n; extra.append(o); });
  serviceSelect.append(extra);

  /* schedule per dentist */
  const seed = (str) => { let h = 2166136261; for (const c of str) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return () => { h += 0x6D2B79F5; let t = Math.imul(h ^ (h >>> 15), 1 | h); t ^= t + Math.imul(t ^ (t >>> 7), 61 | t); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
  const today = new Date(); today.setHours(0, 0, 0, 0); const now = new Date();
  const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(today); d.setDate(today.getDate() + i); return d; });
  const scheduleFor = (dentist, d) => {
    const hrs = SITE.hours[d.getDay()]; if (!hrs || !dentist.days.includes(d.getDay())) return [];
    const rnd = seed(dentist.name + isoDate(d));
    return SITE.slotHours.filter((h) => h >= hrs[0] && h < hrs[1]).map((h) => {
      const r = rnd(); let state = r < 0.45 ? 'open' : r < 0.65 ? 'limited' : 'full';
      if (isoDate(d) === isoDate(now) && h <= now.getHours()) state = 'full';
      return { hour: h, state };
    });
  };
  const schedules = DENTISTS.map((dn) => days.map((d) => ({ date: d, slots: scheduleFor(dn, d) })));
  const openCount = (day) => day.slots.filter((s) => s.state !== 'full').length;
  const dayShort = (d) => d.toLocaleDateString('en-MY', { weekday: 'short' });
  const dayLong = (d) => d.toLocaleDateString('en-MY', { weekday: 'long', day: 'numeric', month: 'long' });

  const state = { dentist: 0, day: 0, hour: null };
  const dentistTabs = $('#dentistTabs'); const dayStrip = $('#dayStrip'); const slots = $('#slots'); const slotTitle = $('#slotTitle');
  const dateInput = $('#date'); const timeSelect = $('#time'); const dentistSelect = $('#dentist');
  dateInput.min = isoDate(today);
  DENTISTS.forEach((dn) => { const o = document.createElement('option'); o.textContent = dn.name; dentistSelect.append(o); });

  const fillTimes = () => {
    const sched = schedules[state.dentist][state.day];
    timeSelect.innerHTML = '<option value="">Choose a time</option>' + (sched && sched.slots.length ? sched.slots.map((s) => `<option value="${hourLabel(s.hour)}" ${s.state === 'full' ? 'disabled' : ''}>${hourLabel(s.hour)}${s.state === 'full' ? ' · booked' : s.state === 'limited' ? ' · last one' : ''}</option>`).join('') : SITE.slotHours.map((h) => `<option>${hourLabel(h)}</option>`).join(''));
  };
  const renderBoard = () => {
    $$('button', dentistTabs).forEach((b, i) => b.setAttribute('aria-selected', String(i === state.dentist)));
    const sched = schedules[state.dentist];
    dayStrip.innerHTML = sched.map((day, i) => { const n = openCount(day); return `<button type="button" role="tab" aria-selected="${i === state.day}"><small>${i === 0 ? 'Today' : dayShort(day.date)}</small><strong>${day.date.getDate()}</strong><em class="${day.slots.length === 0 || n === 0 ? 'none' : n <= 2 ? 'few' : ''}">${day.slots.length === 0 ? 'off' : n === 0 ? 'full' : `${n} open`}</em></button>`; }).join('');
    const day = sched[state.day];
    slotTitle.textContent = `${DENTISTS[state.dentist].name.replace('Dr. ', 'Dr ')} · ${dayLong(day.date)}`;
    slots.innerHTML = day.slots.length ? day.slots.map((s) => `<button type="button" class="slot ${s.state}${state.hour === s.hour ? ' selected' : ''}" data-hour="${s.hour}" ${s.state === 'full' ? 'disabled' : ''}><strong>${hourLabel(s.hour)}</strong><span>${s.state === 'full' ? 'Booked' : s.state === 'limited' ? 'Last one' : 'Open'}</span></button>`).join('') : `<p class="empty">${DENTISTS[state.dentist].name} is not in on this day. Try another day or dentist.</p>`;
  };
  DENTISTS.forEach((dn, i) => { const b = document.createElement('button'); b.type = 'button'; b.role = 'tab'; b.innerHTML = `<img src="${dn.img}" alt="">${dn.name}`; b.addEventListener('click', () => selectDentist(i)); dentistTabs.append(b); });
  function selectDentist(i) { state.dentist = i; state.hour = null; dentistSelect.value = DENTISTS[i].name; renderBoard(); fillTimes(); timeSelect.value = ''; updateSummary(); }
  dayStrip.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; state.day = [...dayStrip.children].indexOf(b); state.hour = null; dateInput.value = isoDate(days[state.day]); renderBoard(); fillTimes(); timeSelect.value = ''; updateSummary(); });
  slots.addEventListener('click', (e) => { const b = e.target.closest('.slot:not(.full)'); if (!b) return; state.hour = Number(b.dataset.hour); dateInput.value = isoDate(days[state.day]); dentistSelect.value = DENTISTS[state.dentist].name; renderBoard(); fillTimes(); timeSelect.value = hourLabel(state.hour); updateSummary(); toast(`${hourLabel(state.hour)} with ${DENTISTS[state.dentist].name} selected`); $('#book').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); });
  dentistSelect.addEventListener('change', () => { const i = DENTISTS.findIndex((d) => d.name === dentistSelect.value); if (i >= 0) { state.dentist = i; renderBoard(); } fillTimes(); updateSummary(); });
  dateInput.addEventListener('change', () => { const i = days.findIndex((d) => isoDate(d) === dateInput.value); if (i >= 0) { state.day = i; state.hour = null; renderBoard(); } fillTimes(); updateSummary(); });
  timeSelect.addEventListener('change', updateSummary);
  document.addEventListener('click', (e) => { const b = e.target.closest('[data-select-dentist]'); if (b) selectDentist(DENTISTS.findIndex((d) => d.name === b.dataset.selectDentist)); });
  renderBoard(); fillTimes();

  // next free chair (any dentist)
  const nextFree = (() => {
    for (let d = 0; d < 7; d++) for (const [i, sched] of schedules.entries()) { const open = sched[d].slots.find((s) => s.state !== 'full'); if (open) return { dentist: DENTISTS[i].name, day: d, hour: open.hour }; }
    return null;
  })();
  $('#nextChair').textContent = nextFree ? `${nextFree.dentist} · ${nextFree.day === 0 ? 'Today' : dayShort(days[nextFree.day])} ${hourLabel(nextFree.hour)}` : 'Fully booked this week';

  /* triage */
  const symptoms = $('#symptoms'); const triage = $('#triageCard');
  symptoms.innerHTML = SYMPTOMS.map((s) => `<button type="button" data-key="${s.key}" aria-pressed="false"><strong>${s.label}</strong><span>${s.hint}</span></button>`).join('');
  symptoms.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    $$('button', symptoms).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    const s = SYMPTOMS.find((x) => x.key === b.dataset.key);
    const msg = encodeURIComponent(`Hi ${SITE.name}, I need an urgent appointment.\nSymptom: ${s.label} (${s.hint}).\nStarted: \nName: \nPlease call me back with the next available slot.`);
    triage.innerHTML = `<span class="urgency ${s.urgency}">${s.urgency === 'today' ? '🔴' : s.urgency === 'soon' ? '🟠' : '🟢'} ${s.urgencyText}</span><h3>${s.title}</h3><ol>${s.now.map((n) => `<li>${n}</li>`).join('')}</ol><p class="avoid">⚠ ${s.avoid}</p><div class="triage-actions"><a class="button button-ink" href="https://wa.me/${SITE.whatsapp}?text=${msg}" target="_blank" rel="noopener">Request a callback</a><a class="button button-soft" href="#book" data-select-service="Toothache / emergency">Book a slot instead</a></div>`;
  });

  /* summary + form */
  const form = $('#bookForm'); const status = $('#formStatus'); const who = $('#who'); const nervous = $('#nervous');
  function updateSummary() {
    const item = allItems.find((i) => i.name === serviceSelect.value);
    $('#sumDentist').textContent = dentistSelect.value || 'Any dentist';
    $('#sumService').textContent = serviceSelect.value || 'Not chosen yet';
    $('#sumFee').textContent = item ? `${money(item.price)} · ${item.mins} min${nervous.checked ? ' + 15 gentle-care' : ''}` : (serviceSelect.value ? 'Confirmed after examination' : '—');
    $('#sumWhen').textContent = dateInput.value && timeSelect.value ? `${new Date(`${dateInput.value}T00:00:00`).toLocaleDateString('en-MY', { weekday: 'short', day: 'numeric', month: 'short' })} · ${timeSelect.value}` : 'Pick a slot above';
  }
  serviceSelect.addEventListener('change', updateSummary); nervous.addEventListener('change', updateSummary);
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-select-service]'); if (!b) return;
    serviceSelect.value = b.dataset.selectService; if (b.dataset.selectFor) who.value = b.dataset.selectFor; updateSummary();
  });
  const compose = (d) => {
    const item = allItems.find((i) => i.name === d.service);
    return [`${SITE.name} — appointment request`, `Patient: ${d.name} (${d.who})`, `WhatsApp: ${d.phone}`, `Treatment: ${d.service}${item ? ` (${money(item.price)}, ${item.mins} min)` : ''}`, `Dentist: ${d.dentist}`, `Date & time: ${d.date} at ${d.time}`, `Gentle-care slot: ${d.nervous ? 'Yes please' : 'No'}`, `Notes: ${d.notes || '-'}`, '', 'Sent from the studio website. Reply "confirmed" or suggest the nearest slot.'].join('\n');
  };
  const validate = () => { status.classList.remove('error'); if (!form.reportValidity()) { status.textContent = 'Please complete the highlighted fields.'; status.classList.add('error'); return null; } return Object.fromEntries(new FormData(form).entries()); };
  const load = () => { try { return JSON.parse(localStorage.getItem(SITE.storageKey) || '[]'); } catch (_) { return []; } };
  const renderRecent = () => { const list = load(); $('#recentWrap').hidden = !list.length; $('#recentList').innerHTML = list.map((r) => `<li><span>${r.date} · ${r.time}</span>${r.service}</li>`).join(''); };
  const remember = (d) => { try { const list = load(); list.unshift({ ...d, createdAt: new Date().toISOString() }); localStorage.setItem(SITE.storageKey, JSON.stringify(list.slice(0, 5))); } catch (_) { /* no storage */ } renderRecent(); };
  renderRecent();
  form.addEventListener('submit', (e) => { e.preventDefault(); const d = validate(); if (!d) return; remember(d); status.textContent = 'Saved on this device. Opening WhatsApp with your request…'; window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(compose(d))}`, '_blank', 'noopener'); });
  $('#copyMessage').addEventListener('click', async () => { const d = validate(); if (!d) return; try { await navigator.clipboard.writeText(compose(d)); remember(d); status.textContent = 'Message copied. Paste it into any chat.'; } catch (_) { status.textContent = 'Copy is not available here. Use the WhatsApp button.'; status.classList.add('error'); } });

  /* open now */
  const openNow = $('#openNow'); const h = SITE.hours[now.getDay()]; const nowH = now.getHours() + now.getMinutes() / 60;
  if (!h) { openNow.textContent = 'Closed today · emergencies by WhatsApp'; openNow.classList.add('closed'); }
  else if (nowH >= h[0] && nowH < h[1]) openNow.textContent = `Open now · until ${hourLabel(h[1])}`;
  else { openNow.textContent = `Closed now · opens ${hourLabel(h[0])}`; openNow.classList.add('closed'); }

  /* counters + reveal */
  const runCounter = (el) => { const end = Number(el.dataset.count); const suf = el.dataset.suffix || ''; if (reduceMotion) { el.textContent = end + suf; return; } const t0 = performance.now(); const tick = (t) => { const p = Math.min(1, (t - t0) / 1200); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); };
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (!en.isIntersecting) return; en.target.classList.add('show'); $$('[data-count]', en.target).forEach(runCounter); io.unobserve(en.target); }), { threshold: .1 });
    revealEls.forEach((el) => io.observe(el));
  } else revealEls.forEach((el) => { el.classList.add('show'); $$('[data-count]', el).forEach(runCounter); });

  $('#year').textContent = String(new Date().getFullYear());
})();
