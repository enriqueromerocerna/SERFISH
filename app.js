/* Cotizador SERFISH — app estática (sin dependencias). */
(() => {
  'use strict';

  const LS_KEY = 'serfish_catalog_v1';
  const FONT = "'Poppins', 'Segoe UI', Arial, sans-serif";
  const W = 1086;
  const PINK1 = '#ff3b8d';
  const PINK2 = '#c4005f';
  const uid = () => Math.random().toString(36).slice(2, 9);
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ------------------------------------------------------------------ */
  /* Catálogo por defecto (PRECIOS DE EJEMPLO: se editan en la app)      */
  /* ------------------------------------------------------------------ */
  const DEFAULT_CATALOG = {
    business: {
      name: 'SERFISH',
      tagline: 'FIESTAS Y EVENTOS',
      logo: null,
      phone: '',
      closingPre: '¡Todo lo que necesitas para un ',
      closingHi: 'evento inolvidable',
      closingPost: '!',
    },
    services: [
      {
        id: 'bar', name: 'Servicio de bar', icon: 'bar', photo: null,
        options: [
          { id: 'bar-movil', label: 'Barra móvil + bartender (sin insumos)', summary: 'Servicio de bar', price: 350, upTo: null,
            bullets: ['Bartender profesional', 'Barra móvil', 'Servicio por 5 horas', 'Insumos a cargo del cliente'] },
          { id: 'tragos-100', label: '100 tragos (con insumos)', summary: 'Bar · 100 tragos', price: 750, upTo: null,
            bullets: ['Bartender profesional', 'Barra móvil', '100 tragos con insumos incluidos', 'Servicio por 5 horas'] },
          { id: 'tragos-150', label: '150 tragos (con insumos)', summary: 'Bar · 150 tragos', price: 1000, upTo: null,
            bullets: ['Bartender profesional', 'Barra móvil', '150 tragos con insumos incluidos', 'Servicio por 5 horas'] },
        ],
      },
      {
        id: 'sonido', name: 'Sonido', icon: 'speaker', photo: null,
        options: [
          { id: 'son-2', label: '2 parlantes (hasta ~50 personas)', summary: 'Sonido (2 parlantes)', price: 150, upTo: 50,
            bullets: ['2 parlantes profesionales', 'Sistema de sonido'] },
          { id: 'son-4', label: '4 parlantes (hasta ~120 personas)', summary: 'Sonido (4 parlantes)', price: 250, upTo: 120,
            bullets: ['4 parlantes profesionales', 'Sistema de sonido'] },
          { id: 'son-6', label: '6 parlantes (espacios grandes / abiertos)', summary: 'Sonido (6 parlantes)', price: 380, upTo: 300,
            bullets: ['6 parlantes profesionales', 'Sistema de sonido', 'Cobertura para espacio amplio'] },
        ],
      },
      {
        id: 'dj', name: 'DJ', icon: 'headphones', photo: null,
        options: [
          { id: 'dj-1', label: 'DJ profesional', summary: 'DJ', price: 250, upTo: null,
            bullets: ['DJ profesional', 'Animación musical durante el evento'] },
        ],
      },
      {
        id: 'luces', name: 'Luces', icon: 'bulb', photo: null,
        options: [
          { id: 'luz-b', label: 'Luces básicas', summary: 'Luces básicas', price: 150, upTo: null,
            bullets: ['Iluminación para pista', 'Efectos de colores'] },
          { id: 'luz-f', label: 'Luces full', summary: 'Luces full', price: 250, upTo: null,
            bullets: ['Iluminación profesional', 'Efectos especiales', 'Ambientación completa'] },
        ],
      },
    ],
    transport: [
      { id: 'tangay', label: 'Zona Tangay', price: 50, note: 'Incluye traslado de ida. El retorno es asumido por SERFISH.' },
      { id: 'otra', label: 'Otra zona', price: 80, note: 'Incluye traslado de ida. El retorno es asumido por SERFISH.' },
    ],
  };

  const ICONS = {
    bar: 'M21 5V3H3v2l8 9v5H6v2h12v-2h-5v-5l8-9zM7.43 7L5.66 5h12.69l-1.78 2H7.43z',
    speaker: 'M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z',
    headphones: 'M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z',
    bulb: 'M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z',
    clipboard: 'M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z',
    truck: 'M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
    pin: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
  };
  const ICON_CHOICES = { bar: 'Copa (bar)', speaker: 'Parlante', headphones: 'Audífonos', bulb: 'Foco (luces)' };

  /* ------------------------------------------------------------------ */
  /* Estado                                                              */
  /* ------------------------------------------------------------------ */
  let catalog = loadCatalog();
  const quote = {
    client: '', event: '', date: '', place: '', venue: 'house', guests: '',
    sel: {}, transport: catalog.transport[0] ? catalog.transport[0].id : '', discount: '',
  };

  function loadCatalog() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const c = JSON.parse(raw);
        if (c && Array.isArray(c.services) && c.business) return c;
      }
    } catch (e) { /* ignorar */ }
    return JSON.parse(JSON.stringify(DEFAULT_CATALOG));
  }
  function saveCatalog() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(catalog)); }
    catch (e) { toast('No se pudo guardar (almacenamiento lleno). Usa fotos más pequeñas.'); }
  }

  /* ------------------------------------------------------------------ */
  /* Utilidades                                                          */
  /* ------------------------------------------------------------------ */
  const fmtNum = (n) => {
    n = Number(n) || 0;
    const s = Number.isInteger(n) ? String(n) : n.toFixed(2);
    return s.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const money = (n) => 'S/ ' + fmtNum(n);
  function fmtDate(v) {
    if (!v) return '';
    const d = new Date(v + 'T00:00:00');
    return d.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' });
  }
  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.hidden = true; }, 3500);
  }
  function fileToDataUrl(file, maxW, type, quality) {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onerror = reject;
      fr.onload = () => {
        const img = new Image();
        img.onerror = reject;
        img.onload = () => {
          const r = Math.min(1, maxW / img.width);
          const c = document.createElement('canvas');
          c.width = Math.round(img.width * r); c.height = Math.round(img.height * r);
          c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
          resolve(c.toDataURL(type, quality));
        };
        img.src = fr.result;
      };
      fr.readAsDataURL(file);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Panel de cotización                                                 */
  /* ------------------------------------------------------------------ */
  function renderServicesPanel() {
    const box = $('#services');
    box.innerHTML = catalog.services.map((s) => {
      const on = !!quote.sel[s.id];
      const opts = s.options.map((o) =>
        `<option value="${esc(o.id)}" ${quote.sel[s.id] === o.id ? 'selected' : ''}>${esc(o.label)} — ${money(o.price)}</option>`).join('');
      return `<div class="svc ${on ? 'on' : ''}" data-svc="${esc(s.id)}">
        <label class="svc-head"><input type="checkbox" ${on ? 'checked' : ''}> ${esc(s.name)}</label>
        <select ${on ? '' : 'disabled'}>${opts}</select>
      </div>`;
    }).join('') || '<p class="note">No hay servicios. Agrégalos en “Precios y ajustes”.</p>';

    const tsel = $('#q-transport');
    tsel.innerHTML = `<option value="">Sin movilidad</option>` + catalog.transport.map((t) =>
      `<option value="${esc(t.id)}" ${quote.transport === t.id ? 'selected' : ''}>${esc(t.label)} — ${money(t.price)}</option>`).join('');
    if (quote.transport && !catalog.transport.some((t) => t.id === quote.transport)) quote.transport = '';
    tsel.value = quote.transport;
    updateSoundHint();
  }

  function soundService() { return catalog.services.find((s) => s.id === 'sonido'); }
  function suggestSound() {
    const s = soundService();
    const g = Number(quote.guests);
    if (!s || !g) return null;
    const factor = quote.venue === 'open' ? 1.6 : quote.venue === 'hall' ? 1.15 : 1;
    const eff = g * factor;
    const withLimit = s.options.filter((o) => o.upTo);
    const pick = withLimit.find((o) => o.upTo >= eff) || withLimit[withLimit.length - 1] || s.options[s.options.length - 1];
    return pick ? { s, o: pick, eff: Math.round(eff) } : null;
  }
  function updateSoundHint() {
    const hint = $('#sound-hint');
    const sug = suggestSound();
    if (!sug) { hint.hidden = true; return; }
    const extra = quote.venue === 'open' ? ' (aire libre: el sonido se pierde, se calcula con más capacidad)' : '';
    hint.hidden = false;
    hint.innerHTML = `<span>Recomendado: <b>${esc(sug.o.label)}</b>${extra}</span>
      <button class="btn small primary" type="button" id="apply-sound">Aplicar</button>`;
    $('#apply-sound').onclick = () => {
      quote.sel[sug.s.id] = sug.o.id;
      renderServicesPanel(); render();
    };
  }

  function bindQuotePanel() {
    const map = { 'q-client': 'client', 'q-event': 'event', 'q-date': 'date', 'q-place': 'place', 'q-venue': 'venue', 'q-guests': 'guests', 'q-discount': 'discount' };
    Object.entries(map).forEach(([id, key]) => {
      const el = $('#' + id);
      el.value = quote[key];
      el.addEventListener('input', () => {
        quote[key] = el.value;
        if (key === 'guests' || key === 'venue') updateSoundHint();
        render();
      });
    });
    $('#q-transport').addEventListener('change', (e) => { quote.transport = e.target.value; render(); });

    const box = $('#services');
    box.addEventListener('change', (e) => {
      const wrap = e.target.closest('.svc'); if (!wrap) return;
      const s = catalog.services.find((x) => x.id === wrap.dataset.svc); if (!s) return;
      if (e.target.type === 'checkbox') {
        quote.sel[s.id] = e.target.checked && s.options[0] ? s.options[0].id : null;
        renderServicesPanel();
      } else if (e.target.tagName === 'SELECT') {
        quote.sel[s.id] = e.target.value;
      }
      render();
    });
  }

  /* ------------------------------------------------------------------ */
  /* Modelo de la cotización                                             */
  /* ------------------------------------------------------------------ */
  function buildModel() {
    const lines = [];
    for (const s of catalog.services) {
      const oid = quote.sel[s.id]; if (!oid) continue;
      const o = s.options.find((x) => x.id === oid);
      if (o) lines.push({ s, o });
    }
    const subtotal = lines.reduce((a, l) => a + (Number(l.o.price) || 0), 0);
    const tr = catalog.transport.find((t) => t.id === quote.transport) || null;
    const trPrice = tr ? Number(tr.price) || 0 : 0;
    const discount = Number(quote.discount) || 0;
    return { lines, subtotal, tr, trPrice, discount, total: Math.max(0, subtotal + trPrice - discount) };
  }

  function quoteText(m) {
    const b = catalog.business;
    const out = [`*${b.name} · Cotización de servicios*`];
    if (quote.client) out.push(`Cliente: ${quote.client}`);
    if (quote.event) out.push(`Evento: ${quote.event}`);
    if (quote.date) out.push(`Fecha: ${fmtDate(quote.date)}`);
    if (quote.place) out.push(`Lugar: ${quote.place}`);
    out.push('');
    m.lines.forEach((l) => out.push(`• ${l.o.summary || l.s.name}: ${money(l.o.price)}`));
    if (m.lines.length > 1) out.push(`Subtotal: ${money(m.subtotal)}`);
    if (m.tr) out.push(`Movilidad (${m.tr.label.replace(/^zona\s+/i, 'zona ')}): ${money(m.trPrice)}`);
    if (m.discount) out.push(`Descuento: -${money(m.discount)}`);
    out.push(`*TOTAL: ${money(m.total)}*`);
    if (m.tr && m.tr.note) out.push('', m.tr.note);
    return out.join('\n');
  }

  /* ------------------------------------------------------------------ */
  /* Dibujo del flyer                                                    */
  /* ------------------------------------------------------------------ */
  const imgCache = new Map();
  function loadImg(src) {
    if (!src) return Promise.resolve(null);
    if (!imgCache.has(src)) {
      imgCache.set(src, new Promise((res) => {
        const i = new Image();
        i.onload = () => res(i);
        i.onerror = () => res(null);
        i.src = src;
      }));
    }
    return imgCache.get(src);
  }

  const font = (w, size, italic) => `${italic ? 'italic ' : ''}${w} ${size}px ${FONT}`;
  function rr(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function lgrad(ctx, x0, y0, x1, y1, stops) {
    const g = ctx.createLinearGradient(x0, y0, x1, y1);
    stops.forEach(([o, c]) => g.addColorStop(o, c));
    return g;
  }
  function pinkPill(ctx, x, y, w, h) {
    ctx.save();
    ctx.shadowColor = 'rgba(196,0,95,.35)'; ctx.shadowBlur = 14; ctx.shadowOffsetY = 5;
    rr(ctx, x, y, w, h, h / 2);
    ctx.fillStyle = lgrad(ctx, x, y, x, y + h, [[0, PINK1], [1, PINK2]]);
    ctx.fill();
    ctx.restore();
    ctx.save();
    rr(ctx, x + 1.5, y + 1.5, w - 3, h - 3, h / 2);
    ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 3; ctx.stroke();
    ctx.restore();
  }
  function blackPill(ctx, x, y, w, h) {
    ctx.save();
    rr(ctx, x + 3, y + 5, w, h, h / 2);
    ctx.fillStyle = PINK2; ctx.fill();
    rr(ctx, x, y, w, h, h / 2);
    ctx.fillStyle = '#0b0b0b'; ctx.fill();
    ctx.restore();
  }
  function icon(ctx, name, cx, cy, size, color) {
    const d = ICONS[name] || ICONS.bar;
    ctx.save();
    ctx.translate(cx - size / 2, cy - size / 2);
    ctx.scale(size / 24, size / 24);
    ctx.fillStyle = color;
    ctx.fill(new Path2D(d));
    ctx.restore();
  }
  function iconCircle(ctx, name, cx, cy, r) {
    ctx.save();
    ctx.shadowColor = 'rgba(196,0,95,.4)'; ctx.shadowBlur = 12; ctx.shadowOffsetY = 4;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = lgrad(ctx, cx, cy - r, cx, cy + r, [[0, PINK1], [1, PINK2]]);
    ctx.fill();
    ctx.restore();
    icon(ctx, name, cx, cy, r * 1.05, '#fff');
  }
  function drawCover(ctx, img, x, y, w, h) {
    const r = Math.max(w / img.width, h / img.height);
    const sw = w / r, sh = h / r;
    ctx.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, x, y, w, h);
  }
  function wrap(ctx, text, maxW) {
    const words = String(text).split(/\s+/);
    const lines = []; let cur = '';
    for (const w of words) {
      const t = cur ? cur + ' ' + w : w;
      if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t;
    }
    if (cur) lines.push(cur);
    return lines;
  }
  function check(ctx, x, y) {
    ctx.save();
    ctx.strokeStyle = PINK2; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 8, y + 9); ctx.lineTo(x + 24, y - 10); ctx.stroke();
    ctx.restore();
  }
  function placeholder(ctx, x, y, w, h, iconName) {
    ctx.save();
    ctx.fillStyle = lgrad(ctx, x, y, x + w, y + h, [[0, '#1a0633'], [0.5, '#5b1fa8'], [1, '#c026a3']]);
    ctx.fillRect(x, y, w, h);
    for (let i = 0; i < 9; i++) {
      const cx = x + w * (0.1 + 0.1 * i), cy = y + h * (0.25 + 0.5 * ((i * 37) % 10) / 10);
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 55);
      g.addColorStop(0, 'rgba(255,120,220,.45)'); g.addColorStop(1, 'rgba(255,120,220,0)');
      ctx.fillStyle = g; ctx.fillRect(cx - 55, cy - 55, 110, 110);
    }
    ctx.restore();
    icon(ctx, iconName, x + w * 0.62, y + h / 2, Math.min(h * 0.62, 150), 'rgba(255,255,255,.22)');
  }

  function drawFlyer(canvas, m, imgs) {
    const b = catalog.business;
    const mc = document.createElement('canvas').getContext('2d');

    /* --- medir --- */
    const infoParts = [];
    if (quote.client) infoParts.push('Para: ' + quote.client);
    if (quote.event) infoParts.push(quote.event);
    if (quote.date) infoParts.push(fmtDate(quote.date));
    if (quote.place) infoParts.push(quote.place);
    const infoText = infoParts.join('  ·  ');
    const headerH = infoText ? 282 : 232;

    mc.font = font(500, 31);
    const cards = m.lines.map((l) => {
      const items = [];
      (l.o.bullets || []).forEach((t) => wrap(mc, t, 300).forEach((ln, i) => items.push({ t: ln, check: i === 0 })));
      return { ...l, items, h: Math.max(240, 126 + items.length * 40 + 24) };
    });
    const rows = [];
    m.lines.forEach((l) => rows.push({ k: l.o.summary || l.s.name, v: money(l.o.price) }));
    if (m.lines.length > 1) rows.push({ k: 'Subtotal', v: money(m.subtotal), hi: true });
    if (m.tr) rows.push({ k: 'Movilidad (' + m.tr.label.replace(/^zona\s+/i, 'zona ') + ')', v: money(m.trPrice) });
    if (m.discount) rows.push({ k: 'Descuento', v: '- ' + money(m.discount) });
    const resumenH = 40 + rows.length * 44 + 20 + 84 + 24;
    const transportH = m.tr ? 170 : 0;
    const bannerH = 88;
    const phoneH = b.phone ? 60 : 0;

    let H = headerH;
    cards.forEach((c) => { H += c.h + 18; });
    H += resumenH + 18 + transportH + bannerH + phoneH + 40;

    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'middle';

    /* --- fondo --- */
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
    let g = ctx.createRadialGradient(W, H, 0, W, H, 420);
    g.addColorStop(0, 'rgba(255,59,141,.35)'); g.addColorStop(1, 'rgba(255,59,141,0)');
    ctx.fillStyle = g; ctx.fillRect(0, H - 420, W, 420);
    g = ctx.createRadialGradient(W, 150, 0, W, 150, 320);
    g.addColorStop(0, 'rgba(255,59,141,.12)'); g.addColorStop(1, 'rgba(255,59,141,0)');
    ctx.fillStyle = g; ctx.fillRect(W - 320, 0, 320, 400);

    /* --- encabezado --- */
    ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(575, 0);
    ctx.bezierCurveTo(545, 125, 400, 195, 220, 210);
    ctx.bezierCurveTo(110, 220, 40, 235, 0, 272);
    ctx.closePath();
    ctx.fillStyle = lgrad(ctx, 0, 200, 400, 260, [[0, PINK2], [1, PINK1]]); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(548, 0);
    ctx.bezierCurveTo(518, 112, 392, 174, 216, 188);
    ctx.bezierCurveTo(106, 197, 36, 212, 0, 244);
    ctx.closePath();
    ctx.fillStyle = '#0a0a0a'; ctx.fill();

    const logo = imgs.logo;
    if (logo) {
      const bw = 400, bh = 130; const r = Math.min(bw / logo.width, bh / logo.height);
      ctx.drawImage(logo, 250 - (logo.width * r) / 2, 100 - (logo.height * r) / 2, logo.width * r, logo.height * r);
    } else {
      ctx.textAlign = 'center';
      let size = 92; ctx.font = font(800, size, true);
      while (ctx.measureText(b.name).width > 440 && size > 40) { size -= 4; ctx.font = font(800, size, true); }
      ctx.lineJoin = 'round'; ctx.lineWidth = 12;
      ctx.strokeStyle = PINK1; ctx.strokeText(b.name, 253, 96);
      ctx.strokeStyle = '#000'; ctx.strokeText(b.name, 250, 92);
      ctx.fillStyle = '#fff'; ctx.fillText(b.name, 250, 92);
      ctx.font = font(600, 22); ctx.fillStyle = '#fff';
      if ('letterSpacing' in ctx) ctx.letterSpacing = '3px';
      ctx.fillText('— ' + b.tagline + ' —', 250, 148);
      if ('letterSpacing' in ctx) ctx.letterSpacing = '0px';
    }

    ctx.textAlign = 'center';
    ctx.fillStyle = '#0a0a0a'; ctx.font = font(800, 62, true);
    ctx.fillText('Cotización de', 790, 66);
    pinkPill(ctx, 575, 100, 430, 78);
    ctx.fillStyle = '#fff'; ctx.font = font(800, 62, true);
    ctx.fillText('SERVICIOS', 790, 141);
    ctx.strokeStyle = PINK1; ctx.lineWidth = 7; ctx.lineCap = 'round';
    [[545, 118, 520, 108], [545, 140, 515, 140], [545, 162, 520, 172]].forEach(([a, bb, c, d]) => { ctx.beginPath(); ctx.moveTo(a, bb); ctx.lineTo(c, d); ctx.stroke(); });
    [[1035, 118, 1060, 108], [1035, 140, 1065, 140], [1035, 162, 1060, 172]].forEach(([a, bb, c, d]) => { ctx.beginPath(); ctx.moveTo(a, bb); ctx.lineTo(c, d); ctx.stroke(); });

    if (infoText) {
      let size = 26; ctx.font = font(600, size);
      while (ctx.measureText(infoText).width > 960 && size > 14) { size -= 1; ctx.font = font(600, size); }
      const tw = ctx.measureText(infoText).width + 56;
      rr(ctx, W / 2 - tw / 2, 218, tw, 46, 23); ctx.fillStyle = '#ffe3f0'; ctx.fill();
      ctx.strokeStyle = PINK1; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = '#7a0038'; ctx.fillText(infoText, W / 2, 242);
    }

    /* --- tarjetas de servicio --- */
    let y = headerH;
    const CX = 30, CW = 1026;
    for (const c of cards) {
      const h = c.h;
      ctx.save();
      ctx.shadowColor = 'rgba(224,23,111,.22)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6;
      rr(ctx, CX, y, CW, h, 30); ctx.fillStyle = '#fff'; ctx.fill();
      ctx.restore();

      ctx.save();
      rr(ctx, CX, y, CW, h, 30); ctx.clip();
      const px = 400, pw = CX + CW - px;
      const photo = imgs.photos[c.s.id];
      if (photo) drawCover(ctx, photo, px, y, pw, h); else placeholder(ctx, px, y, pw, h, c.s.icon);
      ctx.fillStyle = lgrad(ctx, px - 20, 0, px + 250, 0, [[0, 'rgba(255,255,255,1)'], [0.35, 'rgba(255,255,255,.92)'], [1, 'rgba(255,255,255,0)']]);
      ctx.fillRect(px - 20, y, 280, h);
      ctx.restore();

      iconCircle(ctx, c.s.icon, CX + 75, y + 58, 48);
      ctx.textAlign = 'left';
      const label = (c.s.name || '').toUpperCase();
      ctx.font = font(800, 38, true);
      const lw = ctx.measureText(label).width;
      blackPill(ctx, CX + 105, y + 24, lw + 56, 64);
      ctx.fillStyle = '#fff'; ctx.fillText(label, CX + 133, y + 58);

      ctx.font = font(500, 31); ctx.fillStyle = '#111';
      let ty = y + 124;
      for (const it of c.items) {
        if (it.check) check(ctx, CX + 28, ty + 20);
        ctx.fillText(it.t, CX + 74, ty + 20);
        ty += 40;
      }

      /* precio */
      const num = fmtNum(c.o.price);
      ctx.font = font(800, 78, true); const nw = ctx.measureText(num).width;
      ctx.font = font(800, 48, true); const sw = ctx.measureText('S/').width;
      const pw2 = Math.max(228, nw + sw + 70), ph = 92;
      const pxp = CX + CW - pw2 + 8, pyp = y + h / 2 - ph / 2;
      pinkPill(ctx, pxp, pyp, pw2, ph);
      ctx.fillStyle = '#fff'; ctx.textAlign = 'left';
      const startX = pxp + (pw2 - (sw + nw + 6)) / 2;
      ctx.font = font(800, 48, true); ctx.fillText('S/', startX, pyp + ph / 2 + 4);
      ctx.font = font(800, 78, true); ctx.fillText(num, startX + sw + 6, pyp + ph / 2 + 2);
      y += h + 18;
    }

    /* --- resumen --- */
    ctx.save();
    ctx.shadowColor = 'rgba(224,23,111,.18)'; ctx.shadowBlur = 16; ctx.shadowOffsetY = 5;
    rr(ctx, CX, y, CW, resumenH, 30); ctx.fillStyle = '#fff'; ctx.fill();
    ctx.restore();
    const midY = y + resumenH / 2;
    icon(ctx, 'clipboard', CX + 60, midY - 10, 100, PINK2);
    ctx.textAlign = 'left';
    ctx.font = font(800, 46, true); const rw = ctx.measureText('RESUMEN').width;
    blackPill(ctx, CX + 128, midY - 62, rw + 56, 70);
    ctx.fillStyle = '#fff'; ctx.fillText('RESUMEN', CX + 156, midY - 27);
    ctx.font = font(800, 40, true); const dw = ctx.measureText('DEL SERVICIO').width;
    pinkPill(ctx, CX + 130, midY + 8, dw + 56, 66);
    ctx.fillStyle = '#fff'; ctx.fillText('DEL SERVICIO', CX + 158, midY + 41);
    ctx.fillStyle = PINK2; ctx.fillRect(CX + 418, y + 28, 3, resumenH - 56);

    let ry = y + 40;
    rows.forEach((r) => {
      if (r.hi) { rr(ctx, CX + 440, ry - 2, 570, 42, 8); ctx.fillStyle = '#ffd6e8'; ctx.fill(); }
      ctx.fillStyle = '#111';
      ctx.font = font(r.hi ? 700 : 500, 30); ctx.textAlign = 'left';
      ctx.fillText(r.k, CX + 454, ry + 20);
      ctx.font = font(700, 30); ctx.textAlign = 'right';
      ctx.fillText(r.v, CX + 990, ry + 20);
      if (!r.hi) { ctx.fillStyle = 'rgba(0,0,0,.08)'; ctx.fillRect(CX + 454, ry + 42, 536, 1.5); }
      ry += 44;
    });
    const ty2 = y + resumenH - 24 - 74;
    const totalNum = fmtNum(m.total);
    ctx.font = font(800, 62, true); const tnw = ctx.measureText(totalNum).width;
    ctx.font = font(800, 40, true); const tsw = ctx.measureText('S/').width;
    const tpw = Math.max(230, tnw + tsw + 70);
    blackPill(ctx, CX + 440, ty2, 520, 74);
    ctx.textAlign = 'left'; ctx.fillStyle = '#fff'; ctx.font = font(700, 33, true);
    ctx.fillText('TOTAL DEL SERVICIO', CX + 475, ty2 + 38);
    const tpx = CX + CW - tpw - 6;
    pinkPill(ctx, tpx, ty2 - 6, tpw, 86);
    ctx.fillStyle = '#fff';
    const tstart = tpx + (tpw - (tsw + tnw + 6)) / 2;
    ctx.font = font(800, 40, true); ctx.fillText('S/', tstart, ty2 + 38);
    ctx.font = font(800, 62, true); ctx.fillText(totalNum, tstart + tsw + 6, ty2 + 36);
    y += resumenH + 18;

    /* --- movilidad --- */
    if (m.tr) {
      icon(ctx, 'truck', CX + 95, y + 80, 130, PINK1);
      ctx.textAlign = 'left'; ctx.fillStyle = '#0a0a0a'; ctx.font = font(800, 40, true);
      ctx.fillText('MOVILIDAD', CX + 236, y + 42);
      const mn = fmtNum(m.trPrice);
      ctx.font = font(800, 52, true); const mnw = ctx.measureText(mn).width;
      ctx.font = font(800, 36, true); const msw = ctx.measureText('S/').width;
      const mpw = Math.max(190, mnw + msw + 56);
      pinkPill(ctx, CX + 238, y + 78, mpw, 72);
      ctx.fillStyle = '#fff';
      const mstart = CX + 238 + (mpw - (msw + mnw + 6)) / 2;
      ctx.font = font(800, 36, true); ctx.fillText('S/', mstart, y + 116);
      ctx.font = font(800, 52, true); ctx.fillText(mn, mstart + msw + 6, y + 114);

      ctx.fillStyle = PINK1; ctx.fillRect(CX + 497, y + 30, 3, 120);
      icon(ctx, 'pin', CX + 570, y + 72, 90, PINK2);
      ctx.fillStyle = '#0a0a0a'; ctx.font = font(800, 44, true);
      ctx.fillText(m.tr.label, CX + 625, y + 52);
      ctx.font = font(500, 25); ctx.fillStyle = '#222';
      wrap(ctx, m.tr.note || '', 380).slice(0, 3).forEach((ln, i) => ctx.fillText(ln, CX + 625, y + 96 + i * 30));
      y += transportH;
    }

    /* --- banner final --- */
    rr(ctx, 70, y, W - 140, 76, 38); ctx.fillStyle = '#0a0a0a'; ctx.fill();
    ctx.font = font(600, 38, true);
    const wPre = ctx.measureText(b.closingPre).width;
    ctx.font = font(800, 38, true);
    const wHi = ctx.measureText(b.closingHi).width;
    ctx.font = font(600, 38, true);
    const wPost = ctx.measureText(b.closingPost).width;
    let tx = W / 2 - (wPre + wHi + wPost) / 2;
    ctx.textAlign = 'left'; ctx.fillStyle = '#fff'; ctx.font = font(600, 38, true);
    ctx.fillText(b.closingPre, tx, y + 40); tx += wPre;
    ctx.fillStyle = PINK1; ctx.font = font(800, 38, true);
    ctx.fillText(b.closingHi, tx, y + 40);
    ctx.fillRect(tx, y + 62, wHi, 4); tx += wHi;
    ctx.fillStyle = '#fff'; ctx.font = font(600, 38, true);
    ctx.fillText(b.closingPost, tx, y + 40);
    ctx.textAlign = 'center'; ctx.font = font(700, 30, false);
    ctx.fillText('✦', 108, y + 38); ctx.fillText('✦', W - 108, y + 38);
    y += bannerH;

    if (b.phone) {
      ctx.textAlign = 'center'; ctx.fillStyle = '#111'; ctx.font = font(700, 30);
      ctx.fillText('Contacto: ' + b.phone, W / 2, y + 22);
    }
  }

  /* ------------------------------------------------------------------ */
  /* Render                                                              */
  /* ------------------------------------------------------------------ */
  const canvas = $('#flyer');
  let token = 0;
  const fontsReady = (document.fonts && document.fonts.load)
    ? Promise.all([
        document.fonts.load("italic 800 40px 'Poppins'"),
        document.fonts.load("italic 700 40px 'Poppins'"),
        document.fonts.load("italic 600 40px 'Poppins'"),
        document.fonts.load("700 30px 'Poppins'"),
        document.fonts.load("600 30px 'Poppins'"),
        document.fonts.load("500 30px 'Poppins'"),
      ]).catch(() => {})
    : Promise.resolve();

  async function render() {
    const my = ++token;
    await fontsReady;
    const m = buildModel();
    const has = m.lines.length > 0;
    $('#empty').hidden = has;
    canvas.hidden = !has;
    ['btn-download', 'btn-share', 'btn-copy'].forEach((id) => { $('#' + id).disabled = !has; });
    if (!has) return;
    const photos = {};
    await Promise.all(m.lines.map(async (l) => { photos[l.s.id] = await loadImg(l.s.photo); }));
    const logo = await loadImg(catalog.business.logo);
    if (my !== token) return;
    drawFlyer(canvas, m, { photos, logo });
  }

  function fileName() {
    const base = (quote.client || 'cliente').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '');
    return `Cotizacion-${catalog.business.name}-${base || 'cliente'}.png`;
  }
  function canvasBlob() { return new Promise((res) => canvas.toBlob(res, 'image/png')); }

  $('#btn-download').addEventListener('click', async () => {
    const blob = await canvasBlob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = fileName();
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  });
  $('#btn-share').addEventListener('click', async () => {
    const blob = await canvasBlob();
    const file = new File([blob], fileName(), { type: 'image/png' });
    try {
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text: quoteText(buildModel()) });
      } else {
        toast('Tu navegador no permite compartir imágenes. Usa “Descargar” y envíala por WhatsApp.');
      }
    } catch (e) { /* cancelado */ }
  });
  $('#btn-copy').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(quoteText(buildModel())); toast('Texto copiado. Pégalo en WhatsApp.'); }
    catch (e) { toast('No se pudo copiar el texto.'); }
  });

  /* ------------------------------------------------------------------ */
  /* Ajustes                                                             */
  /* ------------------------------------------------------------------ */
  function renderSettings() {
    const b = catalog.business;
    const root = $('#settings-root');
    root.innerHTML = `
      <div class="warn">Los precios que vienen cargados son <b>ejemplos</b>. Cámbialos aquí por los reales. Todo se guarda automáticamente en este navegador.</div>

      <div class="set-card" data-section="business">
        <h3>Datos de la empresa</h3>
        <div class="row">
          <label>Nombre <input data-b="name" value="${esc(b.name)}"></label>
          <label>Eslogan <input data-b="tagline" value="${esc(b.tagline)}"></label>
        </div>
        <label>Teléfono / WhatsApp (opcional, sale en el flyer) <input data-b="phone" value="${esc(b.phone)}"></label>
        <div class="row">
          <label>Frase final (inicio) <input data-b="closingPre" value="${esc(b.closingPre)}"></label>
          <label>Frase final (resaltado en rosa) <input data-b="closingHi" value="${esc(b.closingHi)}"></label>
        </div>
        <label>Frase final (cierre) <input data-b="closingPost" value="${esc(b.closingPost)}"></label>
        <div class="inline">
          ${b.logo ? `<img class="thumb" style="background:#0a0a0a;object-fit:contain" src="${b.logo}" alt="logo">` : ''}
          <label>Logo (opcional, PNG con fondo transparente)<input type="file" accept="image/*" data-logo></label>
          ${b.logo ? '<button class="btn small danger" data-del-logo>Quitar logo</button>' : ''}
        </div>
      </div>

      ${catalog.services.map((s, si) => `
        <div class="set-card" data-s="${si}">
          <h3>Servicio: ${esc(s.name)}</h3>
          <div class="row">
            <label>Nombre del servicio <input data-sf="name" value="${esc(s.name)}"></label>
            <label>Icono <select data-sf="icon">${Object.entries(ICON_CHOICES).map(([k, v]) => `<option value="${k}" ${s.icon === k ? 'selected' : ''}>${v}</option>`).join('')}</select></label>
          </div>
          <div class="inline">
            ${s.photo ? `<img class="thumb" src="${s.photo}" alt="foto">` : '<span class="note">Sin foto (se usa un fondo morado)</span>'}
            <label>Foto del servicio<input type="file" accept="image/*" data-photo></label>
            ${s.photo ? '<button class="btn small danger" data-del-photo>Quitar foto</button>' : ''}
          </div>
          <h4>Opciones y precios</h4>
          ${s.options.map((o, oi) => `
            <div class="opt" data-o="${oi}">
              <div class="opt-grid">
                <label>Nombre de la opción <input data-of="label" value="${esc(o.label)}"></label>
                <label>Precio (S/) <input data-of="price" type="number" min="0" step="any" inputmode="decimal" value="${esc(o.price)}"></label>
                <label>Hasta (invitados) <input data-of="upTo" type="number" min="0" inputmode="numeric" placeholder="—" value="${o.upTo ?? ''}"></label>
              </div>
              <label>Texto en el resumen <input data-of="summary" value="${esc(o.summary || '')}"></label>
              <label>Viñetas del flyer (una por línea)<textarea data-of="bullets">${esc((o.bullets || []).join('\n'))}</textarea></label>
              <div><button class="btn small danger" data-del-opt>Eliminar opción</button></div>
            </div>`).join('')}
          <div class="inline">
            <button class="btn small" data-add-opt>+ Agregar opción</button>
            <button class="btn small danger" data-del-svc>Eliminar servicio</button>
          </div>
          <p class="note">“Hasta (invitados)” se usa solo para recomendar el sonido según el tamaño del evento.</p>
        </div>`).join('')}

      <div><button class="btn" id="add-svc">+ Agregar servicio</button></div>

      <div class="set-card" data-section="transport">
        <h3>Movilidad por zona</h3>
        ${catalog.transport.map((t, ti) => `
          <div class="opt" data-t="${ti}">
            <div class="opt-grid">
              <label>Zona <input data-tf="label" value="${esc(t.label)}"></label>
              <label>Precio (S/) <input data-tf="price" type="number" min="0" step="any" inputmode="decimal" value="${esc(t.price)}"></label>
              <span></span>
            </div>
            <label>Nota <input data-tf="note" value="${esc(t.note || '')}"></label>
            <div><button class="btn small danger" data-del-tr>Eliminar zona</button></div>
          </div>`).join('')}
        <div><button class="btn small" id="add-tr">+ Agregar zona</button></div>
      </div>

      <div class="set-card">
        <h3>Copia de seguridad</h3>
        <p class="note">Los datos viven en este navegador. Descarga una copia para no perderlos o para usarlos en otro dispositivo.</p>
        <div class="inline">
          <button class="btn small" id="exp">Exportar (.json)</button>
          <label class="btn small" style="cursor:pointer">Importar <input type="file" id="imp" accept="application/json" hidden></label>
          <button class="btn small danger" id="reset">Restablecer valores de ejemplo</button>
        </div>
      </div>`;
  }

  function bindSettings() {
    const root = $('#settings-root');

    root.addEventListener('input', (e) => {
      const t = e.target;
      if (t.dataset.b) {
        catalog.business[t.dataset.b] = t.value; saveCatalog(); return;
      }
      const sc = t.closest('[data-s]');
      if (sc) {
        const s = catalog.services[+sc.dataset.s];
        if (t.dataset.sf) { s[t.dataset.sf] = t.value; saveCatalog(); return; }
        const oc = t.closest('[data-o]');
        if (oc && t.dataset.of) {
          const o = s.options[+oc.dataset.o];
          const f = t.dataset.of;
          if (f === 'price') o.price = parseFloat(t.value) || 0;
          else if (f === 'upTo') o.upTo = t.value === '' ? null : parseInt(t.value, 10);
          else if (f === 'bullets') o.bullets = t.value.split('\n').map((x) => x.trim()).filter(Boolean);
          else o[f] = t.value;
          saveCatalog();
        }
        return;
      }
      const tc = t.closest('[data-t]');
      if (tc && t.dataset.tf) {
        const tr = catalog.transport[+tc.dataset.t];
        tr[t.dataset.tf] = t.dataset.tf === 'price' ? (parseFloat(t.value) || 0) : t.value;
        saveCatalog();
      }
    });

    root.addEventListener('change', async (e) => {
      const t = e.target;
      if (t.matches('[data-sf="icon"]')) { catalog.services[+t.closest('[data-s]').dataset.s].icon = t.value; saveCatalog(); return; }
      if (t.matches('[data-photo]') && t.files[0]) {
        const s = catalog.services[+t.closest('[data-s]').dataset.s];
        s.photo = await fileToDataUrl(t.files[0], 900, 'image/jpeg', 0.82);
        saveCatalog(); renderSettings(); return;
      }
      if (t.matches('[data-logo]') && t.files[0]) {
        catalog.business.logo = await fileToDataUrl(t.files[0], 600, 'image/png');
        saveCatalog(); renderSettings(); return;
      }
      if (t.id === 'imp' && t.files[0]) {
        try {
          const c = JSON.parse(await t.files[0].text());
          if (!c.services || !c.business) throw new Error('formato');
          catalog = c; saveCatalog(); renderSettings(); alert('Datos importados.');
        } catch (err) { alert('El archivo no es válido.'); }
      }
    });

    root.addEventListener('click', (e) => {
      const t = e.target.closest('button'); if (!t) return;
      const sc = t.closest('[data-s]');
      if (t.hasAttribute('data-add-opt') && sc) {
        catalog.services[+sc.dataset.s].options.push({ id: uid(), label: 'Nueva opción', summary: '', price: 0, upTo: null, bullets: ['Detalle del servicio'] });
        saveCatalog(); renderSettings();
      } else if (t.hasAttribute('data-del-opt') && sc) {
        const s = catalog.services[+sc.dataset.s];
        if (s.options.length <= 1) { alert('Cada servicio necesita al menos una opción.'); return; }
        s.options.splice(+t.closest('[data-o]').dataset.o, 1);
        saveCatalog(); renderSettings();
      } else if (t.hasAttribute('data-del-svc') && sc) {
        const s = catalog.services[+sc.dataset.s];
        if (confirm(`¿Eliminar el servicio “${s.name}”?`)) { delete quote.sel[s.id]; catalog.services.splice(+sc.dataset.s, 1); saveCatalog(); renderSettings(); }
      } else if (t.hasAttribute('data-del-photo') && sc) {
        catalog.services[+sc.dataset.s].photo = null; saveCatalog(); renderSettings();
      } else if (t.hasAttribute('data-del-logo')) {
        catalog.business.logo = null; saveCatalog(); renderSettings();
      } else if (t.id === 'add-svc') {
        catalog.services.push({ id: uid(), name: 'Nuevo servicio', icon: 'bulb', photo: null,
          options: [{ id: uid(), label: 'Opción 1', summary: '', price: 0, upTo: null, bullets: ['Detalle del servicio'] }] });
        saveCatalog(); renderSettings();
      } else if (t.id === 'add-tr') {
        catalog.transport.push({ id: uid(), label: 'Nueva zona', price: 0, note: 'Incluye traslado de ida. El retorno es asumido por la empresa.' });
        saveCatalog(); renderSettings();
      } else if (t.hasAttribute('data-del-tr')) {
        catalog.transport.splice(+t.closest('[data-t]').dataset.t, 1); saveCatalog(); renderSettings();
      } else if (t.id === 'exp') {
        const blob = new Blob([JSON.stringify(catalog, null, 2)], { type: 'application/json' });
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'serfish-catalogo.json';
        document.body.appendChild(a); a.click(); a.remove();
      } else if (t.id === 'reset') {
        if (confirm('Se borrarán tus precios, fotos y logo y volverán los valores de ejemplo. ¿Continuar?')) {
          catalog = JSON.parse(JSON.stringify(DEFAULT_CATALOG)); saveCatalog(); renderSettings();
        }
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Pestañas e inicio                                                   */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((x) => x.classList.toggle('active', x === tab));
      const v = tab.dataset.view;
      $('#view-quote').hidden = v !== 'quote';
      $('#view-settings').hidden = v !== 'settings';
      if (v === 'quote') {
        Object.keys(quote.sel).forEach((id) => { if (!catalog.services.some((s) => s.id === id)) delete quote.sel[id]; });
        // si una opción elegida fue eliminada, volver a la primera
        catalog.services.forEach((s) => {
          if (quote.sel[s.id] && !s.options.some((o) => o.id === quote.sel[s.id])) quote.sel[s.id] = s.options[0].id;
        });
        renderServicesPanel(); render();
      }
    });
  });

  bindQuotePanel();
  bindSettings();
  renderServicesPanel();
  renderSettings();
  render();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(render);
})();
