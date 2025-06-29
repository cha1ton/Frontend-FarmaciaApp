import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [tiposMedicamento, setTiposMedicamento] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Usa la variable de entorno o fallback a ruta relativa en desarrollo
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
      
      const [medRes, tiposRes] = await Promise.all([
        axios.get(`${apiBaseUrl}/api/medicamentos`),
        axios.get(`${apiBaseUrl}/api/tipos-medicamento`)
      ]);
      
      setMedicamentos(medRes.data.slice(0, 5));
      setTiposMedicamento(tiposRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className={styles.container}>Cargando...</div>;

  return (
    <div className={styles.container}>
      <h1>Sistema de Farmacia</h1>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Resumen de Medicamentos</h2>
          <p>Total: {medicamentos.length}</p>
          <Link href="/medicamentos" className={styles.link}>
            Ver todos los medicamentos →
          </Link>
        </div>
        
        <div className={styles.card}>
          <h2>Tipos de Medicamentos</h2>
          <p>Total: {tiposMedicamento.length}</p>
          <Link href="/tipos-medicamento" className={styles.link}>
            Ver todos los tipos →
          </Link>
        </div>
      </div>
    </div>
  );
}