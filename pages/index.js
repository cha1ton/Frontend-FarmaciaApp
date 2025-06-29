//frontend/pages/index.js

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
      const [medRes, tiposRes] = await Promise.all([
        axios.get('/api/medicamentos'),
        axios.get('/api/tipos-medicamento')
      ]);
      setMedicamentos(medRes.data.slice(0, 5)); // Mostrar solo 5 medicamentos
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
      <br />
      <br />
      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Resumen de Medicamentos</h2>
          <br />

          <p>Total: {medicamentos.length}</p>
          <br />
          <Link href="/medicamentos" className={styles.link}>
            Ver todos los medicamentos →
          </Link>
        </div>
        
        <div className={styles.card}>
          <h2>Tipos de Medicamentos</h2>
          <br />

          <p>Total: {tiposMedicamento.length}</p>
          <br />

          <Link href="/tipos-medicamento" className={styles.link}>
            Ver todos los tipos →
          </Link>
        </div>
      </div>
    </div>
  );
}