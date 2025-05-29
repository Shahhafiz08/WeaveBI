import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import { Responsive, WidthProvider } from 'react-grid-layout';
import React, { useRef, useState, useEffect, useCallback } from 'react';

import { useDatabaseId } from 'src/sections/context/databaseid-context';

import { getDashboardInfo, updateQueryPosition, parallellyRunAllQueries } from '../api/actions';

const useDashboardDetails = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [renderableQueries, setRenderableQueries] = useState<any[]>([]);
  const gridContainerRef = useRef<HTMLDivElement | null>(null);
  const [isSliderOpen, setIsSliderOpen] = useState<boolean>(false);

  const handleCloseSlider = () => {
    setIsSliderOpen(false);
  };
  const handleOpenSlider = () => {
    setIsSliderOpen(true);
  };
  const { id } = useParams();
  const { setDatabaseId } = useDatabaseId();

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
      const response = await getDashboardInfo(Number(id));

      setDashboardData(response);
      setDatabaseId(response.databaseId);
      const _renderableQueries = response?.queries.filter(
        (query: { data: any; outputType: string }) =>
          query.data &&
          (query.outputType.toLowerCase() === 'tabular' ||
            query.outputType.toLowerCase() === 'descriptive' ||
            query.outputType.toLowerCase() === 'singlevalue' ||
            (query.outputType.toLowerCase() && [
              'bar chart',
              'pie chart',
              'line chart',
              'stacked chart',
              'scatter chart ',
              'doughnut chart',
              'singleValue chart',
            ]))
      );

      setRenderableQueries(_renderableQueries);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [id, setDatabaseId]);

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
  // const chartLayoutConfig: Record<
  //   string,
  //   { w?: number; h?: number; minH?: number; minW?: number; maxH?: number; maxW?: number }
  // > = useMemo(
  //   () => ({
  //     bar: { w: 12, h: 6 },
  //     'scatter plot': { w: 22, h: 6 },
  //     pie: { w: 15, h: 7, minH: 4, minW: 10 },
  //     doughnut: { w: 15, h: 7 },
  //     line: { w: 16, h: 4 },
  //     Stacked: { w: 22, h: 5 },
  //     tabular: { w: 30, h: 7 },
  //     descriptive: { w: 14, h: 6 },
  //     singlevalue: { w: 8, h: 4, minH: 2, minW: 5 },
  //   }),
  //   []
  // );
  // layout design

  const layouts = {
    lg:
      renderableQueries?.map(
        (query: any) =>
          query.position.h === 0 && {
            i: String(1),
            x: 1,
            y: Infinity,
            z: 1,
            h: 7,
            w: 20,
            minH: 4,
            minW: 4,
          }
      ) || [],
  };

  const ResponsiveGridLayout = WidthProvider(Responsive);
  const layout = useRef<any[]>([]);
  // Save dashboard positions
  const saveLayout = useCallback(async () => {
    const positions = layout.current.map((position) => {
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
      await Promise.all(positions);
      setEdit(false);
      fetchDashboardInfo();
      toast.success('Dashboard saved sucessfully');
    } catch (error) {
      toast.error('Failed to save dashboard');
    }
  }, [fetchDashboardInfo, id, setEdit]);

  const handleChangeRenderableQueriesOutputType = (changeType: string, queryid: string) => {
    const foundQuery = renderableQueries.find((query) => query.id === queryid);
    foundQuery.outputType = changeType;
    const filtered = renderableQueries.filter((query) => query.id !== queryid);

    setRenderableQueries([foundQuery, ...filtered]);
  };
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

    handleCloseSlider,
    refreshDashboardQueries,
    setLoading,
    setOpen,
    handleOpenSlider,
    gridContainerRef,
    handleChangeRenderableQueriesOutputType,
    editDashboard,
    edit,
    renderableQueries,
    fetchDashboardInfo,
    layouts,
    ResponsiveGridLayout,
    isSliderOpen,
  };
};

export default useDashboardDetails;
