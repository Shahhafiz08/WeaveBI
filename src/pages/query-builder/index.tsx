import { Helmet } from 'react-helmet-async';

import { QueryBuilder } from '@mui/icons-material';

import { CONFIG } from 'src/config-global';

const metadata = { title: `Query Builder ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <QueryBuilder />
    </>
  );
}
