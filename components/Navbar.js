import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  
  // Función para manejar la navegación
  const handleNavigation = (path) => {
    if (router.pathname !== path) {
      router.push(path);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Farmacia App</div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/" legacyBehavior>
            <a className={router.pathname === '/' ? styles.active : ''}>Inicio</a>
          </Link>
        </li>
        <li>
          <Link href="/medicamentos" legacyBehavior>
            <a className={router.pathname === '/medicamentos' ? styles.active : ''}>Medicamentos</a>
          </Link>
        </li>
        <li>
          <Link href="/tipos-medicamento" legacyBehavior>
            <a className={router.pathname === '/tipos-medicamento' ? styles.active : ''}>Tipos</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}