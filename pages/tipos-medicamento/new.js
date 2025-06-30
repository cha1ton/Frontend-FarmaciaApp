import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styles from '../../styles/FormPage.module.css';

export default function NewTipoMedicamento() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/tipos-medicamento`, {
        
        descripcion: data.descripcion
      });
      router.push('/tipos-medicamento');
    } catch (error) {
      console.error('Error creating tipo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Nuevo Tipo de Medicamento</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Descripción:</label>
          <input 
            {...register('descripcion', { 
              required: 'Campo requerido',
              maxLength: {
                value: 100,
                message: 'Máximo 100 caracteres'
              }
            })} 
          />
          {errors.descripcion && (
            <span className={styles.error}>{errors.descripcion.message}</span>
          )}
        </div>

        <div className={styles.buttonGroup}>
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className={styles.submitButton}
          >
            {isSubmitting ? 'Guardando...' : 'Guardar'}
          </button>
          <button 
            type="button" 
            onClick={() => router.push('/tipos-medicamento')}
            className={styles.cancelButton}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}