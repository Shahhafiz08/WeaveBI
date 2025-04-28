import { useState } from 'react';

export const useColorPicker = () => {
  const [titleColor, setTitleColor] = useState('black');
  const [chartColor, setChartColor] = useState<any>();
  const blueGradient = [
    '#21518F',
    '#2965B1',
    '#3378D0',
    '#558FD8',
    '#77A5E0',
    '#99BCE8',
    '#BBD2EF',
    '#DDE9F7',
  ];

  return { titleColor, setTitleColor, setChartColor, chartColor, blueGradient };
};
