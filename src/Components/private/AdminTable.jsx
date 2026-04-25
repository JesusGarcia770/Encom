export default function AdminTable({ columns, children, total = 55, label = 'elementos' }) {
  return (
    <div className="table-card">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map(col => <th key={col}>{col}</th>)}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>

      <div className="pagination">
        <span>Mostrando 1-10 de {total} {label}</span>
        <div className="pagination-controls">
          <button className="page-btn">‹</button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn">5</button>
          <button className="page-btn">›</button>
        </div>
      </div>
    </div>
  )
}
