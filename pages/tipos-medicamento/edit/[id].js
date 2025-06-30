import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styles from '../../../styles/FormPage.module.css';

export default function EditTipoMedicamento() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchTipo = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tipos-medicamento/${id}`);
        setValue('descripcion', res.data.descripcion);
      } catch (error) {
        console.error('Error fetching tipo:', error);
        router.push('/tipos-medicamento');
      }
    };
    
    if (id) fetchTipo();
  }, [id, setValue, router]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/tipos-medicamento/${id}`, {
        descripcion: data.descripcion
      });
      router.push('/tipos-medicamento');
    } catch (error) {
      console.error('Error updating tipo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Editar Tipo de Medicamento</h1>
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
            {isSubmitting ? 'Actualizando...' : 'Actualizar'}
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