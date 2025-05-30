import type { ReactNode } from 'react';

import { useMemo, useState, useContext, createContext } from 'react';

interface IsDashboardContextType {
  isDashboard: boolean;
  setIsDashboard: React.Dispatch<React.SetStateAction<boolean>>;
}

const IsDashboardContext = createContext<IsDashboardContextType | undefined>(undefined);

export const IsThereDashboard = ({ children }: { children: ReactNode }) => {
  const [isDashboard, setIsDashboard] = useState<boolean>(false);

  const value = useMemo(() => ({ isDashboard, setIsDashboard }), [isDashboard]);

  return <IsDashboardContext.Provider value={value}>{children}</IsDashboardContext.Provider>;
};

export const Abc = () => {
  const context = useContext(IsDashboardContext);
  if (!context) {
    throw new Error('useDatabaseId must be used within a Is dahboard Provider');
  }
  return context;
};
