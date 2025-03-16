import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import DatabaseConnectionsView from 'src/sections/dbConnections/dbConnections';

const metadata = { title: `404 page not found! | Error - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DatabaseConnectionsView />
    </>
  );
}
