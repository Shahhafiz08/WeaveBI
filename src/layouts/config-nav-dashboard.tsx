import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    items: [
      { title: 'Home', path: paths.dashboard.home, icon: ICONS.label },
      {
        title: 'Database Connection',
        path: paths.dashboard.databaseConnections,
        icon: ICONS.ecommerce,
      },
      { title: 'Dashboard', path: paths.dashboard.dashBoard, icon: ICONS.analytics },
      { title: 'Query Builder', path: paths.dashboard.queryBuilder, icon: ICONS.folder },
      { title: 'Setting', path: paths.dashboard.settings, icon: ICONS.banking },
      { title: 'Logut', path: paths.dashboard.logut, icon: ICONS.menuItem },
    ],
  },
  /**
   * Management
   */
];
