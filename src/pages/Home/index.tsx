import { useState, useEffect } from 'react';
import { Paper, Divider } from '@mui/material';

import { Helmet } from 'react-helmet-async';
import pagesService from '../../services/pages.service';
import { IPage } from '../../types';

import PageList from '../../components/PageList';

export default function Home() {
  const [pages, setPages] = useState<IPage[] | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await pagesService.fetchPages();

      setPages(data);
    })();
  }, []);

  return (
    <Paper className="content" elevation={3}>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <h1 className="title">🏠 Home</h1>
      <Divider />
      <h2 className="subtitle">Available pages:</h2>
      <PageList pages={pages} />
    </Paper>
  );
}
