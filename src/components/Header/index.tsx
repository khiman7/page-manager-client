import { AppBar } from '@mui/material';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';

export default function Header() {
  return (
    <AppBar sx={{ bgcolor: '#362b2b' }} className={styles.header}>
      <Link className={styles.header__title} to="/">
        <h1>📄 Page Manager</h1>
      </Link>
    </AppBar>
  );
}
