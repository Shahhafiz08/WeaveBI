import { useState } from 'react';

export const useColorPicker = () => {
  const defaultColors = [
    '#EB6477',
    '#81D4FA',
    '#BA68C8',
    '#FFB74D',
    '#009688',
    '#6D4C41',
    '#253f69',
  ];
  const [titleColor, setTitleColor] = useState('black');
  const [chartColor, setChartColor] = useState<string[]>(defaultColors);

  return { titleColor, setTitleColor, setChartColor, chartColor };
};
