import { useState, useEffect } from "react";
import { CollectionContext } from "../context/CollectionContext";

export type CollectionContextType = {
  document: string;
  setDocument: (doc: string) => void;
};

export const CollectionProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    const [document, setDocument] = useState(() => {
      const localData = localStorage.getItem('document');
      return localData ? localData : "exercises-easy";
    });
  
    useEffect(() => {
      localStorage.setItem('document', document);
    }, [document]);
  return (
    <CollectionContext.Provider value={{ document, setDocument }}>
      {children}
    </CollectionContext.Provider>
  );
};
