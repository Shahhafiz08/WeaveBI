import { useState } from 'react';
import { toast } from 'react-toastify';

import { useParams } from 'src/routes/hooks';

import {
  downloadChartData,
  downloadTabularData,
  generateQueryInsights,
  unlinkQueryFromDashboard,
} from '../api/actions';

// show insights
export const useQueryOptions = (
  queryId: number,
  fetchDashboardInfo: () => void,
  querytype?: string
) => {
  const { id } = useParams();
  const [insights, setInsights] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [outputType, setOutputType] = useState(querytype);

  const handleChangeOutputType = ({ output }: { output: string }) => {
    setOutputType(output);
    console.log(output, ' OOOOOOOUUUUUUUUTTTTTTTTTTPPPPPPUUUUUUUUUTTTTTTTTTTTTT');
  };

  const toggleDrawer = (newBool: boolean) => {
    setOpen(newBool);
  };

  const showInsights = async (browseOnline?: boolean, addInstructions?: string) => {
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

  // download query data
  const downloadQueryData = async () => {
    function convertToFile(blob: any) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `query_data-${queryId}`;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
    try {
      if (querytype === 'tabular') {
        const downloadTabular = await downloadTabularData(queryId);
        const blob = new Blob([downloadTabular], {
          type: 'text/csv',
        });
        convertToFile(blob);
      } else {
        const downloadChart = await downloadChartData(queryId);
        const blob = new Blob([JSON.stringify(downloadChart)], {
          type: 'application/json',
        });
        convertToFile(blob);
      }
    } catch (error) {
      alert('Download failed');
    }
  };
  // delete query
  const removeDashboardQuery = async () => {
    try {
      const response = await unlinkQueryFromDashboard({ queryId, dashboardId: Number(id) });
      toast.success(response.message);
      fetchDashboardInfo();
      return response;
    } catch (error) {
      toast.error(error);
    }
    return null;
  };

  return {
    setInsights,
    insights,
    downloadQueryData,
    removeDashboardQuery,
    loading,
    showInsights,
    open,
    setOpen,
    handleChangeOutputType,
    outputType,
    toggleDrawer,
  };
};
