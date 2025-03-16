import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import HomeView from 'src/sections/home/home';

const metadata = { title: `Home- ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <HomeView />
    </>
  );
}
