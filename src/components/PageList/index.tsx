import { Paper } from '@mui/material';
import { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

import { IPage } from '../../types';

import styles from './PageList.module.css';

interface IPageListProps extends HTMLAttributes<HTMLUListElement> {
  pages: IPage[] | null;
}

export default function PageList({ pages }: IPageListProps) {
  return (
    <ul className={styles['page-list']}>
      {pages &&
        pages?.map((page) => (
          <li key={page.slug}>
            <Paper className={styles['page-list__item']}>
              <b>{page.title}</b> / <Link to={page.slug}>{page.slug}</Link>
            </Paper>
          </li>
        ))}
    </ul>
  );
}
