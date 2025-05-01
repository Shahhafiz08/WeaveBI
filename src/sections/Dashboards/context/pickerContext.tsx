// import type { ReactNode } from 'react';

// import React, { useState, useContext, createContext } from 'react';

// const defaultColors = [
//   '#F44336',
//   '#4CAF50',
//   '#FFEB3B',
//   '#E91E63',
//   '#81D4FA',
//   '#BA68C8',
//   '#FFB74D',
//   '#009688',
// ];

// type ColorContextType = {
//   titleColor: string;
//   chartColor: string;
//   setTitleColor: (color: string) => void;
//   setChartColor: (color: string) => void;
//   defaultColors: string[];
// };

// const ColorContext = createContext<ColorContextType | undefined>(undefined);

// export const ColorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [titleColor, setTitleColor] = useState<string>(defaultColors[0]);
//   const [chartColor, setChartColor] = useState<string>(defaultColors[0]);

//   return (

//     <ColorContext.Provider
//       // eslint-disable-next-line react/jsx-no-constructed-context-values
//       value={{ titleColor, chartColor, setTitleColor, setChartColor, defaultColors }}
//     >
//       {children}
//     </ColorContext.Provider>
//   );
// };

// export const useColorContext = (): ColorContextType => {
//   const context = useContext(ColorContext);
//   if (!context) {
//     throw new Error('useColorContext must be used within a ColorProvider');
//   }
//   return context;
// };
