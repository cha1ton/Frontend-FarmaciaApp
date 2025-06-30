import { useState, useEffect } from 'react'; // Añadir useEffect aquí
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styles from '../../styles/FormPage.module.css';

export default function NewMedicamento() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tipos, setTipos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tipos-medicamento`);
        setTipos(res.data);
      } catch (error) {
        console.error('Error fetching tipos:', error);
      }
    };
    fetchTipos();
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/medicamentos`, {
        ...data,
        stock: parseInt(data.stock),
        precioVentaUni: parseFloat(data.precioVentaUni),
        CodTipoMed: parseInt(data.CodTipoMed)
      });
      router.push('/medicamentos');
    } catch (error) {
      console.error('Error creating medicamento:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Nuevo Medicamento</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Nombre:</label>
          <input 
            {...register('descripcionMed', { required: 'Campo requerido' })} 
          />
          {errors.descripcionMed && <span className={styles.error}>{errors.descripcionMed.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Tipo de Medicamento:</label>
          <select 
            {...register('CodTipoMed', { required: 'Seleccione un tipo' })}
          >
            <option value="">Seleccione...</option>
            {tipos.map(tipo => (
              <option key={tipo.CodTipoMed} value={tipo.CodTipoMed}>
                {tipo.descripcion}
              </option>
            ))}
          </select>
          {errors.CodTipoMed && <span className={styles.error}>{errors.CodTipoMed.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Stock:</label>
          <input 
            type="number"
            {...register('stock', { required: 'Campo requerido', min: 0 })} 
          />
          {errors.stock && <span className={styles.error}>{errors.stock.message}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Precio Unitario:</label>
          <input 
            type="number"
            step="0.01"
            {...register('precioVentaUni', { required: 'Campo requerido', min: 0 })} 
          />
          {errors.precioVentaUni && <span className={styles.error}>{errors.precioVentaUni.message}</span>}
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
            {isSubmitting ? 'Guardando...' : 'Guardar'}
          </button>
          <button 
            type="button" 
            onClick={() => router.push('/medicamentos')}
            className={styles.cancelButton}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}