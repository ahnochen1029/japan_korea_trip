/**
 * Trip Manager — 共用工具
 */

/**
 * 產生單一行程卡片 HTML
 */
function renderTripCard(trip) {
  const statusLabel = { upcoming: '即將出發', ongoing: '進行中', done: '已完成' };
  const tags = trip.tags.map(t =>
    `<span class="tag" style="background:rgba(201,184,255,.12);color:#c9b8ff;border:1px solid rgba(201,184,255,.25)">${t}</span>`
  ).join(' ');

  return `
    <a href="${trip.path}" class="card trip-card" style="display:block;margin-bottom:1.2rem;">
      <div style="display:flex;align-items:flex-start;gap:1rem;">
        <div class="trip-cover">${trip.cover}</div>
        <div style="flex:1;min-width:0;">
          <div style="display:flex;align-items:center;gap:.6rem;flex-wrap:wrap;margin-bottom:.3rem;">
            <h2 style="font-size:1.1rem;font-weight:700;color:#f0f0ff;">${trip.title}</h2>
            <span class="status-badge status-${trip.status}">${statusLabel[trip.status] || trip.status}</span>
          </div>
          <p style="font-size:.82rem;color:rgba(255,255,255,.45);margin-bottom:.6rem;">${trip.subtitle}</p>
          <div style="display:flex;gap:1.2rem;flex-wrap:wrap;font-size:.78rem;color:rgba(255,255,255,.4);margin-bottom:.7rem;">
            <span>📅 ${trip.dateRange}</span>
            <span>⏱ ${trip.duration} 天</span>
            <span>🌍 ${trip.countries.join(' · ')}</span>
          </div>
          <div>${tags}</div>
        </div>
        <div style="font-size:1.4rem;opacity:.4;flex-shrink:0;">›</div>
      </div>
    </a>
  `;
}

/**
 * 計算距離出發的天數
 * @param {string} dateStr - YYYY/MM/DD 格式
 */
function daysUntil(dateStr) {
  const target = new Date(dateStr.replace(/\//g, '-'));
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.ceil((target - today) / 86400000);
  if (diff > 0)  return `還有 ${diff} 天`;
  if (diff === 0) return '今天出發！';
  return `已過 ${Math.abs(diff)} 天`;
}
