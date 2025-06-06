import type { AxiosRequestConfig } from 'axios';

// ----------------------------------------------------------------------
import axios from 'axios';

import { CONFIG } from 'src/config-global';

// const axiosInstance = axios.create({
//   baseURL: CONFIG.site.serverUrl,
//   httpsAgent: new https.Agent({
//     rejectUnauthorized: false,
//     // ca: fs.readFileSync('C:UsersshahhDownloads'),
//     ca: fs.readFileSync('/public/assets/nginx.crt'),
//   }),
// });
const axiosInstance = axios.create({ baseURL: CONFIG.site.serverUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    signIn: '/auth/login',
    signUp: '/api/auth/sign-up',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
  user: {
    queryActivity: 'user/query-activity',
    queryOutputs: 'user/query-types',
  },

  database: {
    create: '/database',
    get: '/database',
    delete: '/database',
    test: '/database/test',
    count: '/database/count',
  },
  dashboard: {
    create: 'dashboard',
    listOfDashboards: '/dashboard',
    totalDashboardCount: '/dashboard/count',
    delete: 'dashboard',
    pin: 'dashboard/',
    pinnedDashboards: '/dashboard',
    info: 'dashboard/',
    positions: 'dashboard/position',
    colors: 'dashboard/color',
  },
  query: {
    unlinkQueryFromDashboard: 'query/unlink-from-dashboard',
    update: '/query',
    save: '/query',
    linkToDashbord: '/query/link-to-dashboard',
    run: '/query/run',
    get: '/get',
    totalQueryCount: '/query/count-executed',
    runAllQueriesAgain: 'query/sync',
    downloadCharts: '/query',
    downloadTabular: '/query',
    insights: 'query',
    runExistingQuery: 'query/run',
  },
};
