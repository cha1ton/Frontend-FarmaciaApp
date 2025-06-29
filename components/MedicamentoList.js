import styles from '../styles/MedicamentoList.module.css';

export default function MedicamentoList({ medicamentos }) {
  return (
    <div className={styles.list}>
      {medicamentos.length === 0 ? (
        <p>No hay medicamentos registrados</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Stock</th>
              <th>Precio Unit.</th>
            </tr>
          </thead>
          <tbody>
            {medicamentos.map((med) => (
              <tr key={med.CodMedicamento}>
                <td>{med.descripcionMed}</td>
                <td>{med.TipoMedic?.descripcion}</td>
                <td>{med.stock}</td>
                <td>${med.precioVentaUni}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}