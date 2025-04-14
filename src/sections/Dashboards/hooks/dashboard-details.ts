import { toast } from 'react-toastify';
import { Responsive, WidthProvider } from 'react-grid-layout';
import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';

import { getDashboardInfo, parallellyRunAllQueries } from '../api/actions';

const useDashboardDetails = ({ id }: { id?: string | number }) => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [renderableQueries, setRenderableQueries] = useState<any[]>([]);
  const gridContainerRef = useRef<HTMLDivElement | null>(null);

  const chartColors = [
    'rgba(84, 133, 135, 0.8)',
    'rgba(235, 100, 119, 0.8)',
    'rgba(242, 200, 92, 0.8)',
    'rgba(84, 133, 135, 0.5)',
    'rgba(235, 100, 120, 0.5)',
    'rgba(242, 200, 92, 0.5)',
  ];
  function editDashboard() {
    setEdit(true);
  }
  function saveDashboard() {
    setEdit(false);
  }
  // fetch dashboard data
  const fetchDashboardInfo = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getDashboardInfo(id as unknown as string);
      setDashboardData(response);

      const _renderableQueries = response?.queries.filter(
        (query: { data: any; outputType: string }) =>
          query.data &&
          (query.outputType.toLowerCase() === 'tabular' ||
            query.outputType.toLowerCase() === 'descriptive' ||
            query.outputType.toLowerCase() === 'singlevalue' ||
            (query.data.graph_type &&
              ['bar', 'pie', 'line', 'stacked', 'scatter', 'doughnut', 'singleValue'].includes(
                query.data.graph_type.toLowerCase()
              )))
      );
      setRenderableQueries(_renderableQueries);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [id]);
  // Refresh dashboard
  const refreshDashboardQueries = useCallback(async () => {
    try {
      setRefreshLoading(true);
      await parallellyRunAllQueries(id as string);
      await fetchDashboardInfo();
      toast.success('Dashboard refreshed');
    } catch (err) {
      toast.error('Something went wrong');
      console.log(err);
    } finally {
      setRefreshLoading(false);
    }
  }, [id, fetchDashboardInfo]);

  useEffect(() => {
    if (id) {
      fetchDashboardInfo();
    }
  }, [id, fetchDashboardInfo]);

  // Intitial size of charts
  const chartLayoutConfig: Record<
    string,
    { w?: number; h?: number; minH?: number; minW?: number; maxH?: number; maxW?: number }
  > = useMemo(
    () => ({
      bar: { w: 12, h: 6 },
      'scatter plot': { w: 22, h: 6 },
      pie: { w: 15, h: 7, minH: 4, minW: 10 },
      doughnut: { w: 15, h: 7 },
      line: { w: 16, h: 4 },
      Stacked: { w: 22, h: 5 },
      tabular: { w: 30, h: 7 },
      descriptive: { w: 14, h: 6 },
      singlevalue: { w: 8, h: 4 },
    }),
    []
  );

  const layouts = {
    lg:
      renderableQueries?.map((query: any, index: number) => {
        const { w, h } = chartLayoutConfig[query.outputType.toLowerCase().trim()] || {
          w: 15,
          h: 6,
        };

        const perRow = Math.floor(60 / 20);

        return {
          i: query.id.toString(),
          x: (index % perRow) * 15,
          y: Math.floor(index / perRow) * 6,
          w,
          h,
        };
      }) || [],
  };

  const ResponsiveGridLayout = WidthProvider(Responsive);

  return {
    refreshLoading,
    chartColors,
    dashboardData,
    setDashboardData,
    loading,
    anchorRef,
    open,
    refreshDashboardQueries,
    setLoading,
    setOpen,
    gridContainerRef,
    saveDashboard,
    editDashboard,
    edit,
    renderableQueries,
    fetchDashboardInfo,
    layouts,
    ResponsiveGridLayout,
  };
};

export default useDashboardDetails;
