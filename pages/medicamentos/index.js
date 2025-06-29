import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from '../../styles/CRUDPage.module.css';

export default function MedicamentosPage() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedicamentos();
  }, []);

  const fetchMedicamentos = async () => {
    try {
      const res = await axios.get('/api/medicamentos');
      setMedicamentos(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching medicamentos:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar este medicamento?')) {
      try {
        await axios.delete(`/api/medicamentos/${id}`);
        fetchMedicamentos();
      } catch (error) {
        console.error('Error deleting medicamento:', error);
        alert('No se pudo eliminar el medicamento');
      }
    }
  };

  if (loading) return <div className={styles.container}>Cargando...</div>;

  return (
    <div className={styles.container}>
      <h1>Medicamentos</h1>
      <Link href="/medicamentos/new" className={styles.addButton}>
        Agregar Nuevo Medicamento
      </Link>
      
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Stock</th>
            <th>Precio Unit.</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map((med) => {
            const precio = med.precioVentaUni !== null ? 
              Number(med.precioVentaUni).toFixed(2) : 
              '0.00';
            
            return (
              <tr key={med.CodMedicamento}>
                <td>{med.descripcionMed || 'Sin nombre'}</td>
                <td>{med.TipoMedic?.descripcion || 'Sin tipo'}</td>
                <td>{med.stock ?? 0}</td>
                <td>${precio}</td>
                <td>
                  <Link 
                    href={`/medicamentos/edit/${med.CodMedicamento}`} 
                    className={styles.editButton}
                  >
                    Editar
                  </Link>
                  <button 
                    onClick={() => handleDelete(med.CodMedicamento)}
                    className={styles.deleteButton}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}