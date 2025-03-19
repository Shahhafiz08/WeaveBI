
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import LogoutView from 'src/sections/logout/logout';

const metadata = { title: `Logout  - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <LogoutView />
    </>
  );
}
