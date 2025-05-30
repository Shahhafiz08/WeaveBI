import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import { CONFIG } from './config-global';
import { DatabaseIdProvider } from './sections/context/databaseid-context';
import { IsThereDashboard } from './sections/visualize/context/dashbord-context';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  // <StrictMode>
  <HelmetProvider>
    <BrowserRouter basename={CONFIG.site.basePath}>
      <Suspense>
        <IsThereDashboard>
          <DatabaseIdProvider>
            <App />
          </DatabaseIdProvider>
        </IsThereDashboard>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
  // </StrictMode>
);
