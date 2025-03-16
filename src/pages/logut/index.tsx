import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import QueryBuilderView from 'src/sections/queryBuilder/queryBuilder';

const metadata = { title: `404 page not found! | Error - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <QueryBuilderView />
    </>
  );
}
