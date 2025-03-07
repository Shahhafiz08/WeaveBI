import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const metadata = { title: `Logout - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
     Logut
    </>
  );
}
