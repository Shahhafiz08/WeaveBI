import React, { useRef, useState, useEffect } from 'react';

import { getDashboardInfo } from '../api/actions';

const useDashboardDetails = ({ id }: { id: string | number }) => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState('');
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);

  const gridContainerRef = useRef<HTMLDivElement | null>(null);

  const chartColors = [
    'rgba(84, 133, 135, 0.8)',
    'rgba(235, 100, 119, 0.8)',
    'rgba(242, 200, 92, 0.8)',
    'rgba(84, 133, 135, 0.5)',
    'rgba(235, 100, 120, 0.5)',
    'rgba(242, 200, 92, 0.5)',
  ];

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
  };
};

export default useDashboardDetails;
