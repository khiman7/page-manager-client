import { Helmet } from 'react-helmet-async';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <Helmet>
        <title>404 Page Not Found</title>
      </Helmet>
      <p className={styles.placeholder}>404 Page Not Found</p>
      <p className={styles.placeholder}>¯\_(ツ)_/¯</p>
    </div>
  );
}
