import React, { createContext, useContext, useState, useEffect } from 'react';
import { inventoryService } from '../services/InventoryService';

const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Mock load
    setData(inventoryService.getInventory());
  }, []);

  const value = {
    data,
    service: inventoryService
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
}

export const useInventory = () => useContext(InventoryContext);
