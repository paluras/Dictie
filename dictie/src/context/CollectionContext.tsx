import React from 'react';

export type CollectionContextType = {
    document: string;
    setDocument: (doc: string) => void;
  };

export const CollectionContext = React.createContext<CollectionContextType>({
    document: "exercises-easy",
    setDocument: () => {}
});
