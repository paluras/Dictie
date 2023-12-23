import{ createContext } from "react";

export type CollectionContextType = {
    document: string;
    setDocument: (doc: string) => void;
  };

export const CollectionContext = createContext<CollectionContextType>({
    document: "exercises-easy",
    setDocument: () => {}
});



