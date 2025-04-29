import { toast } from 'react-toastify';
import { Responsive, WidthProvider } from 'react-grid-layout';
import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';

import { getDashboardInfo, updateQueryPosition, parallellyRunAllQueries } from '../api/actions';

const useDashboardDetails = (id: string | number) => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [renderableQueries, setRenderableQueries] = useState<any[]>([]);
  const gridContainerRef = useRef<HTMLDivElement | null>(null);

  const chartColors = [
    '#253f69',
    '#DDE3EF',
    '#B8C7DF',
    '#92AACF',
    '#6C8EBF',
    '#4771AF',
    '#325F9F',
    '#2C548F',
    '#274A80',
    '#213F70',
  ];
  function editDashboard() {
    setEdit(true);
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
    } catch (err) {
      console.log(err);
    } finally {
      setRefreshLoading(false);
    }
  }, [id, fetchDashboardInfo]);

  useEffect(() => {
    if (id) {
      fetchDashboardInfo();
    }
  }, [fetchDashboardInfo, id]);

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
  // layout design
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
  const layout = useRef<any[]>([]);
  // Save dashboard positions
  const saveLayout = useCallback(async () => {
    const promises = layout.current.map((position) => {
      const { i, x, y, w, h } = position;

      return updateQueryPosition({
        dashboardId: id,
        queryId: i,
        x,
        y,
        z: w,
        h,
      });
    });

    try {
      await Promise.all(promises);
      setEdit(false);
      fetchDashboardInfo();
      toast.success('Dashboard saved sucessfully');
    } catch (error) {
      toast.error('Failed to save dashboard');
    }
  }, [fetchDashboardInfo, id, setEdit]);

  return {
    saveLayout,
    setEdit,
    refreshLoading,
    chartColors,
    dashboardData,
    setDashboardData,
    loading,
    anchorRef,
    layout,
    open,
    refreshDashboardQueries,
    setLoading,
    setOpen,
    gridContainerRef,
    editDashboard,
    edit,
    renderableQueries,
    fetchDashboardInfo,
    layouts,
    ResponsiveGridLayout,
  };
};

export default useDashboardDetails;
