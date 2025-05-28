import type { ReactNode } from 'react';

import React, { useMemo, useState, useContext, createContext } from 'react';

interface DatabaseIdContextType {
  databaseId: number;
  setDatabaseId: (id: number) => void;
}

const DatabaseIdContext = createContext<DatabaseIdContextType | undefined>(undefined);

export const DatabaseIdProvider = ({ children }: { children: ReactNode }) => {
  const [databaseId, setDatabaseId] = useState<number>(0);

  const value = useMemo(() => ({ databaseId, setDatabaseId }), [databaseId]);

  return <DatabaseIdContext.Provider value={value}>{children}</DatabaseIdContext.Provider>;
};

export const useDatabaseId = () => {
  const context = useContext(DatabaseIdContext);
  if (!context) {
    throw new Error('useDatabaseId must be used within a DatabaseIdProvider');
  }
  return context;
};
