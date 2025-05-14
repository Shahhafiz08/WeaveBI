import { useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';

import { updateQueryColors } from '../api/actions';

type propetiesType = {
  chartColor?: any;
  queryId: number;
};
export const useProperties = ({ chartColor, queryId }: propetiesType) => {
  const [Xtitle, setXTitle] = useState('');
  const [Ytitle, setYTitle] = useState('');
  const { id } = useParams();
  const [applying, setApplying] = useState(false);
  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleChangeXTitle = (text: string) => {
    setXTitle(text);
  };
  const handleChangeYTitle = (text: string) => {
    setYTitle(text);
  };
  const applyQueryColor = async () => {
    try {
      setApplying(true);
      await wait(500);
      const response = await updateQueryColors({
        chartColor: chartColor?.[0],
        queryId,
        dashboardId: Number(id),
      });

      toast.success(response.message);
      return response;
    } catch (error) {
      toast.error(error);
    } finally {
      setApplying(false);
    }

    return null;
  };
  return {
    applyQueryColor,
    setXTitle,
    Xtitle,
    Ytitle,
    applying,
    handleChangeXTitle,
    handleChangeYTitle,
  };
};
