import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../styles/MedicamentoForm.module.css';

export default function MedicamentoForm({ tiposMedicamento, onSubmit }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = async (data) => {
    setIsSubmitting(true);
    try {
      await onSubmit({
        ...data,
        stock: parseInt(data.stock),
        precioVentaUni: parseFloat(data.precioVentaUni),
        precioVentaPres: parseFloat(data.precioVentaPres),
        CodTipoMed: parseInt(data.CodTipoMed)
      });
      reset();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
      <div className={styles.formGroup}>
        <label>Nombre:</label>
        <input 
          {...register('descripcionMed', { required: 'Este campo es requerido' })} 
        />
        {errors.descripcionMed && <span className={styles.error}>{errors.descripcionMed.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label>Tipo de Medicamento:</label>
        <select 
          {...register('CodTipoMed', { required: 'Seleccione un tipo' })}
        >
          <option value="">Seleccione...</option>
          {tiposMedicamento.map(tipo => (
            <option key={tipo.CodTipoMed} value={tipo.CodTipoMed}>
              {tipo.descripcion}
            </option>
          ))}
        </select>
        {errors.CodTipoMed && <span className={styles.error}>{errors.CodTipoMed.message}</span>}
      </div>

      {/* Más campos del formulario... */}

      <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
        {isSubmitting ? 'Guardando...' : 'Guardar Medicamento'}
      </button>
    </form>
  );
}