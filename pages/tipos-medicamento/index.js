import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from '../../styles/CRUDPage.module.css';

export default function TiposMedicamentoPage() {
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tipos-medicamento`);
        setTipos(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tipos:', error);
        setLoading(false);
      }
    };
    fetchTipos();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar este tipo?')) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/tipos-medicamento/${id}`);
        setTipos(tipos.filter(tipo => tipo.CodTipoMed !== id));
      } catch (error) {
        console.error('Error deleting tipo:', error);
        alert('No se pudo eliminar. Puede que esté en uso por algún medicamento.');
      }
    }
  };

  if (loading) return <div className={styles.container}>Cargando...</div>;

  return (
    <div className={styles.container}>
      <h1>Tipos de Medicamento</h1>
      <Link href="/tipos-medicamento/new" className={styles.addButton}>
        Agregar Nuevo Tipo
      </Link>
      
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tipos.map((tipo) => (
            <tr key={tipo.CodTipoMed}>
              <td>{tipo.CodTipoMed}</td>
              <td>{tipo.descripcion}</td>
              <td>
                <Link 
                  href={`/tipos-medicamento/edit/${tipo.CodTipoMed}`} 
                  className={styles.editButton}
                >
                  Editar
                </Link>
                <button 
                  onClick={() => handleDelete(tipo.CodTipoMed)}
                  className={styles.deleteButton}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}