export default function SimpleTable({ columns = [], data = [], actions = null }) {
  return (
    <table className="w-full table-auto">
      <thead>
        <tr>{columns.map(c => <th key={c.key} className="text-left p-2">{c.title}</th>)}</tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={row.id || idx} className="border-t">
            {columns.map(c => <td key={c.key} className="p-2">{c.render ? c.render(row) : row[c.key]}</td>)}
            {actions && <td className="p-2">{actions(row)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
