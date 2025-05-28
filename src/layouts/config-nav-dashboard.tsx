import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  home: icon('home'),
  connection: icon('connection'),
  visualize: icon('visualize'),
  queryBuilder: icon('query-builder'),
  settings: icon('settings'),
  learn: icon('learn'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    items: [
      { title: 'Home', path: paths.dashboard.home, icon: ICONS.home },
      {
        title: 'Connections',
        path: paths.dashboard.databaseConnections,
        icon: ICONS.connection,
      },
      { title: 'Visualize', path: paths.dashboard.visualize, icon: ICONS.visualize },
      { title: 'Query Builder', path: paths.dashboard.queryBuilder, icon: ICONS.queryBuilder },
      { title: 'Setting', path: paths.dashboard.settings, icon: ICONS.settings },
      { title: 'Learn', path: paths.dashboard.learn, icon: ICONS.learn },
    ],
  },
  /**
   * Management
   */
];
