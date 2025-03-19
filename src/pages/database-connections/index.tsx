import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import DatabaseConnectionsView from 'src/sections/dbConnections';

const metadata = { title: `Database connections - ${CONFIG.site.name}` };

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
