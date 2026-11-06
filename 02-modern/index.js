/* Dental Clinic — modern-01 behaviour
   Prices, dentists, FAQ answers and the kids' storyboard live in the data below. */
(() => {
  'use strict';

  const SITE = {
    name: 'Dental Clinic',
    whatsapp: '601158121239',
    storageKey: 'dental_modern_v1',
    hours: { 0: null, 1: [9, 19], 2: [9, 19], 3: [9, 19], 4: [9, 19], 5: [9, 19], 6: [9, 17] },
    slotHours: [9, 10, 11, 12, 14, 15, 16, 17, 18]
  };

  const DENTISTS = [
    { name: 'Dr. Aina Zulkifli', role: 'Anxious adults & seniors', img: 'images/mod-senior-smile.webp', days: [1, 2, 3, 4, 5, 6] },
    { name: 'Dr. Ravi Kumar', role: 'Kids, teens & braces', img: 'images/mod-teen-braces.webp', days: [1, 2, 4, 5, 6] },
    { name: 'Dr. Lim Wei Jie', role: 'Fillings, crowns & implants', img: 'images/clinic-hero-checkup-v3.webp', days: [2, 3, 4, 5] }
  ];

  const PRICES = {
    adults: [
      { name: 'Check-up & scan', price: 80, mins: 30, desc: 'Full look, photos on screen, plan with prices.', c: 'blue', tag: 'Start here' },
      { name: 'Scaling & polishing', price: 150, mins: 45, desc: 'Gentle setting available. Fluoride included.', c: 'mint' },
      { name: 'Tooth-coloured filling', price: 150, mins: 30, desc: 'From-price. Numbing gel first, always.', c: 'coral', from: true },
      { name: 'Whitening (in clinic)', price: 850, mins: 75, desc: 'One visit, sensitivity managed, top-up kit.', c: 'yellow' },
      { name: 'Clear aligners', price: 4800, mins: 45, desc: 'From-price. Free scan and preview first.', c: 'blue', from: true },
      { name: 'Root canal', price: 800, mins: 90, desc: 'From-price. Ceiling screen strongly advised.', c: 'coral', from: true },
      { name: 'Crown (zirconia)', price: 1800, mins: 60, desc: 'Digital scan, no goopy moulds.', c: 'mint' },
      { name: 'Simple extraction', price: 180, mins: 30, desc: 'Aftercare on WhatsApp the same evening.', c: 'yellow' },
      { name: 'Emergency visit', price: 120, mins: 30, desc: 'Same-day slots held every morning.', c: 'coral', tag: 'Same day' }
    ],
    kids: [
      { name: 'First visit (under 5)', price: 0, mins: 20, desc: 'Ride the chair, meet Mr. Molar, pick a sticker.', c: 'yellow', tag: 'Free' },
      { name: 'Kids check-up & polish', price: 60, mins: 30, desc: 'Tickle brush, fluoride, certificate.', c: 'blue', tag: 'Most booked' },
      { name: 'Fissure sealant (per tooth)', price: 60, mins: 15, desc: 'Painless armour for new molars.', c: 'mint' },
      { name: 'Kids filling', price: 110, mins: 30, desc: 'Numbing gel first. Breaks whenever they ask.', c: 'coral' },
      { name: 'Teen braces (metal)', price: 3800, mins: 45, desc: 'From-price. Colour bands change monthly.', c: 'blue', from: true },
      { name: 'Teen clear aligners', price: 4800, mins: 45, desc: 'From-price. Free scan and preview.', c: 'mint', from: true },
      { name: 'Mouthguard (sports)', price: 180, mins: 20, desc: 'Scanned, custom, team colours.', c: 'yellow' },
      { name: 'Kids emergency', price: 90, mins: 30, desc: 'Knocked tooth? Come within the hour.', c: 'coral', tag: 'Same day' }
    ]
  };

  const STORY = [
    { emoji: '🚪', img: 'images/mod-family-lounge.webp', small: 'Step 1', title: 'The lounge with the play corner', text: 'You arrive, Nurse Nadia says hi by name, and your child picks a toy while we get the room ready. No clipboard, we already have your request.', kid: '"Can I bring the dinosaur in?" — Yes.' },
    { emoji: '🪑', img: 'images/mod-hero-kid.webp', small: 'Step 2', title: 'The magic chair', text: 'Up, down, lights on, lights off. Your child drives the chair before anything else happens. Grown-ups get the same treatment if they want it.', kid: '"Again!" — Okay, one more.' },
    { emoji: '🦷', img: 'images/dental-family-v2.webp', small: 'Step 3', title: 'Mr. Molar shows the tools', text: 'Our tooth puppet tries every tool first: the mirror, the counter, the tickle brush. Nothing touches a tooth until it has been shown and agreed.', kid: '"Does Mr. Molar have cavities?" — Not anymore.' },
    { emoji: '🔢', img: 'images/clinic-hero-generations-v4.webp', small: 'Step 4', title: 'Counting teeth', text: 'The dentist counts out loud, your child checks in the mirror. If we spot something, we show it on the screen and explain it to the grown-ups with the price.', kid: '"I have twenty!" — Exactly right.' },
    { emoji: '🏅', img: 'images/mod-team-fun.webp', small: 'Step 5', title: 'Sticker, certificate, photo', text: 'Brave Patient Award, sticker of choice, photo for the fridge. We book the next check-up before you leave so nobody has to remember.', kid: '"Can we come back tomorrow?" — Six months, deal?' }
  ];

  const FAQ = [
    { keys: ['brace', 'braces', 'aligner', 'straight', 'crooked'], tag: 'Braces', title: 'Braces from RM 3,800, aligners from RM 4,800', text: 'Teens and adults. Free scan with a preview of the end result, 0% instalments from RM 200 a month. Colour bands change every visit.' },
    { keys: ['panel', 'insurance', 'aia', 'prudential', 'allianz', 'etiqa', 'great eastern', 'corporate', 'claim'], tag: 'Panels', title: 'AIA, Prudential, Great Eastern, Allianz, Etiqa and corporate panels', text: 'Bring your card or policy number. We check eligibility before treatment, and tell you the co-payment up front.' },
    { keys: ['first', 'age', 'baby', 'toddler', 'kid', 'child', 'children', 'young'], tag: 'Kids', title: 'First visit by age one, or when the first tooth appears', text: 'Under-fives get a free first look: ride the chair, meet Mr. Molar, pick a sticker. No instruments unless they want them.' },
    { keys: ['toothache', 'pain', 'hurt', 'ache', 'swelling', 'emergency', 'urgent', 'broken', 'chip'], tag: 'Emergency', title: 'Same-day emergency slots, held every morning', text: 'Message us with the symptom and we call back with a slot. Swelling that reaches the eye or trouble swallowing: go to the nearest emergency department first.', action: 'slots' },
    { keys: ['pregnant', 'pregnancy', 'expecting', 'breastfeeding'], tag: 'Pregnancy', title: 'Yes, dental care is safe in pregnancy', text: 'Check-ups and cleaning are recommended, especially in the second trimester. We avoid X-rays unless urgent and use pregnancy-safe anaesthetic.' },
    { keys: ['scared', 'nervous', 'afraid', 'fear', 'anxious', 'phobia', 'scary'], tag: 'Nervous', title: 'Turn on "I\'m nervous" at the top of the page', text: 'It books the gentle-care slot with Dr. Aina: extra time, numbing gel first, hand signal to stop, headphones and a ceiling screen. First visit can be a chat with no chair.' },
    { keys: ['scaling', 'clean', 'cleaning', 'polish', 'hygiene'], tag: 'Price', title: 'Scaling & polishing RM 150, 45 minutes', text: 'Gentle setting available for sensitive teeth. Twice a year is the usual rhythm. Fluoride included.' },
    { keys: ['whiten', 'whitening', 'white', 'yellow teeth', 'stain'], tag: 'Price', title: 'Whitening RM 850 in clinic, RM 600 take-home', text: 'One visit, sensitivity managed, top-up kit included. We check for cavities first, since whitening gel on a cavity hurts.' },
    { keys: ['root canal', 'nerve', 'rct'], tag: 'Price', title: 'Root canal from RM 800', text: 'Usually two visits, fully numbed. Most patients say it was nothing like they feared. Ceiling screen strongly advised.' },
    { keys: ['open', 'hour', 'time', 'sunday', 'saturday', 'weekend', 'close', 'late', 'evening'], tag: 'Hours', title: 'Mon–Fri 9 am–7 pm, Sat 9 am–5 pm', text: 'Closed Sunday, but emergencies are answered on WhatsApp. Last booking an hour before closing.' },
    { keys: ['park', 'parking', 'where', 'location', 'address', 'pandan'], tag: 'Visit', title: 'Kampung Pandan, ground floor, big yellow door', text: 'Free parking at the back, pram-friendly, play corner, nappy change and a prayer room on the same floor.' },
    { keys: ['pay', 'payment', 'instalment', 'installment', 'card', 'cash', 'duitnow', 'ewallet'], tag: 'Payment', title: 'Cards, DuitNow, e-wallets, 0% instalments', text: 'Instalments on treatments above RM 1,000. Pay at the counter after treatment. No payment is taken online on this demo.' },
    { keys: ['implant', 'missing', 'denture'], tag: 'Price', title: 'Implants from RM 6,500, dentures from RM 900', text: 'Dr. Lim plans implants on a 3D scan and shows you the result first. Instalments available.' },
    { keys: ['slot', 'available', 'free', 'when', 'book', 'appointment', 'today', 'tomorrow'], tag: 'Booking', title: 'Next free slots are shown on this page', text: 'Scroll to "Next free slot" for every dentist, or use the booking form. Tap a time and it goes straight into the message.', action: 'slots' }
  ];

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const money = (n) => (n === 0 ? 'Free' : `RM ${n.toLocaleString('en-MY')}`);
  const pad = (n) => String(n).padStart(2, '0');
  const isoDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const hourLabel = (h) => `${((h + 11) % 12) + 1}:00 ${h >= 12 ? 'PM' : 'AM'}`;
  const allPrices = [...PRICES.adults, ...PRICES.kids.map((k) => ({ ...k, kid: true }))];
  const priceText = (p) => `${p.from ? 'from ' : ''}${money(p.price)}`;

  const toastEl = $('#toast'); let toastTimer;
  const toast = (m) => { toastEl.textContent = m; toastEl.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2400); };

  /* header, nav, nervous mode */
  const header = $('#siteHeader'); const navLinks = $('#navLinks'); const menuToggle = $('#menuToggle');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  menuToggle.addEventListener('click', () => { const open = navLinks.classList.toggle('open'); document.body.classList.toggle('menu-open', open); menuToggle.setAttribute('aria-expanded', String(open)); });
  navLinks.addEventListener('click', (e) => { if (e.target.closest('a')) { navLinks.classList.remove('open'); document.body.classList.remove('menu-open'); menuToggle.setAttribute('aria-expanded', 'false'); } });
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) $$('.nav-links a').forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${en.target.id}`)); }), { rootMargin: '-40% 0px -55% 0px' });
    $$('main section[id]').forEach((s) => spy.observe(s));
  }
  const nervousToggle = $('#nervousToggle'); const calm = $('#calm'); const gentle = $('#gentle');
  const setNervous = (on) => {
    nervousToggle.setAttribute('aria-pressed', String(on)); document.body.classList.toggle('calm-mode', on); calm.hidden = !on; gentle.checked = on;
    if (on) { dentistSelect.value = DENTISTS[0].name; selectDentist(0); calm.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }); toast('Nervous mode on. Gentle-care slot added to your booking.'); }
    updateSummary();
  };
  nervousToggle.addEventListener('click', () => setNervous(nervousToggle.getAttribute('aria-pressed') !== 'true'));

  /* storyboard */
  const stage = $('#storyStage'); const dots = $('#storyDots'); let step = 0;
  const renderStory = () => {
    const s = STORY[step];
    stage.innerHTML = `<div class="story-step"><div class="big"><img src="${s.img}" alt="" loading="lazy"></div><small>${s.small} of ${STORY.length}</small><h3>${s.emoji} ${s.title}</h3><p>${s.text}</p><div class="kid-say">${s.kid}</div></div>`;
    dots.innerHTML = STORY.map((_, i) => `<i class="${i === step ? 'on' : ''}"></i>`).join('');
  };
  $('#storyPrev').addEventListener('click', () => { step = (step - 1 + STORY.length) % STORY.length; renderStory(); });
  $('#storyNext').addEventListener('click', () => { step = (step + 1) % STORY.length; renderStory(); });
  renderStory();

  /* prices */
  const priceGrid = $('#priceGrid'); const serviceSelect = $('#service');
  const renderPrices = (list) => {
    priceGrid.innerHTML = PRICES[list].map((p) => `<button type="button" class="price-card c-${p.c}${serviceSelect.value === p.name ? ' selected' : ''}" data-service="${p.name}">${p.tag ? `<span class="tag chip chip-${p.c === 'blue' ? 'blue' : p.c === 'mint' ? 'mint' : p.c === 'coral' ? 'coral' : 'yellow'}">${p.tag}</span>` : ''}<div class="row"><strong>${p.name}</strong><span class="amt">${p.from ? '<small>from</small>' : ''}${money(p.price)}</span></div><p>${p.mins} min · ${p.desc}</p></button>`).join('');
  };
  $$('.toggle button').forEach((b) => b.addEventListener('click', () => { $$('.toggle button').forEach((x) => x.classList.toggle('active', x === b)); renderPrices(b.dataset.list); }));
  priceGrid.addEventListener('click', (e) => { const c = e.target.closest('.price-card'); if (!c) return; serviceSelect.value = c.dataset.service; $$('.price-card').forEach((x) => x.classList.toggle('selected', x === c)); updateSummary(); toast(`${c.dataset.service} added to your booking`); });
  [['Adults', PRICES.adults], ['Kids & teens', PRICES.kids]].forEach(([label, list]) => { const og = document.createElement('optgroup'); og.label = label; list.forEach((p) => { const o = document.createElement('option'); o.value = p.name; o.textContent = `${p.name} · ${priceText(p)}`; og.append(o); }); serviceSelect.append(og); });
  const og = document.createElement('optgroup'); og.label = 'Not sure'; ['Toothache / emergency', 'Just a chat first', 'Second opinion'].forEach((n) => { const o = document.createElement('option'); o.textContent = n; og.append(o); }); serviceSelect.append(og);
  renderPrices('adults');

  /* schedule */
  const seed = (str) => { let h = 2166136261; for (const c of str) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return () => { h += 0x6D2B79F5; let t = Math.imul(h ^ (h >>> 15), 1 | h); t ^= t + Math.imul(t ^ (t >>> 7), 61 | t); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
  const today = new Date(); today.setHours(0, 0, 0, 0); const now = new Date();
  const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(today); d.setDate(today.getDate() + i); return d; });
  const schedules = DENTISTS.map((dn) => days.map((d) => {
    const hrs = SITE.hours[d.getDay()]; if (!hrs || !dn.days.includes(d.getDay())) return { date: d, slots: [] };
    const rnd = seed(dn.name + isoDate(d));
    return { date: d, slots: SITE.slotHours.filter((h) => h >= hrs[0] && h < hrs[1]).map((h) => { const r = rnd(); let state = r < 0.45 ? 'open' : r < 0.65 ? 'limited' : 'full'; if (isoDate(d) === isoDate(now) && h <= now.getHours()) state = 'full'; return { hour: h, state }; }) };
  }));
  const openSlots = (day) => day.slots.filter((s) => s.state !== 'full');
  const dayShort = (d) => d.toLocaleDateString('en-MY', { weekday: 'short' });
  const nextFreeFor = (i) => { for (let d = 0; d < 7; d++) { const s = openSlots(schedules[i][d])[0]; if (s) return { day: d, hour: s.hour }; } return null; };

  const state = { dentist: 0, day: 0, hour: null };
  const dentistCards = $('#dentistCards'); const dayPills = $('#dayPills'); const weekSlots = $('#weekSlots'); const weekTitle = $('#weekTitle');
  const dateInput = $('#date'); const timeSelect = $('#time'); const dentistSelect = $('#dentist');
  dateInput.min = isoDate(today);
  DENTISTS.forEach((dn) => { const o = document.createElement('option'); o.textContent = dn.name; dentistSelect.append(o); });
  const fillTimes = () => { const day = schedules[state.dentist][state.day]; timeSelect.innerHTML = '<option value="">Choose a time</option>' + (day && day.slots.length ? day.slots.map((s) => `<option value="${hourLabel(s.hour)}" ${s.state === 'full' ? 'disabled' : ''}>${hourLabel(s.hour)}${s.state === 'full' ? ' · booked' : s.state === 'limited' ? ' · last one' : ''}</option>`).join('') : SITE.slotHours.map((h) => `<option>${hourLabel(h)}</option>`).join('')); };
  const renderSlots = () => {
    dentistCards.innerHTML = DENTISTS.map((dn, i) => { const nf = nextFreeFor(i); return `<button type="button" class="dentist-card" aria-pressed="${i === state.dentist}" data-i="${i}"><img src="${dn.img}" alt=""><div><strong>${dn.name}</strong><span>${dn.role}</span></div><div class="next"><small>Next free</small><b>${nf ? `${nf.day === 0 ? 'Today' : dayShort(days[nf.day])} ${hourLabel(nf.hour)}` : 'Full this week'}</b></div></button>`; }).join('');
    const sched = schedules[state.dentist];
    dayPills.innerHTML = sched.map((day, i) => { const n = openSlots(day).length; return `<button type="button" role="tab" aria-selected="${i === state.day}"><small>${i === 0 ? 'Today' : dayShort(day.date)}</small><strong>${day.date.getDate()}</strong><em class="${day.slots.length === 0 || n === 0 ? 'none' : n <= 2 ? 'few' : ''}">${day.slots.length === 0 ? 'off' : n === 0 ? 'full' : `${n} open`}</em></button>`; }).join('');
    const day = sched[state.day];
    weekTitle.textContent = `${DENTISTS[state.dentist].name} · ${day.date.toLocaleDateString('en-MY', { weekday: 'long', day: 'numeric', month: 'short' })}`;
    weekSlots.innerHTML = day.slots.length ? day.slots.map((s) => `<button type="button" class="${s.state}" data-hour="${s.hour}" aria-pressed="${state.hour === s.hour}" ${s.state === 'full' ? 'disabled' : ''}>${hourLabel(s.hour)}${s.state === 'limited' ? ' · last' : ''}</button>`).join('') : `<span class="empty">${DENTISTS[state.dentist].name} is off this day. Try another day or dentist.</span>`;
  };
  function selectDentist(i) { state.dentist = i; state.hour = null; dentistSelect.value = DENTISTS[i].name; renderSlots(); fillTimes(); timeSelect.value = ''; updateSummary(); }
  dentistCards.addEventListener('click', (e) => { const c = e.target.closest('.dentist-card'); if (c) selectDentist(Number(c.dataset.i)); });
  dayPills.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; state.day = [...dayPills.children].indexOf(b); state.hour = null; dateInput.value = isoDate(days[state.day]); renderSlots(); fillTimes(); updateSummary(); });
  weekSlots.addEventListener('click', (e) => { const b = e.target.closest('button:not(:disabled)'); if (!b) return; state.hour = Number(b.dataset.hour); dateInput.value = isoDate(days[state.day]); dentistSelect.value = DENTISTS[state.dentist].name; renderSlots(); fillTimes(); timeSelect.value = hourLabel(state.hour); updateSummary(); toast(`${hourLabel(state.hour)} with ${DENTISTS[state.dentist].name}`); $('#book').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); });
  dentistSelect.addEventListener('change', () => { const i = DENTISTS.findIndex((d) => d.name === dentistSelect.value); if (i >= 0) { state.dentist = i; renderSlots(); } fillTimes(); updateSummary(); });
  dateInput.addEventListener('change', () => { const i = days.findIndex((d) => isoDate(d) === dateInput.value); if (i >= 0) { state.day = i; state.hour = null; renderSlots(); } fillTimes(); updateSummary(); });
  timeSelect.addEventListener('change', updateSummary);
  renderSlots(); fillTimes();
  const first = DENTISTS.map((_, i) => nextFreeFor(i)).filter(Boolean).sort((a, b) => a.day - b.day || a.hour - b.hour)[0];
  $('#heroSlotChip').textContent = first ? `Next slot: ${first.day === 0 ? 'today' : dayShort(days[first.day])} ${hourLabel(first.hour)}` : 'Fully booked this week';

  /* Ask the clinic */
  const askInput = $('#askInput'); const askResults = $('#askResults');
  const answer = (q) => {
    const lower = q.toLowerCase().trim(); if (lower.length < 2) return;
    const words = lower.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w.length > 2);
    const priceHits = allPrices.map((p) => ({ p, score: words.reduce((a, w) => a + (p.name.toLowerCase().includes(w) || p.desc.toLowerCase().includes(w) ? 1 : 0), 0) })).filter((x) => x.score > 0).sort((a, b) => b.score - a.score).slice(0, 2);
    const faqHits = FAQ.map((f) => ({ f, score: f.keys.reduce((a, k) => a + (lower.includes(k) ? (k.length > 5 ? 2 : 1) : 0), 0) })).filter((x) => x.score > 0).sort((a, b) => b.score - a.score).slice(0, 2);
    const cards = [];
    faqHits.forEach(({ f }) => cards.push(`<div class="answer"><small>${f.tag}</small><strong>${f.title}</strong><p>${f.text}</p>${f.action ? `<div class="answer-actions"><a href="#${f.action}">Open next free slots</a></div>` : ''}</div>`));
    priceHits.forEach(({ p }) => cards.push(`<div class="answer"><small>${p.kid ? 'Kids & teens' : 'Adults'} · price</small><strong>${p.name} — ${priceText(p)}, ${p.mins} min</strong><p>${p.desc}</p><div class="answer-actions"><button type="button" data-pick="${p.name}">Add to booking</button><a href="#slots">See free slots</a></div></div>`));
    askResults.innerHTML = cards.length ? cards.join('') : `<div class="answer"><small>Not found</small><strong>Good question. A human will answer it.</strong><p>Send it on WhatsApp and we add the answer here so nobody has to ask twice.</p><div class="answer-actions"><a href="https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hi Dental Clinic, quick question: ' + q)}" target="_blank" rel="noopener">Ask on WhatsApp</a></div></div>`;
  };
  $('#askForm').addEventListener('submit', (e) => { e.preventDefault(); answer(askInput.value); });
  let askTimer; askInput.addEventListener('input', () => { clearTimeout(askTimer); askTimer = setTimeout(() => answer(askInput.value), 280); });
  $('#askSuggest').addEventListener('click', (e) => { const b = e.target.closest('[data-q]'); if (b) { askInput.value = b.dataset.q; answer(b.dataset.q); } });
  askResults.addEventListener('click', (e) => { const b = e.target.closest('[data-pick]'); if (!b) return; serviceSelect.value = b.dataset.pick; updateSummary(); toast(`${b.dataset.pick} added`); $('#book').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); });

  /* summary, certificate, form */
  const form = $('#bookForm'); const status = $('#formStatus'); const nameInput = $('#name'); const ageSelect = $('#age');
  function updateSummary() {
    const p = allPrices.find((x) => x.name === serviceSelect.value);
    $('#sumService').textContent = serviceSelect.value || 'Not chosen';
    $('#sumDentist').textContent = dentistSelect.value || 'Any';
    $('#sumPrice').textContent = p ? `${priceText(p)} · ${p.mins} min${gentle.checked ? ' + gentle care' : ''}` : (serviceSelect.value ? 'Confirmed after the check' : '—');
    $('#sumWhen').textContent = dateInput.value && timeSelect.value ? `${new Date(`${dateInput.value}T00:00:00`).toLocaleDateString('en-MY', { weekday: 'short', day: 'numeric', month: 'short' })} · ${timeSelect.value}` : 'Pick a slot';
    const kid = /child|teen/i.test(ageSelect.value) || (p && p.kid);
    $('#certPreview').hidden = !kid; $('#certName').textContent = nameInput.value.trim() || 'Your name here';
  }
  [serviceSelect, dentistSelect, ageSelect, gentle].forEach((el) => el.addEventListener('change', updateSummary));
  nameInput.addEventListener('input', updateSummary);
  const compose = (d) => { const p = allPrices.find((x) => x.name === d.service); return [`${SITE.name} — booking request`, `Patient: ${d.name} (${d.age})`, `WhatsApp: ${d.phone}`, `Treatment: ${d.service}${p ? ` (${priceText(p)}, ${p.mins} min)` : ''}`, `Dentist: ${d.dentist}`, `Date & time: ${d.date} at ${d.time}`, `Gentle-care slot: ${d.gentle ? 'Yes please' : 'No'}`, `Notes: ${d.notes || '-'}`, '', 'Sent from the clinic website. Reply "confirmed" or suggest the nearest slot.'].join('\n'); };
  const validate = () => { status.classList.remove('error'); if (!form.reportValidity()) { status.textContent = 'Please complete the highlighted fields.'; status.classList.add('error'); return null; } return Object.fromEntries(new FormData(form).entries()); };
  const remember = (d) => { try { const list = JSON.parse(localStorage.getItem(SITE.storageKey) || '[]'); list.unshift({ ...d, createdAt: new Date().toISOString() }); localStorage.setItem(SITE.storageKey, JSON.stringify(list.slice(0, 5))); } catch (_) { /* no storage */ } };
  form.addEventListener('submit', (e) => { e.preventDefault(); const d = validate(); if (!d) return; remember(d); status.textContent = 'Saved on this device. Opening WhatsApp with your message…'; window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(compose(d))}`, '_blank', 'noopener'); });
  $('#copyMessage').addEventListener('click', async () => { const d = validate(); if (!d) return; try { await navigator.clipboard.writeText(compose(d)); remember(d); status.textContent = 'Message copied. Paste it into any chat.'; } catch (_) { status.textContent = 'Copy is not available here. Use the WhatsApp button.'; status.classList.add('error'); } });
  updateSummary();

  /* open now */
  const openNow = $('#openNow'); const h = SITE.hours[now.getDay()]; const nowH = now.getHours() + now.getMinutes() / 60;
  if (!h) { openNow.textContent = 'Closed today · emergencies on WhatsApp'; openNow.classList.add('closed'); }
  else if (nowH >= h[0] && nowH < h[1]) openNow.textContent = `Open now · until ${hourLabel(h[1])}`;
  else { openNow.textContent = `Closed now · opens ${hourLabel(h[0])}`; openNow.classList.add('closed'); }

  /* pitch: the two phones */
  const SCRIPT = [
    { q: 'Hi, how much for scaling?', a: 'RM 150, 45 min. Gentle setting available.', auto: true },
    { q: 'Do you take AIA panel?', a: 'Yes. AIA, Prudential, GE, Allianz, Etiqa.', auto: true },
    { q: 'Got slot Saturday morning?', a: 'Sat 10:00 AM with Dr. Aina is open. Tap to book.', auto: true },
    { q: 'My son is 3, first visit scary?', a: 'Free first look: ride the chair, meet Mr. Molar, sticker.', auto: true },
    { q: 'Braces price for 15 year old?', a: 'From RM 3,800, 0% instalments, free scan first.', auto: true },
    { q: 'I had a filling fall out, swollen', a: 'Needs a dentist today. Callback requested.', auto: false },
    { q: 'Open on public holiday?', a: 'By appointment. Emergencies on WhatsApp.', auto: true }
  ];
  const manual = $('#phoneManual'); const auto = $('#phoneAuto'); let played = false;
  const wait = (ms) => new Promise((r) => setTimeout(r, reduceMotion ? 0 : ms));
  const trim = (el) => { while (el.children.length > 6) el.removeChild(el.firstChild); };
  const playPhones = async () => {
    if (played) return; played = true;
    let m = 0, a = 0, hu = 0;
    for (const line of SCRIPT) {
      manual.insertAdjacentHTML('beforeend', `<div class="msg in">${line.q}</div>`); auto.insertAdjacentHTML('beforeend', `<div class="msg in">${line.q}</div>`); trim(manual); trim(auto);
      await wait(700);
      if (line.auto) { auto.insertAdjacentHTML('beforeend', `<div class="msg out auto">${line.a}</div>`); a++; }
      else { auto.insertAdjacentHTML('beforeend', `<div class="msg out">${line.a}</div>`); hu++; }
      $('#autoCount').textContent = a; $('#humanCount').textContent = hu; trim(auto);
      await wait(900);
      manual.insertAdjacentHTML('beforeend', `<div class="msg out wait">typing… (receptionist is chairside)</div>`); trim(manual);
      await wait(900);
      manual.lastElementChild.className = 'msg out'; manual.lastElementChild.textContent = line.a; m++; $('#manualCount').textContent = m;
      await wait(500);
    }
  };

  /* reveal */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (!en.isIntersecting) return; en.target.classList.add('show'); if (en.target.classList.contains('phones')) playPhones(); io.unobserve(en.target); }), { threshold: .1 });
    revealEls.forEach((el) => io.observe(el));
  } else { revealEls.forEach((el) => el.classList.add('show')); playPhones(); }

  $('#year').textContent = String(new Date().getFullYear());
})();
