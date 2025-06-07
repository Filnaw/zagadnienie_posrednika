import "./Table.css";

const Table = ({ matrix, label, originalSupplierCount, originalCustomerCount }) => {
    if (!Array.isArray(matrix)) {
        return <p>Błąd: Brak danych do wyświetlenia w tabeli "{label}"</p>;
    }

    const trimmed = matrix
        .slice(0, originalSupplierCount ?? matrix.length)
        .map(row => row.slice(0, originalCustomerCount ?? row.length));

    return (
        <div className="matrix-section">
            <h3>{label}</h3>
            <table border="1" cellPadding="8">
                <tbody>
                    {trimmed.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <td key={colIndex}>{cell.toFixed(2)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
