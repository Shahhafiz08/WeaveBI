import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';



// ----------------------------------------------------------------------

const metadata = { title: `Query Builder - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
     query builder
    
    </>
  );
}
