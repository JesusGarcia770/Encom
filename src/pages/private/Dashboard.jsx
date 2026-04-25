import './Dashboard.css'

export default function Dashboard() {
  const ventas = [
    { dia: 'Mon', valor: 80359 },
    { dia: 'Tue', valor: 144308 },
    { dia: 'Wed', valor: 161458 },
    { dia: 'Thu', valor: 243007 },
    { dia: 'Fri', valor: 296307 },
    { dia: 'Sat', valor: 697403 },
    { dia: 'Sun', valor: 1000000 }
  ]

  const ultimosPedidos = [
    { name: 'Juan Perez', id: '#1', fecha: 'Feb 27', estado: 'Completado' },
    { name: 'Ana Torres', id: '#2', fecha: 'Feb 27', estado: 'Pendiente' },
    { name: 'Carlos Lopez', id: '#3', fecha: 'Feb 27', estado: 'Enviado' },
    { name: 'Eugenio Reyes', id: '#4', fecha: 'Feb 27', estado: 'Completado' },
    { name: 'Ana Torres', id: '#5', fecha: 'Feb 27', estado: 'Pendiente' }
  ]

  const pagos = [
    { id: '9a55fd', usuario: 'Ana Torres', monto: 150, estado: 'Completado' },
    { id: '9a55fd', usuario: 'Juan Pérez', monto: 150, estado: 'Pendiente' },
    { id: '9a55fd', usuario: 'Luis Sánchez', monto: 150, estado: 'Fallida' },
    { id: '9a55fd', usuario: 'Dubal Martínez', monto: 150, estado: 'Completado' },
    { id: '9a55fd', usuario: 'Juan Pérez', monto: 150, estado: 'Pendiente' },
    { id: '9a55fd', usuario: 'Luis Sánchez', monto: 150, estado: 'Fallida' },
    { id: '9a55fd', usuario: 'Juan Pérez', monto: 150, estado: 'Pendiente' },
    { id: '9a55fd', usuario: 'Luis Sánchez', monto: 150, estado: 'Fallida' },
    { id: '9a55fd', usuario: 'Luis Sánchez', monto: 150, estado: 'Fallida' },
    { id: '9a55fd', usuario: 'Dubal Martínez', monto: 150, estado: 'Completado' }
  ]

  const maxVenta = Math.max(...ventas.map(v => v.valor))
  const chartWidth = 760
  const chartHeight = 240
  const padding = { top: 30, right: 40, bottom: 40, left: 60 }

  const points = ventas.map((v, i) => {
    const x = padding.left + (i * (chartWidth - padding.left - padding.right) / (ventas.length - 1))
    const y = padding.top + (chartHeight - padding.top - padding.bottom) * (1 - v.valor / maxVenta)
    return { x, y, valor: v.valor, dia: v.dia }
  })

  const smoothPathD = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x.toFixed(1)} ${p.y.toFixed(1)}`
    const prev = points[i - 1]
    const cpx1 = (prev.x + (p.x - prev.x) * 0.4).toFixed(1)
    const cpx2 = (p.x - (p.x - prev.x) * 0.4).toFixed(1)
    return `${acc} C ${cpx1} ${prev.y.toFixed(1)} ${cpx2} ${p.y.toFixed(1)} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`
  }, '')

  const areaD = `${smoothPathD} L ${points[points.length - 1].x.toFixed(1)} ${chartHeight - padding.bottom} L ${points[0].x.toFixed(1)} ${chartHeight - padding.bottom} Z`

  return (
    <div className="dashboard-page">
      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1>Dasboard</h1>
          <p>Bienvenido otra vez Jesus, aqui esta el resumen de hoy</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Exportar
          </button>
          <button className="btn-primary">Feb 2026</button>
        </div>
      </div>

      {/* MÉTRICAS */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon icon-blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <span className="metric-label">Ventas del mes</span>
          <h2 className="metric-value">$5,200</h2>
          <span className="metric-change up">▲ +12.5% vs mes anterior</span>
        </div>

        <div className="metric-card">
          <div className="metric-icon icon-teal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
          </div>
          <span className="metric-label">Pedidos totales</span>
          <h2 className="metric-value">125</h2>
          <span className="metric-change up">▲ +8 pedidos este mes</span>
        </div>

        <div className="metric-card">
          <div className="metric-icon icon-purple">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <span className="metric-label">Usuarios registrados</span>
          <h2 className="metric-value">$5,200</h2>
          <span className="metric-change up">▲ +12.5% vs mes anterior</span>
        </div>

        <div className="metric-card">
          <div className="metric-icon icon-orange">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            </svg>
          </div>
          <span className="metric-label">Ventas del mes</span>
          <h2 className="metric-value">$5,200</h2>
          <span className="metric-change up">▲ +12.5% vs mes anterior</span>
        </div>
      </div>

      {/* GRÁFICO + ÚLTIMOS PEDIDOS */}
      <div className="chart-row">
        <div className="chart-card">
          <h3>Ventas Recientes</h3>
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="chart-svg">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4d8eff" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
              <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4d8eff" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#4d8eff" stopOpacity="0" />
              </linearGradient>
              <filter id="lineGlow" x="-5%" y="-80%" width="110%" height="260%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Grid lines */}
            {[0, 0.5, 1].map((t, gi) => {
              const gy = padding.top + (chartHeight - padding.top - padding.bottom) * (1 - t)
              const glabel = t === 0 ? '0' : t === 0.5 ? '500k' : '1M'
              return (
                <g key={gi}>
                  {t === 0
                    ? <line x1={padding.left} y1={gy} x2={chartWidth - padding.right} y2={gy} stroke="#2d3748" strokeWidth="1" />
                    : <line x1={padding.left} y1={gy} x2={chartWidth - padding.right} y2={gy} stroke="#1c2333" strokeDasharray="4 6" strokeWidth="1" />
                  }
                  <text x={padding.left - 8} y={gy + 4} fill="#4b5563" fontSize="10" textAnchor="end">{glabel}</text>
                </g>
              )
            })}

            {/* Área bajo la curva */}
            <path d={areaD} fill="url(#areaGrad)" />

            {/* Línea con glow */}
            <path d={smoothPathD} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" filter="url(#lineGlow)" />

            {/* Puntos */}
            {points.map((p, i) => (
              <g key={i} className="chart-point-group">
                <circle cx={p.x} cy={p.y} r="12" fill="#4d8eff" fillOpacity="0.04" />
                <circle cx={p.x} cy={p.y} r="7" fill="#4d8eff" fillOpacity="0.1" className="chart-dot-outer" />
                <circle cx={p.x} cy={p.y} r="4" fill="#4d8eff" stroke="#131825" strokeWidth="2" />
                <text x={p.x} y={p.y - 16} fill="#9ca3af" fontSize="9.5" textAnchor="middle" fontWeight="500">
                  {p.valor >= 1000000 ? `${(p.valor / 1000000).toFixed(1)}M` : `${Math.round(p.valor / 1000)}k`}
                </text>
                <text x={p.x} y={chartHeight - padding.bottom + 18} fill="#6b7280" fontSize="11" textAnchor="middle">{p.dia}</text>
              </g>
            ))}
          </svg>
        </div>

        <div className="recent-orders">
          <div className="recent-header">
            <h4>Ultimos pedidos</h4>
            <a href="#">ver todos ›</a>
          </div>
          <div className="recent-cols">
            <span>FECHA</span>
            <span>ESTADO</span>
          </div>
          {ultimosPedidos.map((p, i) => (
            <div key={i} className="recent-row">
              <div>
                <strong>{p.name}</strong>
                <span className="muted">{p.id}</span>
              </div>
              <span className="muted">{p.fecha}</span>
              <span className={`pill pill-${p.estado.toLowerCase()}`}>● {p.estado}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PAGOS RECIENTES */}
      <div className="payments-card">
        <div className="recent-header">
          <h4>Pagos recientes</h4>
          <a href="#">ver todos ›</a>
        </div>
        <table className="payments-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USUARIO</th>
              <th>MONTO</th>
              <th>ESTADO</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((p, i) => (
              <tr key={i}>
                <td>{p.id}</td>
                <td>{p.usuario}</td>
                <td>${p.monto}</td>
                <td><span className={`pill pill-${p.estado.toLowerCase()}`}>● {p.estado}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
