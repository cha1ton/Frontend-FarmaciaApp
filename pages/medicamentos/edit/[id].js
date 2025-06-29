import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styles from '../../../styles/FormPage.module.css';

export default function EditMedicamento() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tipos, setTipos] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [medRes, tiposRes] = await Promise.all([
          axios.get(`/api/medicamentos/${id}`),
          axios.get('/api/tipos-medicamento')
        ]);
        
        const medicamento = medRes.data;
        setTipos(tiposRes.data);
        
        setValue('descripcionMed', medicamento.descripcionMed);
        setValue('CodTipoMed', medicamento.CodTipoMed);
        setValue('stock', medicamento.stock);
        setValue('precioVentaUni', medicamento.precioVentaUni);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    if (id) fetchData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await axios.put(`/api/medicamentos/${id}`, {
        ...data,
        stock: parseInt(data.stock),
        precioVentaUni: parseFloat(data.precioVentaUni),
        CodTipoMed: parseInt(data.CodTipoMed)
      });
      router.push('/medicamentos');
    } catch (error) {
      console.error('Error updating medicamento:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Editar Medicamento</h1>
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
            {isSubmitting ? 'Actualizando...' : 'Actualizar'}
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