import { useMemo, useState } from 'react';

export const useColorPicker = ({
  incommingChartColor,
}: {
  
  incommingChartColor: string;
}) => {
 
  const [chartColor, setChartColor] = useState<any>();

  useMemo(() => {
    const colors: Record<string, string[]> = {
      '#EB6477': [
        '#EB6477',
        '#ED7586',
        '#EF8695',
        '#F298A4',
        '#F4A9B3',
        '#F6BAC3',
        '#F8CBD2',
        '#FBDDE1',
        '#FDEEF0',
      ],
      '#0886C9': [
        '#0886C9',
        '#099BE9',
        '#1EABF6',
        '#3EB7F7',
        '#5EC3F9',
        '#7ECFFA',
        '#9FDBFB',
        '#BFE7FC',
        '#DFF3FE',
      ],
      '#1c252e': [
        '#1c252e',
        '#2E3D4C',
        '#41556A',
        '#536E88',
        '#6886A3',
        '#879EB6',
        '#A5B6C8',
        '#C3CFDA',
        '#E1E7ED',
      ],
      '#F2C85C': [
        '#F2C85C',
        '#F3CE6E',
        '#F5D480',
        '#F6DA92',
        '#F8E0A4',
        '#F9E7B7',
        '#FBEDC9',
        '#FCF3DB',
        '#FEF9ED',
      ],
      '#548587': [
        '#548587',
        '#60999B',
        '#73A6A8',
        '#87B3B5',
        '#9BC0C1',
        '#AFCCCD',
        '#C3D9DA',
        '#D7E6E6',
        '#EBF2F3',
      ],
      '#6D4C41': [
        '#402f29',
        '#4f3831',
        '#5e4239',
        '#85594d',
        '#997267',
        '#ad8b80',
        '#c1a39a',
        '#d4bcb4',
        '#6D4C41',
      ],

      '#21518F': [
        '#21518F',
        '#2965B1',
        '#3378D0',
        '#558FD8',
        '#77A5E0',
        '#99BCE8',
        '#BBD2EF',
        '#DDE9F7',
        '#F0F6FC',
      ],
    };
    // setTitleColor(incommingTitleColor ?? '#21518F');
    setChartColor(colors[incommingChartColor ?? '#21518F']);
  }, [incommingChartColor]);

  return {  setChartColor, chartColor };
};
