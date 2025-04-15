import { useState } from 'react';

import { downloadChartData, downloadTabularData, generateQueryInsights } from '../api/actions';

// show insights
export const useInsights = (queryid: number, querytype?: string) => {
  const [insights, setInsights] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newBool: boolean) => {
    setOpen(newBool);
  };
  const showInsights = async (
    queryId: number,
    browseOnline?: boolean,
    addInstructions?: string
  ) => {
    try {
      setLoading(true);
      const insightData = await generateQueryInsights(queryId, browseOnline, addInstructions);
      setInsights(insightData.insights);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
    return null;
  };

  const downloadQueryData = async () => {
    function convertToFile(blob: any) {
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `query_data-${queryid}`;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
    try {
      if (querytype === 'tabular') {
        const downloadTabular = await downloadTabularData(queryid);
        const blob = new Blob([downloadTabular], {
          type: 'text/csv',
        });
        convertToFile(blob);
      } else {
        const downloadChart = await downloadChartData(queryid);
        const blob = new Blob([JSON.stringify(downloadChart)], {
          type: 'application/json',
        });
        convertToFile(blob);
      }
    } catch (error) {
      alert('Download failed');
    }
  };

  return {
    setInsights,
    insights,
    downloadQueryData,
    loading,
    showInsights,
    open,
    setOpen,
    toggleDrawer,
  };
};
