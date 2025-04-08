import { Responsive, WidthProvider } from 'react-grid-layout';
import React, { useRef, useMemo, useState, useEffect } from 'react';

import { getDashboardInfo } from '../api/actions';

const useDashboardDetails = ({ id }: { id: string | number }) => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState('');
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = useState(false);

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
    setEdit((prev) => !prev);
  }
  useEffect(() => {
    const fetchDashboardInfo = async () => {
      try {
        setLoading(true);
        const response = await getDashboardInfo(id as unknown as string);

        setDashboardData(response);
      } catch (error) {
        setErrors('Error fetching dashboard data:');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchDashboardInfo();
    }
  }, [id]);

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const renderableQueries = dashboardData?.queries.filter(
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

  const chartLayoutConfig: Record<string, { w?: number; h?: number }> = useMemo(
    () => ({
      bar: { w: 12, h: 6 },
      'scatter plot': { w: 22, h: 6 },
      pie: { w: 15, h: 7 },
      doughnut: { w: 15, h: 7 },
      line: { w: 16, h: 4 },
      Stacked: { w: 22, h: 5 },
      tabular: { w: 30, h: 7 },
      descriptive: { w: 14, h: 6 },
      singlevalue: { w: 8, h: 4 },
    }),
    []
  );

  const layouts = useMemo(
    () => ({
      lg:
        renderableQueries?.map((query: any, index: number) => {
          const { w, h } = chartLayoutConfig[query.outputType.toLowerCase().trim()] || {
            w: 15,
            h: 6,
          };
          console.log(chartLayoutConfig);
          const perRow = Math.floor(50 / 15);

          return {
            i: query.id.toString(),
            x: (index % perRow) * 15,
            y: Math.floor(index / perRow) * 6,
            w,
            h,
          };
        }) || [],
    }),
    [renderableQueries, chartLayoutConfig]
  );

  const ResponsiveGridLayout = WidthProvider(Responsive);

  return {
    chartColors,
    dashboardData,
    setDashboardData,
    loading,
    errors,
    anchorRef,
    open,
    setLoading,
    setErrors,
    setOpen,
    gridContainerRef,
    handleClose,
    handleToggle,
    editDashboard,
    edit,
    renderableQueries,
    layouts,
    ResponsiveGridLayout,
  };
};

export default useDashboardDetails;
