import { Divider, Paper } from '@mui/material';
import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet-async';

import { IPage } from '../../types';

interface IPageProps {
  page: IPage;
}

export default function Page({ page }: IPageProps) {
  return (
    <Paper className="content" elevation={3}>
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
      </Helmet>
      <h1 className="title">{page.title}</h1>
      <Divider />
      <div
        style={{ marginTop: '16px' }}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(page.content as unknown as Node),
        }}
      />
    </Paper>
  );
}
