import { useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';

import { updateQuery, runExistingQuery, updateQueryColors } from '../api/actions';

import type { Query } from '../types/inference';

type propetiesType = {
  chartColor?: any;
  query: Query;
  outputType?: string;
  fetchDashboardInfo: () => void;
};
export const useConfigure = ({
  chartColor,
  query,
  outputType,
  fetchDashboardInfo,
}: propetiesType) => {
  const [Xtitle, setXTitle] = useState('');
  const [title, setQueryTitle] = useState(query?.name as string);
  const [description, setQueryDescription] = useState(query?.query as string);
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
  const handleQueryTitleChange = (text: string) => {
    setQueryTitle(text);
  };
  const handleQueryDescriptionChange = (text: string) => {
    setQueryDescription(text);
  };
  const applyQueryColor = async () => {
    try {
      setApplying(true);
      await wait(500);
      const response = await updateQueryColors({
        chartColor: chartColor?.[0],
        queryId: query.id,
        dashboardId: Number(id),
      });
      fetchDashboardInfo();
      toast.success(response.message);
      return response;
    } catch (error) {
      toast.error(error);
    } finally {
      setApplying(false);
    }

    return null;
  };

  const updateQueryOptions = async () => {
    try {
      const response = await updateQuery({
        databaseId: query.databaseId,
        query: description,
        name: title,
        queryId: query.id,
        outputType: outputType ?? '',
      });
      toast.success(response.message);
      runExistingQuery(query.id);

      return response;
    } catch (error) {
      toast.error(error);
    }
    return null;
  };

  return {
    updateQueryOptions,
    applyQueryColor,
    title,
    Xtitle,
    Ytitle,
    applying,
    handleChangeXTitle,
    handleChangeYTitle,
    handleQueryTitleChange,
    handleQueryDescriptionChange,
    description,
  };
};
